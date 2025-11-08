import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

function Header() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e) {
      const target = e.target;
      if (
        containerRef.current && containerRef.current.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <header className={styles.header}>
  <div className={styles.container} ref={containerRef}>
        <div className={styles.brand}>
          <Link to="/home" className={styles.logo} aria-label="Home">
            <img src="/src/assets/OverSea_Logo.png" alt="OverSea logo" />
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link to="/wordlist" className={styles.navLink}>WordList</Link>
          <Link to="/user" className={styles.navLink}>User</Link>
          <Link to="/settings" className={styles.navLink}>Settings</Link>
        </nav>

        <button
          ref={hamburgerRef}
          className={styles.hamburger}
          aria-label="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ≡
        </button>

        <div ref={menuRef} className={`${styles.mobileMenu} ${open ? styles.show : ""}`}>
          <Link to="/wordlist" className={styles.mobileLink} onClick={() => setOpen(false)}>WordList</Link>
          <Link to="/user" className={styles.mobileLink} onClick={() => setOpen(false)}>User</Link>
          <Link to="/settings" className={styles.mobileLink} onClick={() => setOpen(false)}>Settings</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;