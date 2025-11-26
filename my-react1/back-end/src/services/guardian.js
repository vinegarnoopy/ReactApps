import fetch from 'node-fetch';
import { translateToJapanese } from './translate.js';

// クラブ名 → リーグ マッピング (高速検索用 Set を後で構築)
const clubLeagueMap = {
  // Premier League
  'manchester city': 'Premier League',
  'man city': 'Premier League',
  'manchester united': 'Premier League',
  'man united': 'Premier League',
  'liverpool': 'Premier League',
  'arsenal': 'Premier League',
  'chelsea': 'Premier League',
  'tottenham': 'Premier League',
  'spurs': 'Premier League',
  'newcastle': 'Premier League',
  // La Liga
  'real madrid': 'La Liga',
  'barcelona': 'La Liga',
  'atletico madrid': 'La Liga',
  // Serie A
  'juventus': 'Serie A',
  'inter milan': 'Serie A',
  'ac milan': 'Serie A',
  'napoli': 'Serie A',
  'roma': 'Serie A',
  // Bundesliga
  'bayern munich': 'Bundesliga',
  'borussia dortmund': 'Bundesliga',
  'rb leipzig': 'Bundesliga',
  // Ligue 1
  'paris saint germain': 'Ligue 1',
  'psg': 'Ligue 1',
  'olympique lyonnais': 'Ligue 1',
  'marseille': 'Ligue 1'
};

// リーグ代表パターン
const leagueRegexMap = {
  'Premier League': /\b(premier league|epl)\b/i,
  'La Liga': /\b(la liga)\b/i,
  'Serie A': /\b(serie a)\b/i,
  'Bundesliga': /\b(bundesliga)\b/i,
  'Ligue 1': /\b(ligue 1)\b/i
};

// キャッシュ: 12時間ごとに記事取得と翻訳を実行
const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12時間
let cache = { data: null, fetchedAt: 0 };
let inflight = null;

function normalizeText(str) {
    return str
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

// 記事分類: 明示的リーグ名 > クラブ名 の順で判定
function classifyArticle(article) {
    const raw = `${article.webTitle} ${article.fields?.bodyText || ''}`;
    const sliced = raw.length > 8000 ? raw.slice(0, 8000) : raw;
    const text = normalizeText(sliced);
    // 1. リーグ名直接言及
    for (const [league, regex] of Object.entries(leagueRegexMap)) {
        if (regex.test(text)) return league;
    }
    // 2. クラブ名言及
    for (const club in clubLeagueMap) {
        // 単語境界考慮: clubにスペース含む場合そのまま、小文字化済みテキストで includes 判定
        if (text.includes(club)) return clubLeagueMap[club];
    }
    return 'Others';
}

export async function fetchGuardianArticles() {
        // キャッシュ有効なら返す
        const now = Date.now();
        if (cache.data && (now - cache.fetchedAt) < CACHE_TTL_MS) {
            const hoursRemaining = ((CACHE_TTL_MS - (now - cache.fetchedAt)) / (1000 * 60 * 60)).toFixed(1);
            console.log(`[cache] Returning cached articles (${hoursRemaining} hours until next update)`);
            return cache.data;
        }
        // 進行中があればそれを待つ
        if (inflight) {
            console.log('[cache] Waiting for in-flight request...');
            return inflight;
        }
        console.log('[fetch] Fetching new articles from Guardian API...');
    const apiKey = process.env.GUARDIAN_KEY;
    const baseUrl = 'https://content.guardianapis.com/search';
    
    //記事を取得
    const url = `${baseUrl}?api-key=${apiKey}&section=football&show-fields=all&page-size=120`;
        inflight = (async () => {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Guardian API error ${res.status}`);
            }
            const data = await res.json();
    
    // リーグごとに分類
            const articlesByLeague = {
                'Premier League': [],
                'La Liga': [],
                'Serie A': [],
                'Bundesliga': [],
                'Ligue 1': [],
                'Others': []
            };
    
            if (data.response && data.response.results) {
                // 1. まず全記事を分類して格納
                data.response.results.forEach(article => {
                    const league = classifyArticle(article);
                    articlesByLeague[league].push({
                        id: article.id,
                        title: article.webTitle,
                        mainText: article.fields?.bodyText || article.fields?.trailText || '',
                        summary: article.fields?.trailText || '',
                        url: article.webUrl,
                        date: article.webPublicationDate,
                        thumbnail: article.fields?.thumbnail || '',
                        translatedTitle: '',     // 後で翻訳結果を追加
                        translatedBody: ''       // 後で翻訳結果を追加（本文）
                    });
                });

                // 2. 全記事のタイトルと本文を翻訳（並列処理）
                console.log('[translation] Starting translation for titles and bodies...');
                const allArticles = Object.values(articlesByLeague).flat();
                const translationPromises = allArticles.map(async (article) => {
                    const [translatedTitle, translatedBody] = await Promise.all([
                        translateToJapanese(article.title),
                        translateToJapanese(article.mainText)
                    ]);
                    article.translatedTitle = translatedTitle;
                    article.translatedBody = translatedBody;
                });
                await Promise.all(translationPromises);
                console.log('[translation] Completed translation for titles and bodies');
            }
            // 件数ログ (簡潔)
            console.log('[guardian counts]', Object.fromEntries(Object.entries(articlesByLeague).map(([k,v]) => [k, v.length])));
            cache = { data: articlesByLeague, fetchedAt: Date.now() };
            return articlesByLeague;
        })();
        try {
            const result = await inflight;
            return result;
        } finally {
            inflight = null;
        }
}