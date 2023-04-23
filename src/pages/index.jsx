import styles from '@/styles/Home.module.css';
import { getAuth } from 'firebase/auth';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import PopinBottom from '../components/PopinBottom';
import PopinLeft from '../components/PopinLeft';
import Trip from '../components/trip';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { initFirebase } from '../components/firebase';
import { getFirestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  // get dashboard trip ids
  const [tripIDs, setTripIDs] = useState([]);
  const app = initFirebase();
  const db = getFirestore(app);

  console.log(tripIDs);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'trips'),
        where('user', '==', user.email)
      );
      getDocs(q).then((docs) => {
        let ids = [];
        docs.forEach((doc) => {
          ids.push({id: doc.id, ...doc.data()});
        });
        setTripIDs([...ids]);
      });
    }
  }, [user]);

  if (loading) return <div></div>;

  return (
    <>
      {!user ? (
        <PopinLeft styles={styles.container}>
          <div className={styles.landing_container}>
            <h1>Hitch Hike</h1>
            <h2>our epic journeys</h2>
            <Link href="/login">Get Started</Link>
          </div>
        </PopinLeft>
      ) : (
        <PopinBottom>
          <div className={styles.dashboard}>
            <h1>My Trips</h1>
            <div className={styles.dashboard_trips}>
              <div
                className={styles.dashboard_trip}
                onClick={() => {
                  router.push('/trips');
                }}
              >
                <div className={styles.add_trip_container}>
                  <img src="trip_add.png" alt="add trip" />
                </div>
              </div>
              {tripIDs.map((id, i) => {
                return (
                  <Trip key={id} name={`start: ${id.start}`} image="trip_image.png" id={id.id} />
                );
              })}
            </div>
          </div>
        </PopinBottom>
      )}
    </>
  );
}
