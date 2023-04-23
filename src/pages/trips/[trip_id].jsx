import React, { useEffect, useState } from 'react';
import styles from '../../styles/TripDetail.module.css';
import PopinBottom from '../../components/PopinBottom';
import Map from '../../components/Map';
import Day from '../../components/Day';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { initFirebase } from '../../components/firebase';
import { getFirestore } from 'firebase/firestore';

const Travel = () => {
  const router = useRouter();
  const { trip_id } = router.query;
  console.log(trip_id);

  const app = initFirebase();
  const db = getFirestore(app);

  const [tripDetail, setTripDetail] = useState(null);

  useEffect(() => {
    if (trip_id && !tripDetail) {
      getDoc(doc(db, 'trips', trip_id)).then((doc) => {
        setTripDetail(doc.data());
      });
    }
  }, [trip_id]);

  if (!tripDetail) return <div></div>;

  let days = Object.keys(tripDetail.trip);
  days = days.sort();
  const places = tripDetail.locations;

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      style={{ height: '90%' }}
    >
      <div className={styles.trip_container}>
        <div className={styles.place_container}>
          <h2>Places</h2>
          <ul>
            {places.map((place) => {
              return <li className={styles.place}>{place}</li>;
            })}
          </ul>
        </div>
        <div className={styles.schedule_container}>
          <h2>Schedule</h2>
          <div className={styles.days_wrapper}>
            {days.map((day) => {
              console.log(day);
              return (
                <Day key={day} day={day} details={tripDetail.trip[day]}></Day>
              );
            })}
          </div>
        </div>
        <div className={styles.map_container}>
          <Map></Map>
        </div>
      </div>
    </motion.div>
  );
};

export default Travel;
