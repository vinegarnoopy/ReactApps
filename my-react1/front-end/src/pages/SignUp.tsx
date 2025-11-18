import { Link } from "react-router-dom";
import { FC } from "react";
import styles from "../styles/SignUp.module.css"

const SignUp: FC = () => {
  return (
    <div className={styles['signuppage']}>
      <div className={styles['logo-section']}>
        <Link to="/">
          <img src="/src/assets/OverSea_Logo.png" alt="OverSea-Logo" className={styles.logo} />
        </Link>
      </div>

      <div className={styles['form-section']}>
        <form>
          <h2>SignUp</h2>
          <div className={styles.form}>
            <label htmlFor="Username" className={styles.text}>Username</label>
            <input type="Username"  className={styles.textBox} id="Username" name="Username" required />
          </div>
          <div className={styles.form}>
            <label htmlFor="password" className={styles.text}>Password</label>
            <input type="password" className={styles.textBox} id="password" name="password" required />
          </div>
          <div className={styles.form}>
            <label htmlFor="email" className={styles.text}>Email</label>
            <input type="email" className={styles.textBox} id="email" name="email" required />
          </div>
          <button type="submit" className={styles['btn-signup']}>SignUp</button>

          <div className={styles['login-section']}>
            <p>アカウントをお持ちの方は</p>
            <Link to="/login">
            <button className={styles['btn-login']}>Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;