import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css"
import Header from "../components/Header";

function Home() {
  return (
    <div className={styles.homepage}>
      <Header />
      
      <div className={styles.content}>
        <h1 className={styles.welcome}>Welcome to the Home Page</h1>
      </div>
    </div>
  );
}
export default Home;