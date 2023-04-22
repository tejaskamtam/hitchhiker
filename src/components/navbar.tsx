import React from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {getAuth} from 'firebase/auth';
import { signOut } from 'firebase/auth';
import {useRouter} from "next/router";

const Navbar = () => {
  const auth = getAuth();
  const router = useRouter() ;
  const SignOut = async() => {
    router.push("/Login");
    signOut(auth);
    };
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbar_logo_container}>
        <img className={styles.navbar_logo} src="HitchHiker.svg"></img>
        <p className={styles.navbar_logo_text}>HitchHiker</p>
      </Link>
      <div className={styles.navbar_tabs}>
        <Link href="/Login" className={styles.navbar_tab}>
          Login
        </Link>
        <Link href="/about" className={styles.navbar_tab}>
          About
        </Link>
        <button className={styles.navbar_tab} onClick={SignOut}>
          SignOut
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
