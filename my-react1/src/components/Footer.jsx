import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.text}>
          <small>Data provided by The Guardian Open Platform </small><br/>
          <small>© Guardian News & Media Ltd.</small><br/>
          <small>© {new Date().getFullYear()} OverSea.</small><br/>
        </div>
        <div className={styles.links}>
          <a className={styles.link} href="/privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
