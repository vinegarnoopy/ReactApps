import { FC, useEffect, useState } from "react";
import styles from "../styles/Home.module.css"
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getArticlesByLeague, ArticlesByLeague, LeagueKey, FetchedArticle } from '../api/articles';

type TabTypes = "Premier League" | "La Liga" | "Bundes Liga" | "Ligue 1" | "Serie A" | "Others";

interface Article {
  id: string | number;
  title: string;
  picture?: string;
  summary: string;
}

// API取得結果を保持
const emptyLeagues: ArticlesByLeague = {
  'Premier League': [],
  'La Liga': [],
  'Serie A': [],
  'Bundesliga': [],
  'Ligue 1': [],
  'Others': []
};

const Home: FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>('Premier League');
  const [searchQuery, setSearchQuery] = useState('');
  const [leagueArticles, setLeagueArticles] = useState<ArticlesByLeague>(emptyLeagues);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticlesByLeague();
        if (!cancelled) setLeagueArticles(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const tabKeyMap: Record<TabTypes, keyof ArticlesByLeague> = {
    'Premier League': 'Premier League',
    'La Liga': 'La Liga',
    'Bundes Liga': 'Bundesliga',
    'Ligue 1': 'Ligue 1',
    'Serie A': 'Serie A',
    'Others': 'Others'
  };

  const articles: FetchedArticle[] = leagueArticles[tabKeyMap[activeTab]] ?? [];

  const filtered = (articles as FetchedArticle[]).filter(a => {
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.mainText.toLowerCase().includes(q);
  });

  return (
    <div className={styles.homepage}>
      <Header />
      <h1 className={styles.pageTitle}>Latest News</h1>
      <div className={styles.content}>
        
        <div className={styles.tabBar}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "Premier League" ? styles.active : ''}`}
              onClick={() => setActiveTab("Premier League")}
            >
              Premier League
            </button>
            <button
              className={`${styles.tab} ${activeTab === "La Liga" ? styles.active : ''}`}
              onClick={() => setActiveTab("La Liga")}
            >
              La Liga
            </button>
            <button
              className={`${styles.tab} ${activeTab === "Bundes Liga" ? styles.active : ''}`}
              onClick={() => setActiveTab("Bundes Liga")}
            >
              Bundes Liga
            </button>
            <button
              className={`${styles.tab} ${activeTab === "Ligue 1" ? styles.active : ''}`}
              onClick={() => setActiveTab("Ligue 1")}
            > 
              Ligue 1
            </button>
            <button
              className={`${styles.tab} ${activeTab === "Serie A" ? styles.active : ''}`}
              onClick={() => setActiveTab("Serie A")}
            >
              Serie A
            </button>
            <button
              className={`${styles.tab} ${activeTab === "Others" ? styles.active : ''}`}
              onClick={() => setActiveTab("Others")}
            >
              Others
            </button>
          </div>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchBox}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading && <div style={{ color: '#c3ddff' }}>Loading...</div>}
        {error && <div style={{ color: 'tomato' }}>{error}</div>}
        {!loading && !error && (
          <div className={`${styles.articlesGrid} ${filtered.length === 1 ? styles.singleGrid : ''}`}>
            {filtered.map(article => (
              <Link to={`/article/${article.id}`} key={article.id} className={styles.articleCardLink}>
                <div className={styles.articleCard}>
                  <div className={styles.articleTitle}>
                    {article.title}
                  </div>
                  <div className={styles.articlePictureWrapper}>
                    {article.thumbnail ? (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className={styles.articlePicture}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.articlePictureFallback}>No Image</div>
                    )}
                  </div>
                  <div className={styles.articleSummary}>
                    {article.summary || 'No summary available.'}
                  </div>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && <div style={{ color: '#c3ddff' }}>No articles found.</div>}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;