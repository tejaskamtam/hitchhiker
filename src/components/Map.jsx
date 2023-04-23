import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import styles from '../styles/TripDetail.module.css';
import { geoposition } from '../pages/api/geo';

const Map = ({ places }) => {
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    const mapOptions = {
      center: {
        lat: 0,
        lng: 0,
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

  useEffect(() => {
    if (map && google) {
      let bounds = new google.maps.LatLngBounds();

      places.forEach(async (place) => {
        const latLong = await geoposition(place);
        const myLatLong = { lat: latLong[1], lng: latLong[0] };

        let marker = new google.maps.Marker({
          position: myLatLong,
          title: place,
        });

        bounds.extend(myLatLong);
        marker.setMap(map);
      });

      map.fitBounds(bounds);
    }
  }, [map, google]);

  return <div id="map" className={styles.map}></div>;
};

export default Map;
