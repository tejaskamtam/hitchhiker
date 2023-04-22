import React from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbar_logo_container}>
        <img className={styles.navbar_logo} src="HitchHiker.svg"></img>
        <p className={styles.navbar_logo_text}>HitchHiker</p>
      </Link>

      <div className={styles.navbar_tabs}>
        <Link href="/login" className={styles.navbar_tab}>
          Login
        </Link>
        <Link href="/about" className={styles.navbar_tab}>
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
