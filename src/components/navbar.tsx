import React from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { getAuth } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { app } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const SignOut = async () => {
    signOut(auth);
  };
  if(user){
    return (
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navbar_logo_container}>
          <img className={styles.navbar_logo} src="HitchHiker.svg"></img>
          <p className={styles.navbar_logo_text}>HitchHiker</p>
        </Link>
        <div className={styles.navbar_tabs}>
          <a className={styles.navbar_tab} onClick={SignOut}>
            SignOut
          </a>
        </div>
      </nav>
    );
  };
  {
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
          <a className={styles.navbar_tab} onClick={SignOut}>
            SignOut
          </a>
        </div>
      </nav>
    );
  };
  }

export default Navbar;
