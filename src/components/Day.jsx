import React from 'react';
import styles from '../styles/TripDetail.module.css';

const Day = ({ day, details }) => {
  const times = Object.keys(details);
  console.log(times);
  return (
    <div className={styles.day_container}>
      <p>{day}</p>

      <div className={styles.time_container}>
        {times.map((time) => {
          return (
            <div className={styles.time_block}>
              <p>{time}</p>
              <p>{details[time]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
