import { Link } from "react-router-dom";
import "/src/styles/Top.css"
function Top() {
  return (
    <div className="homepage">
      <div className="content">
        <div className="logo-section">
          <img src="/src/assets/OverSea_Logo.png" alt="OverSea-Logo" className="logo" />
        </div>
        <div className="text-section">
          <h2>サッカーファンのための<br/>英語学習サイト</h2>
          <p>
            海外サッカーの記事を読みながら英語を学ぶ<br />
            お気に入りのチームニュースを楽しむ<br />
            自分だけの単語帳を作る
          </p>
        </div>
      </div>

      <div className="button-section">
        <div className="button-box">
          <p>アカウントをお持ちの場合は</p>
          <Link to="/login">
          <button className="btn">Login</button>
          </Link>
        </div>
        <div className="button-box">
          <p>アカウントをお持ちでない場合は</p>
          <Link to="/signup">
          <button className="btn">Signup</button>
          </Link>
        </div>
      </div>

      <div className="explanation-section">
        <p>仮文：海外サッカーの記事を通じて、楽しみながら英語力の向上を目指す</p>

      </div>

    </div>
  );
}

export default Top;