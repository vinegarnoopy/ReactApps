import { FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import styles from "../styles/Article.module.css";
import { getArticlesByLeague, FetchedArticle } from '../api/articles';

type TabTypes = "原文" | "翻訳文" | "原文＋翻訳文";

const Article: FC = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("原文");
  const [article, setArticle] = useState<FetchedArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // "/article/" の後ろ全体をIDとして取得
  const articleId = location.pathname.replace('/article/', '');

  useEffect(() => {
    async function loadArticle() {
      try {
        const data = await getArticlesByLeague();
        // 全リーグから該当IDの記事を探す
        const allArticles = Object.values(data).flat();
        const found = allArticles.find(a => a.id === articleId);
        setArticle(found || null);
      } catch (error) {
        console.error('Failed to load article:', error);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [articleId]);

  if (loading) {
    return <div style={{ padding: "2rem", color: "#c3ddff" }}>読み込み中...</div>;
  }

  if (!article) {
    return <div style={{ padding: "2rem", color: "#c3ddff" }}>記事が見つかりませんでした。</div>;
  }

  // 表示内容を動的に決定
  const getDisplayContent = () => {
    switch (activeTab) {
      case "原文":
        return [{ title: article.title, mainText: article.mainText }];
      case "翻訳文":
        return [{ 
          title: article.translatedTitle || '翻訳なし', 
          mainText: article.translatedSummary || '翻訳が利用できません'
        }];
      case "原文＋翻訳文":
        return [
          { title: article.title, mainText: article.mainText },
          { 
            title: article.translatedTitle || '翻訳なし', 
            mainText: article.translatedSummary || '翻訳が利用できません'
          }
        ];
    }
  };

  const contentToDisplay = getDisplayContent();

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