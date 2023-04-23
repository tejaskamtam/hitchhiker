import { style } from '@mui/system';
import React, { useState } from 'react';
import PopinBottom from '../../components/PopinBottom';
import styles from '../../styles/Trip.module.css'
import Link from 'next/link';


const CreateTrip = () => {
  const [isStartLocSurprise, setStartLocSurprise] = useState(true);
  const [isEndLocSurprise, setEndLocSurprise] = useState(true);

  const [flexibility, setFlexibility] = useState("anytime");
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);
  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState("$");
  const [transport, setTransport] = useState("any");
  const [sedentary, setSedentary] = useState(5);
  const [privacy, setPrivacy] = useState(5);


  const handleStartLocSurprise= (e) => {
    setStartLocSurprise(e.target.checked);
  }

  const handleEndLocSurprise= (e) => {
    setEndLocSurprise(e.target.checked);
  }

  const handleFlexibility = (e) => {
    setFlexibility(e.target.value);
  }

  const handleStartLoc = (e) => {
    setStartLoc(e.target.value);
  }

  const handleEndLoc = (e) => {
    setEndLoc(e.target.value);
  }

  const handleTravelers = (e) => {
    setTravelers(e.target.value);
  }

  const handleBudget = (e) => {
    setBudget(e.target.value);
  }

  const handleTransport = (e) => {
    setTransport(e.target.value);
  }

  const handleSedentary = (e) => {
    setSedentary(e.target.value);
  }

  const handlePrivacy = (e) => {
    setPrivacy(e.target.value);
  }

  const handleStartDate = (e) => {
    setStartDates(e.target.value);
  }

  const handleEndDate = (e) => {
    setEndDates(e.target.value);
  }
  return (
    <div className={styles.newbg}>
      <div className={styles.dashboard_wrapper}>
        <PopinBottom>
          <div className={styles.smallmenu}>
            <div className={styles.smallmenu_item}>
              <p>My Account</p>
            </div>
            <div className={styles.smallmenu_item}>
              <Link href="/login"> My Trips</Link> 
            </div>
          </div>
        </PopinBottom>
        <PopinBottom>
          <div className={styles.dashboard}>
            <h1>Let us inspire your next trip!</h1>
            <div className={styles.dashboard_row_table}>
            <div className={styles.dashboard_row_item}>
              <div className={styles.text_and_form}>
                <p>start date</p>
                <input type="date" id="start" name="trip-start" className={styles.small_form} disabled={flexibility == "anytime"} onChange={handleStartDate}>
                </input>
              </div>
              <div className={styles.text_and_form}>
                <p>end date</p>
                <input type="date" id="end" name="trip-end" className={styles.small_form} disabled={flexibility == "anytime"} onChange={handleEndDate}>
                </input>
              </div>
              <div className={styles.text_and_form}>
                <p>flexibility</p>
                <select name="flexibility" id="flexibility" className={styles.small_form} onChange={handleFlexibility} defaultValue="anytime">
                  <option value="1">±1 day</option>
                  <option value="3">±3 days</option>
                  <option value="7">±7 days</option>
                  <option value="30">±1 month</option>
                  <option value="anytime">anytime</option>
                </select>

              </div>
            </div>

            <div className={styles.dashboard_row_item}>
              <div className={styles.text_and_form}>
                  <p>start location</p>
                  <input id="start_place" name="start-location" className={styles.large_form} disabled={isStartLocSurprise} onChange={handleStartLoc}>
                  </input>
              </div>
              <div className={styles.text_and_form}>
                  <p>surprise me!</p>
                  <input type="checkbox" id="surprise" name="surprise" className={styles.tiny_form} onChange={handleStartLocSurprise} defaultChecked>
                  </input>
              </div>
            </div>

            <div className={styles.dashboard_row_item}>
              <div className={styles.text_and_form}>
                  <p>end location</p>
                  <input id="end_place" name="end-location" className={styles.large_form} disabled={isEndLocSurprise} onChange={handleEndLoc}>
                  </input>
              </div>
              <div className={styles.text_and_form}>
                  <p>surprise me!</p>
                  <input type="checkbox" id="surprise" name="surprise" className={styles.tiny_form} onChange={handleEndLocSurprise} defaultChecked>
                  </input>
              </div>
            </div>

            <div className={styles.dashboard_row_item}>
              <div className={styles.text_and_form}>
                  <p>travelers</p>
                  <input id="travelers" name="travelers" pattern="[0-9]*" className={styles.tiny_form} onChange={handleTravelers} defaultValue="1">
                  </input>
              </div>
              <div className={styles.text_and_form}>
                  <p>budget</p>
                  <select name="budget" id="budget" className={styles.tiny_form} onChange={handleBudget}>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                    <option value="any">any</option>
                </select>
              </div>
              <div className={styles.text_and_form}>
                  <p>transport</p>
                  <select name="transportation" id="transportation" className={styles.tiny_form} onChange={handleTransport}>
                    <option value="ground">car</option>
                    <option value="air">air</option>
                    <option value="sea">sea</option>
                    <option value="any">any</option>
                </select>
              </div>
            </div>

            <div className={styles.dashboard_row_item}>
              <div className={styles.text_and_form}>
                  <p>sedentary vs active</p>
                  <input type="range" id="sedentarySlider" name="sedentarySlider" min="0" max="10" step="1" onChange={handleSedentary} defaultValue="5" className={styles.long_slider}>
                  </input>
              </div>
            </div>
            <div className={styles.dashboard_row_item}>
              <div className={styles.text_and_form}>
                  <p>private vs public</p>
                  <input type="range" id="privacySlider" name="privacySlider" min="0" max="10" step="1" onChange={handlePrivacy} defaultValue="5" className={styles.long_slider}>
                  </input>
              </div>
            </div>
            <div className={styles.generate_button}>
              <p>Generate</p>
            </div>
            </div>
            
          </div>
          
        </PopinBottom>
      </div>
    </div>
  );
};

export default CreateTrip;
