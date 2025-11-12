import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css"
import Header from "../components/Header";
import {FC, useState} from "react";

function Home() {
  return (
    <div className={styles.homepage}>
      <Header />
      <div className={styles.content}>
        
      </div>
    </div>
  );
}
export default Home;