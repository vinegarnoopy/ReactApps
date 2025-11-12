import { FC, useState } from "react";
import styles from "../styles/Home.module.css"
import Header from "../components/Header";
import { Link } from "react-router-dom";

type TabTypes = "Premier League" | "La Liga" | "Bundes Liga" | "Ligue 1" | "Serie A" | "UCL";

interface Article {
  id: number;
  title: string;
  picture: string;
  summary: string;
}

const Home: FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("Premier League");
  const [searchQuery, setSearchQuery] = useState("");

  // タブごとの記事データ
  const articlesByLeague: Record<TabTypes, Article[]> = {
    "Premier League": [
      { id: 1, title: "Arsenal dominates in North London Derby", picture: "Picture", summary: "Arsenal secured a convincing 3-0 victory" },
      { id: 2, title: "Manchester City extends winning streak", picture: "Picture", summary: "City's unstoppable form continues" },
      { id: 3, title: "Liverpool's comeback victory", picture: "Picture", summary: "Reds rally from 2-0 down to win 3-2" },
      { id: 4, title: "Chelsea's new signing impresses", picture: "Picture", summary: "Debut goal seals three points" },
    ],
    "La Liga": [
      { id: 5, title: "Real Madrid wins El Clásico", picture: "Picture", summary: "Thrilling 2-1 victory at Camp Nou" },
      { id: 6, title: "Barcelona's youngster shines", picture: "Picture", summary: "Hat-trick in 4-1 win" },
      { id: 7, title: "Atlético Madrid holds on", picture: "Picture", summary: "Defensive masterclass secures draw" },
      { id: 8, title: "Sevilla's Europa hopes", picture: "Picture", summary: "Crucial win keeps European dreams alive" },
    ],
    "Bundes Liga": [
      { id: 9, title: "Bayern Munich crushes rivals", picture: "Picture", summary: "5-0 demolition extends league lead" },
      { id: 10, title: "Dortmund's comeback", picture: "Picture", summary: "Late goals secure dramatic victory" },
      { id: 11, title: "Leipzig's winning form", picture: "Picture", summary: "Six consecutive victories" },
      { id: 12, title: "Union Berlin's surprise", picture: "Picture", summary: "Underdog story continues" },
    ],
    "Ligue 1": [
      { id: 13, title: "PSG dominates title race", picture: "Picture", summary: "Mbappé's brace secures win" },
      { id: 14, title: "Marseille's resurgence", picture: "Picture", summary: "Three wins in a row" },
      { id: 15, title: "Lyon's Europa push", picture: "Picture", summary: "Crucial victory moves them up" },
      { id: 16, title: "Monaco's young talent", picture: "Picture", summary: "18-year-old scores winner" },
    ],
    "Serie A": [
      { id: 17, title: "Inter Milan tops the table", picture: "Picture", summary: "Convincing win maintains lead" },
      { id: 18, title: "AC Milan derby victory", picture: "Picture", summary: "Derby della Madonnina thriller" },
      { id: 19, title: "Juventus rebuilding", picture: "Picture", summary: "New tactics paying off" },
      { id: 20, title: "Napoli's title defense", picture: "Picture", summary: "Champions fight back" },
    ],
    "UCL": [
      { id: 21, title: "Champions League thriller", picture: "Picture", summary: "5-4 aggregate in semifinals" },
      { id: 22, title: "Underdog advances", picture: "Picture", summary: "Shocking upset in knockout stage" },
      { id: 23, title: "Record-breaking performance", picture: "Picture", summary: "Historic night in Europe" },
      { id: 24, title: "Final preview", picture: "Picture", summary: "Two giants set to clash" },
    ],
  };

  const articles = articlesByLeague[activeTab];

  return (
    <div className={styles.homepage}>
      <Header />
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
              className={`${styles.tab} ${activeTab === "UCL" ? styles.active : ''}`}
              onClick={() => setActiveTab("UCL")}
            >
              UCL
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

        <div className={styles.articlesGrid}>
          {articles.map((article) => (
            <Link to={`/article/${article.id}`} key={article.id} className={styles.articleCardLink}>
            <div key={article.id} className={styles.articleCard}>
              <div className={styles.articleTitle}>{article.title}</div>
              <div className={styles.articlePicture}>{article.picture}</div>
              <div className={styles.articleSummary}>{article.summary}</div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;