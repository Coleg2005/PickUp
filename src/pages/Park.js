import '../App.css';
import { useParams } from 'react-router-dom';
import { getGame, addGameMember } from '../api.js';
import { useState, useEffect } from 'react';
import { Button, Box, Stack, Divider } from '@mui/material';
import FormDialog from '../components/Popup.js';


// things im gonna need
// make game done great job 
// join game

const Park = () => {

  const { sport, location } = useParams();
  const [games, setGames] = useState([]);
  const username = JSON.parse(sessionStorage.getItem('user')).user.username;

  const handleJoinGame = async (gname) => {
    try {
      // name, location, user
      const response = await addGameMember(gname, location, username);

      console.log("Joined game Successful:", response);
    } catch (error) {
      console.error('Error adding game member:', error);
    }
  }
  
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // console.log(location);
        const fetchedGames = await getGame(location); // Wait for the Promise to resolve
        setGames(fetchedGames); // Update the state with the resolved data
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, [location]); // Dependency array ensures this runs when `name` changes

  // const handleGetGames = async () => {
  //   try {
  //     // name, location, user
  //     const fetchedGames = getGame(location);
  //     setGames(fetchedGames); 
  //   } catch (error) {
  //     console.error('Error fetching games:', error);
  //   }
  // }

  return (
    <div>
        <h1>Welcome to {location}!</h1>
        < FormDialog location={location} sport={sport}/>
        <div className='game-display' id='game-results'>
          {games.length > 0 ? (
            games.map((game, index) => (
              <Box key={index} sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  <p>{game.name}</p>
                  <Button onClick={() => handleJoinGame(game.name)}>Join Game</Button>
                  <Divider component="li"/>
                </Stack>
              </Box>
            ))
          ) : (
            <h1>No games have been made</h1>
          )}
        </div>
        <div className="back" id="back">
          <Button href="/home">Back to Search</Button>
        </div>
    </div>
  );
};

export default Park;