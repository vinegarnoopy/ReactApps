import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css"

function Login() {
  return (
    <div className={styles['loginpage']}>
      <div className={styles['logo-section']}>
        <Link to="/">
          <img src="/src/assets/OverSea_Logo.png" alt="OverSea-Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={styles['form-section']}>
        <form>
          <h2>Login</h2>
          <div className={styles.form}>
            <label htmlFor="Username" className={styles.text}>Username</label>
            <input type="Username"  className={styles.textBox} id="Username" name="Username" required />
          </div>
          <div className={styles.form}>
            <label htmlFor="password" className={styles.text}>Password</label>
            <input type="password" className={styles.textBox} id="password" name="password" required />
          </div>
          <button type="submit" className={styles['btn-login']}>Login</button>
          <Link to="/reset-password">
          <p className={styles.forgetpass}>Passwordを忘れた</p>
          </Link>

          <div className={styles['signup-section']}>
            <p>アカウントをお持ちでない場合は</p>
            <Link to="/signup">
            <button className={styles['btn-signup']}>Signup</button>
            </Link>
          </div>

          
        </form>
      </div>
    </div>
  );
}

export default Login;