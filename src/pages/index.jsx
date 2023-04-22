import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import Login from './Login';
import { useRouter } from 'next/router';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });
import PopinLeft from '../components/PopinLeft';

export default function Home() {
  const router = useRouter();
  return (
    <PopinLeft>
      <div className={styles.container}>
        <div className={styles.landing_container}>
          <h1>Hitch Hike</h1>
          <h2>on our epic journeys</h2>
          <Link href="/Login">Get Started</Link>
        </div>
      </div>
      ;
    </PopinLeft>
  );
}
