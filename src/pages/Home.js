import '../App.css';
import { useState, useEffect } from 'react';
import { Divider, Box, Button, Slider, FormControl, FormControlLabel, Input, InputLabel, Switch, MenuItem, Select, Stack } from '@mui/material';
import { getGame } from '../api.js';

function getUserCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error)
    );
  });
}


async function FetchPlaces(sport, radius, setPlaces, gameOnly) {

  const coords = await getUserCoordinates();

  console.log(coords.latitude, coords.longitude);

  try{

    const url =`https://api.foursquare.com/v3/places/search?query=${sport}&ll=${coords.latitude}%2C${coords.longitude}&radius=${radius}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3ynGnxZsO0ZMa+Hm0PS3JQD/TVM+nm7bXs9uGrgkjAaU='
      }
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    
    let filteredResults = data.results;

    if (gameOnly) {
      // Fetch games for each location in data.results
      const resultsWithGames = await Promise.all(
        data.results.map(async (place) => {
          const games = await getGame(place.name); // Fetch games for the specific location
          if (games.length > 0) {
            return place; // Include the place if it has games
          }
          return null; // Exclude the place if it has no games
        })
      );

      // Filter out null values (places without games)
      filteredResults = resultsWithGames.filter((place) => place !== null);
    }

    setPlaces(filteredResults);

  } catch(error) {
    console.error(error);
  }
}

const Parks = () => {

  const [sport, setSport] = useState('basketball%20court');
  const [radius, setRadius] = useState(5);
  const [places, setPlaces] = useState([]);
  const [gameOnly, setGameOnly] = useState(false);

  const handleDropdownChange = (event) => setSport(event.target.value);

  const handleSliderChange = (event, newRadius) => setRadius(newRadius);

  const handleInputChange = (event) => setRadius(event.target.value === '' ? 1 : Math.max(1, Math.min(25, Number(event.target.value))));

  const handleSwitchChange = (event) => {
    setGameOnly(event.target.checked); // Update the state based on the Switch's value
    console.log('Switch toggled:', event.target.checked); // Log the new state
  }

  const handleBlur = () => setRadius(Math.max(1, Math.min(25, radius)));

  // Define fetchData function within component
  const fetchData = async () => {
    try {
      await FetchPlaces(sport, radius * 1609, setPlaces, gameOnly);
    } catch (error) {
      console.error('Error Loading Places:', error);
    }
  };

  useEffect (() => {
    fetchData();
  });

  // // Use useEffect to call fetchData when gameOnly changes
  // useEffect(() => {
  //   fetchData();
  // }, [gameOnly, sport, radius]);

  return (
    <div className='parks'>
      <div className='parks-settings'>
        <h1 className='parks-header'>Search Settings</h1>
        <Button variant="contained" onClick={fetchData}>Search</Button>
        <div className='sports-dropdown'>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="sports-select-label">Sports</InputLabel>
              <Select
                labelId="sports-select"
                id="sports-select"
                value={sport}
                label="Sport"
                onChange={handleDropdownChange}
              >
                <MenuItem value={'basketball%20court'}>Basketball</MenuItem>
                <MenuItem value={'pickleball'}>Pickleball</MenuItem>
                <MenuItem value={'soccer%20field'}>Soccer</MenuItem>
                <MenuItem value={'tennis%20court'}>Tennis</MenuItem>
                <MenuItem value={'volleyball%20court'}>Volleyball</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <h3 className='radius-header'>Search Radius (miles)</h3>
        <div className='Radius-slider'>
        <Box sx={{ width: 200, mb: 2 }}>
          <Slider 
            value={typeof radius === 'number' ? radius : 1}
            onChange={handleSliderChange}
            aria-labelledby="Radius"
            min={1}
            max={25}
          />
          <Input
            value={radius}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 25,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Box>
        </div>
        <div>
          <FormControlLabel label='Switch to search for courts with existing teams' control={<Switch checked={gameOnly} onChange={handleSwitchChange}/>} />
        </div>
      </div>
      <div className='park-display' id='park-results'>
        {places.map((place, index) => (
          <Box key={index} sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <Button variant="contained" href={`/park/${encodeURI(sport)}/${encodeURIComponent(place.name)}`}>{place.name}</Button>
              <Divider component="li" />
            </Stack>
          </Box>
        ))}
      </div>
    </div>
    
  );
};

export default Parks;