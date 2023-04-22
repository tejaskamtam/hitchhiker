import React from 'react';
import styles from '../styles/Home.module.css';

const Trip = ({ name, image, date }) => {
  return (
    <div className={styles.dashboard_trip}>
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
