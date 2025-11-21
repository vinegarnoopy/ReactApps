export type LeagueKey = 'Premier League' | 'La Liga' | 'Serie A' | 'Bundesliga' | 'Ligue 1' | 'Others';
export interface FetchedArticle {
    id: string;
    title: string;
    mainText: string;
    summary: string;
    url: string;
    date: string;
    thumbnail: string;
    translatedTitle: string;      // 日本語翻訳されたタイトル
    translatedSummary: string;    // 日本語翻訳されたサマリー
}
export type ArticlesByLeague = Record<LeagueKey, FetchedArticle[]>;

// APIからリーグ分類済みの記事を取得
export async function getArticlesByLeague(): Promise<ArticlesByLeague> {
    const res = await fetch('http://localhost:3001/api/articles');
    if (!res.ok) {
        throw new Error(`Failed to fetch articles: ${res.status}`);
    }
    const data = await res.json();
    return data as ArticlesByLeague;
}