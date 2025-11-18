import { FC, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "../styles/Article.module.css"

type TabTypes = "原文" | "翻訳文" | "原文＋翻訳文";

//ダミーデータ
const allArticles = [
  { id: 1, title: "Arsenal dominates in North London Derby",
    mainText: "Arsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincingArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincinArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincinArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincin 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victoryArsenal secured a convincing 3-0 victory",
    picture: "Picture", summary: "Arsenal secured a convincing 3-0 victory" },
  { id: 2, title: "Manchester City extends winning streak",
    mainText: "City's unstoppable form continues",
    picture: "Picture", summary: "City's unstoppable form continues" },
  { id: 3, title: "Liverpool's comeback victory",
    mainText: "Reds rally from 2-0 down to win 3-2",
    picture: "Picture", summary: "Reds rally from 2-0 down to win 3-2" },
  { id: 4, title: "Chelsea's new signing impresses",
    mainText: "Debut goal seals three points",
    picture: "Picture", summary: "Debut goal seals three points" },
  { id: 5, title: "Real Madrid wins El Clásico",
    mainText: "Thrilling 2-1 victory at Camp Nou",
    picture: "Picture", summary: "Thrilling 2-1 victory at Camp Nou" },
];

function transrateArticle(article: typeof allArticles[number] | undefined) {
  if (!article) return null;
  // 翻訳ロジックをここに実装

  return {
    id: article.id,
    title: article.title,
    mainText: article.mainText,
    picture: article.picture,
  };
}

const Article: FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("原文");
  const { id } = useParams<{ id: string }>();

  // IDに基づいて記事を取得、後々サーバーからフェッチするように変更予定
  const article = allArticles.find(a => a.id === Number(id));

  //const transratedArticle = transrateArticle(article); 翻訳機能実装後
  //ダミー
  const transratedArticle = {
    id:0,
    title: " (翻訳文)",
    mainText: " (これは翻訳されたテキストです)" ,
    picture:  "",
  };

  if (!article) {
    return <div style={{ padding: "2rem" }}>記事が見つかりませんでした。</div>;
  };

  const articlesByType: Record<TabTypes, { title: string; mainText: string; picture: string }[]> = {
    "原文": [article],
    "翻訳文": [transratedArticle],
    "原文＋翻訳文": [article, transratedArticle]
  };

  const contentToDisplay = articlesByType[activeTab];

  return (
    <div className={styles.articlepage}>
      <Header />
      <div className={styles.content}>
        <button className={styles.backLink}>
          <Link to="/home" style={{ color: "#c3ddff" }}>← 一覧に戻る</Link>
        </button>

        <div className={styles.tabBar}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "原文" ? styles.active : ''}`}
              onClick={() => setActiveTab("原文")}
            >
              原文
            </button>
            <button
              className={`${styles.tab} ${activeTab === "翻訳文" ? styles.active : ''}`}
              onClick={() => setActiveTab("翻訳文")}
            >
              翻訳文
            </button>
            <button
              className={`${styles.tab} ${activeTab === "原文＋翻訳文" ? styles.active : ''}`}
              onClick={() => setActiveTab("原文＋翻訳文")}
            >
              原文＋翻訳文
            </button>
          </div>
        </div>
        <div className={styles.articleContent}>
          {contentToDisplay.map((item, index) => (
            <div key={index}>
              <div className={styles.title}>
                {item.title}
              </div>
              <div className={styles.mainText}>
                {item.mainText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Article;