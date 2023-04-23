import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import styles from "../styles/TripDetail.module.css";

const Map = ({ dataType }) => {
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);

  console.log(map);
  console.log(google);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    const mapOptions = {
      center: {
        lat: 39.7955,
        lng: -86.2401,
      },
      zoom: 15,
      disableDefaultUI: true,
    };

    loader
      .load()
      .then((google) => {
        console.log('google map loading...');
        setGoogle(google);
        setMap(new google.maps.Map(document.getElementById('map'), mapOptions));
      })
      .catch((e) => {
        // do something
        console.log('falied to fetch google map: ', e);
      });
    // getAllTrials();
  }, []);

  return <div id="map" className={styles.map}></div>;
};

export default Map;
