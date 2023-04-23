import React from 'react';
import styles from '../styles/TripDetail.module.css';

function parseTime(timeString) {
  // split the time string into hours and minutes
  var time = timeString.split(':');
  // extract the hours from the time string
  var hours = parseInt(time[0]);
  // check if it's before noon (i.e., am)
  if (timeString.indexOf('am') !== -1 && hours === 12) {
    hours = 0;
  }
  // check if it's after noon (i.e., pm)
  if (timeString.indexOf('pm') !== -1 && hours !== 12) {
    hours += 12;
  }
  // return the hours as a number
  return hours;
}

const Day = ({ day, details }) => {
  let times = Object.keys(details);
  times = times.sort((a, b) => {
    let time_a = parseTime(a);
    let time_b = parseTime(b)
    return parseInt(time_a) - parseInt(time_b);
  })

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
