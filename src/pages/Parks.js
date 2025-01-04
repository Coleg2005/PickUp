import '../App.css';
import React from 'react';
import { Box, Button, Grid, Slider, FormControlLabel, Typography, Input, Switch } from '@mui/material';

const Parks = () => {

  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const  inputValue = Number(event.target.value);
    if(inputValue === '' || inputValue < 1) {
      setValue(1);
    } else if(inputValue > 25) { 
      setValue(25);
    } else {
      setValue(inputValue);
    }
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 25) {
      setValue(25);
    }
  };

  return (
    <div className='parks'>
      <h1 className='parks-header'>Search Settings</h1>
      <Button variant="contained">Search</Button>
      <div className='sports-checkbox'>
        <h3 className='sports-header'>Sports</h3>
        <div className="dropdown">
          <Button className="dropdown-btn">Select a Sport</Button>
          <div className="dropdown-content">
          <a href="/">Basketball</a>
          <a href="/">Pickleball</a>
          <a href="/">Soccer</a>
          <a href="/">Tennis</a>
          <a href="/">Volleyball</a>
          </div>
        </div>
      </div>
      <h3 className='radius-header'>Search Radius (miles)</h3>
      <div className='Radius-slider'>
        <Box sx={{ width: 200 }}>
          <Typography id="input-slider" gutterBottom>
          </Typography>
          <Grid container spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
            <Grid item xs>
              <Slider 
                aria-label="Radius" 
                value={value} 
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={1}
                max={25}
              />
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
        </Box>
      </div>
      <h3 className='team-switch'>Switch to search for courts with existing teams</h3>
      <div>
        <Switch>
          <FormControlLabel control={<Switch />} label="Search for courts with existing teams" />        
        </Switch>
      </div>
    </div>
  );
};

export default Parks;