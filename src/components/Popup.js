import * as React from 'react';
import { Stack, Button, Dialog, TextField, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs.js';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js';
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker.js';
import { TimePicker } from '@mui/x-date-pickers/TimePicker/TimePicker.js';
import dayjs from 'dayjs';
import { createGame } from '../api.js';

export default function Popup({ location, sport, onGameAdded }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(dayjs());
  const [time, setTime] = React.useState(dayjs());
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const handleClickOpen = () => {setOpen(true)};

  const handleClose = () => {setOpen(false)};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // name, leader, date, location, sport
      const leader = JSON.parse(sessionStorage.getItem('user')).user.username;
      await createGame(name, leader, date, location, sport, desc);
      handleClose();
      if (onGameAdded) {
        onGameAdded();
      }
    } catch (err) {
      console.error('Error submitting game:', err);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Make a Game
      </Button>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const gName = formData.Json.name;
              const finTime = formJson.time;
              const finDate = formJson.date;
              console.log(finTime);
              console.log(finDate);
              handleClose();
            },
          },
        }}
      > */}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Select Date and Time of Game</DialogTitle>
          <hr></hr>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2} sx={{ minWidth: 305 }}>
                <DatePicker
                  // id="date"
                  // name="date"
                  label="Pick a date"
                  value={date}
                  onChange={setDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  // id="time"
                  // name="time"
                  label="Pick a time"
                  value={time}
                  onChange={setTime}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <TextField
              autoFocus
              required
              margin="dense"
              // id="name"
              // name="name"
              label="Game Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              // id="desc"
              // name="desc"
              label="Game Description"
              type="text"
              fullWidth
              variant="standard"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}