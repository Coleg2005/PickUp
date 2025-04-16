import '../App.css';
import { useState } from 'react';
import { Divider, Box, Button, Grid2, Slider, FormControl, FormControlLabel, Typography, Input, InputLabel, Switch, MenuItem, Select, Stack } from '@mui/material';

function getUserCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error)
    );
  });
}


async function FetchPlaces(sport, radius, setPlaces) {

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
    setPlaces(data.results);

  } catch(error) {
    console.error(error);
  }
}

const Parks = () => {

  const [sport, setSport] = useState('basketball%20court');
  const [value, setValue] = useState(5);
  const [places, setPlaces] = useState([]);

  const handleDropdownChange = (event) => setSport(event.target.value);

  const handleSliderChange = (newValue) => setValue(newValue);

  const handleInputChange = (event) => setValue(event.target.value === '' ? 1 : Math.max(1, Math.min(25, Number(event.target.value))));

  const handleBlur = () => setValue(Math.max(1, Math.min(25, value)));

  const fetchData = async () => {
    await FetchPlaces(sport, value * 1609, setPlaces);
  };

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
          <Box sx={{ width: 200 }}>
            <Typography id="input-slider" gutterBottom>
            </Typography>
            <Grid2 container spacing={2} direction="row" sx={{ alignItems: 'center' }}>
              <Grid2 item xs={12}>
                <Slider 
                  value={typeof value === 'number' ? value : 1}
                  onChange={handleSliderChange}
                  aria-labelledby="Radius"
                  min={1}
                  max={25}
                  sx={{ width: "100%" }}
                />
              </Grid2>
              <Grid2 item>
                <Input
                  value={value}
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
              </Grid2>
            </Grid2>
          </Box>
        </div>
        <h3 className='team-switch'>Switch to search for courts with existing teams</h3>
        <div>
          <FormControlLabel control={<Switch />} />        
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