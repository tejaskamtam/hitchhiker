import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Box from '@mui/material/Box';
import { Button, ButtonGroup, Container } from '@mui/material';

let mapData;
let currentType = '';

const Map = ({ dataType }) => {
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(34.0689);
  const [long, setLong] = useState(-118.4552);
  const [heatmapData, setHeatMapData] = useState([]);
  const liveData = useSelector((state) => state.trialData.data);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyBNU6wqoSvC3BZ7C0nPwPJISmNhohZYLKI',
      version: 'weekly',
      libraries: ['places', 'visualization'],
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

  function handleReset() {
    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: mapData,
    });
    heatmap.setMap(map);
    console.log(mapData);
  }

  return (
    <Container sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <div id="map">Map</div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{ position: 'absolute', left: '30px', bottom: '10px' }}
      >
        <Button onClick={handleResize}>resize</Button>
        <Button onClick={handleReset}>reset</Button>
      </ButtonGroup>
    </Container>
  );
};

export default Map;
