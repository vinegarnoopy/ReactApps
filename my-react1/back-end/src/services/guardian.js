import fetch from 'node-fetch';

// 各リーグの検索キーワード
const leagueKeywords = {
    'Premier League': 'premier league',
    'La Liga': 'la liga OR real madrid OR barcelona',
    'Serie A': 'serie a OR juventus OR inter milan OR ac milan',
    'Bundesliga': 'bundesliga OR bayern munich OR borussia dortmund',
    'Ligue 1': 'ligue 1 OR psg OR paris saint-germain'
};

// 記事がどのリーグに属するか判定
function classifyArticle(article) {
    const text = `${article.webTitle} ${article.fields?.bodyText || ''}`.toLowerCase();
    
    if (text.includes('premier league') || text.includes('manchester') || text.includes('liverpool') || text.includes('arsenal') || text.includes('chelsea')) {
        return 'Premier League';
    }
    if (text.includes('la liga') || text.includes('real madrid') || text.includes('barcelona') || text.includes('atletico')) {
        return 'La Liga';
    }
    if (text.includes('serie a') || text.includes('juventus') || text.includes('inter milan') || text.includes('ac milan') || text.includes('napoli')) {
        return 'Serie A';
    }
    if (text.includes('bundesliga') || text.includes('bayern') || text.includes('dortmund') || text.includes('leipzig')) {
        return 'Bundesliga';
    }
    if (text.includes('ligue 1') || text.includes('psg') || text.includes('paris saint-germain') || text.includes('marseille')) {
        return 'Ligue 1';
    }
    
    return null;
}

export async function fetchGuardianArticles() {
    const apiKey = process.env.GUARDIAN_KEY;
    const baseUrl = 'https://content.guardianapis.com/search';
    
    // サッカーセクションから記事を取得
    const url = `${baseUrl}?api-key=${apiKey}&section=football&show-fields=all&page-size=50`;
    const res = await fetch(url);
    const data = await res.json();
    
    // リーグごとに分類
    const articlesByLeague = {
        'Premier League': [],
        'La Liga': [],
        'Serie A': [],
        'Bundesliga': [],
        'Ligue 1': []
    };
    
    if (data.response && data.response.results) {
        data.response.results.forEach(article => {
            const league = classifyArticle(article);
            if (league) {
                articlesByLeague[league].push({
                    id: article.id,
                    title: article.webTitle,
                    mainText: article.fields?.bodyText || article.fields?.trailText || '',
                    summary: article.fields?.trailText || '',
                    url: article.webUrl,
                    date: article.webPublicationDate,
                    thumbnail: article.fields?.thumbnail || ''
                });
            }
        });
    }
    
    return articlesByLeague;
}