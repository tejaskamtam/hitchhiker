import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import Login from "./Login";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <div className={styles.container}>
    <div className={styles.landing_container}>
      <h1>Hitch Hike</h1>
      <h2>on our epic journeys</h2>
      <button>Get Started</button>
    </div>
  </div>;
}
