import React from 'react';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const Trip = ({ id, name, image, date }) => {
    const router = useRouter();

  return (
    <div className={styles.dashboard_trip} onClick={() => {
        router.push(`./trips/${id}`);
    }}>
      <div className={styles.trip_image_container}>
        <img src={image} alt="" />
      </div>
      <div className={styles.trip_text_container}>
        <p>{name}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Trip;
