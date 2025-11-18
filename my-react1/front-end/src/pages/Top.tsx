import { Link } from "react-router-dom";
import { FC } from "react";
import styles from "../styles/Top.module.css"
import { motion as Motion } from "framer-motion"

const Top: FC = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.content}>
        <Motion.div
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={styles['logo-section']}
        >
          <img src="/src/assets/OverSea_Logo.png" alt="OverSea-Logo" className={styles.logo} />
        </Motion.div>
        <div className={styles['text-section']}>
          <h2>サッカーファンのための<br/>英語学習サイト</h2>
          <p>
            海外サッカーの記事を読みながら英語を学ぶ<br />
            お気に入りのチームニュースを楽しむ<br />
            自分だけの単語帳を作る
          </p>
        </div>
      </div>

      <div className={styles['button-section']}>
        <div className={styles['button-box']}>
          <p>アカウントをお持ちの場合は</p>
          <Link to="/login">
          <button className={styles.btn}>Login</button>
          </Link>
        </div>
        <div className={styles['button-box']}>
          <p>アカウントをお持ちでない場合は</p>
          <Link to="/signup">
          <button className={styles.btn}>Signup</button>
          </Link>
        </div>
      </div>

      <div className={styles['explanation-section']}>
        <p>仮文：海外サッカーの記事を通じて、楽しみながら英語力の向上を目指す</p>
      </div>
    </div>
  );
};

export default Top;