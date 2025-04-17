import '../App.css';
import { useParams } from 'react-router-dom';
import { getGame, addGameMember, removeGameMember, deleteGame } from '../api.js';
import { useState, useEffect } from 'react';
import { Button, Box, Stack, Divider } from '@mui/material';
import FormDialog from '../components/Popup.js';


// things im gonna need
// make game done great job 
// join game  

const Park = () => {

  const { sport, location } = useParams();
  const [games, setGames] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const username = JSON.parse(sessionStorage.getItem('user')).user.username;

  const handleJoinGame = async (gname) => {
    try {
      // name, location, user
      const response = await addGameMember(gname, location, username);

      setRefresh((prev) => !prev);

      console.log("Joined game Successful:", response);
    } catch (error) {
      console.error('Error adding game member:', error);
    }
  };

  const handleGameAdded = () => {
    setRefresh((prev) => !prev);
  };

  const handleDeleteMember = async (gname) => {
    try {
      const response = await removeGameMember(gname, location);

      setRefresh((prev) => !prev);
      console.log("Successfullt Removed User:", response);
    } catch (error) {
      console.error('Error removing game member:', error);
    }
  };

  const handleDeleteGame = async (gname) => {
    try {
      const response = await deleteGame(gname, location, username);

      setRefresh((prev) => !prev);
      console.log("Successfullt Removed User:", response);
    } catch (error) {
      console.error('Error removing game member:', error);
    }
  };
  
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
  }, [location, refresh]); // Dependency array ensures this runs when `name` changes



  return (
    <div>
        <h1>Welcome to {location}!</h1>
        < FormDialog location={location} sport={sport} onGameAdded={handleGameAdded}/>
        <div className='game-display' id='game-results'>
          {games.length > 0 ? (
            games.map((game, index) => (
              <Box key={index} sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  <p>Game Name: {game.name}</p>
                  <p>Game Leader: {game.leader.username}</p>
                  {game.leader.username === username && (
                    <Button onClick={() => handleDeleteGame(game.name)}>Delete Game</Button>
                  )}


                  <div>
                    <h4>Game Members:</h4>
                    {game.gameMembers.length > 0 ? (
                      <ul>
                        {game.gameMembers.map((member, memberIndex) => (
                          <li key={memberIndex}>{member.username}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No members in this game</p>
                    )}
                  </div>

                  <Button onClick={() => handleDeleteMember(game.name)}>Leave Game</Button>

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