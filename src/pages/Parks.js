import '../App.css';
import React from 'react';
import { Box, Button, Grid2, Slider, FormControl, FormControlLabel, Typography, Input, InputLabel, Switch, MenuItem, Select } from '@mui/material';

async function FetchData(sport, radius) {

  try{
    const url = `https://api.foursquare.com/v3/places/search?query=${sport}&ll=38.750660%2C-77.475143&radius=${radius}`;
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
    const placeElement = document.getElementById('park-results');
    placeElement.innerHTML = '';

    for (let i = 0; i < data.results.length; i++) {
      const placeName = `<a>${data.results[i].name}</a><br>`;
      placeElement.innerHTML += placeName;
    }

  } catch(error) {
    console.error(error);
  }
}

const Parks = () => {

  const [sport, setSport] = React.useState('');
  const [value, setValue] = React.useState(5);

  const handleDropdownChange = (event) => setSport(event.target.value);

  const handleSliderChange = (event, newValue) => setValue(newValue);

  const handleInputChange = (event) => setValue(event.target.value === '' ? 1 : Math.max(1, Math.min(25, Number(event.target.value))));

  const handleBlur = () => setValue(Math.max(1, Math.min(25, value)));

  const fetchData = async () => {
    await FetchData(sport, value * 1609);
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
            <Grid2 container spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
              <Grid2 item xs>
                <Slider 
                  aria-label="Radius" 
                  value={value} 
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  min={1}
                  max={25}
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
        <p className='result' id='placeName'></p>
      </div>

    </div>
  );
};

export default Parks;