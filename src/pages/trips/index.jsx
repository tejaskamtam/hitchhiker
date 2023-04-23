import React from 'react';
import PopinBottom from '../../components/PopinBottom';
import styles from '../../styles/Trip.module.css'

const CreateTrip = () => {
  return (
    <PopinBottom>
      <div className={styles.dashboard}>
        <h1>Get Started!</h1>
        <div className={styles.dashboard_trips}>
          Enter some info
        </div>
      </div>
    </PopinBottom>
  );
};

export default CreateTrip;
