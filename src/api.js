import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const AUTH_URL = `${BASE_URL}/api/auth`;
const GAME_URL = `${BASE_URL}/api/game`;
// const FRIENDS_URL = `${BASE_URL}/api/friend`;
const PROFILE_URL = `${BASE_URL}/api/profile`;

// Auth Routes

export const register = async (username, password, confirmPassword) => {

  try{
    const response = await axios.post(`${AUTH_URL}/register`, {
      username,
      password,
      confirmPassword,
    });

    // saveUser(response.data);
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, {
      username,
      password
    }, { withCredentials: true });

    sessionStorage.setItem('user', JSON.stringify(response.data));
            
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
};

export const logout = async (name) => {
  try {
    const response = await axios.post(`${AUTH_URL}/logout`, {},
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

export const check = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/logout`, credentials);
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

// Profile Routes
export const updateProfile = async (description, picture, username) => {
  try {
    const response = await axios.post(`${PROFILE_URL}/updateProfile`, {
      description,
      picture,
      username,
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

// Game Routes

export const createGame = async (name, leader, date, location, sport) => {

  try {
    const response = await axios.post(`${GAME_URL}/game`, {
      name,
      leader,
      date,
      location,
      sport,
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

export const deleteGame = async ( name, location) => {
  try {
    const response = await axios.delete(`${GAME_URL}/game`, {
      params: {
        name,
        location
      },
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

export const getGame = async ( location ) => {
  try {
    const response = await axios.get(`${GAME_URL}/game`, {
      params: {location},
    });

    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

export const addGameMember = async (name, location, gameMember) => {
  try {
    console.log(name, location, gameMember);
    const response = await axios.post(`${GAME_URL}/gameMember`, {
      name,
      location,
      gameMember
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

export const removeGameMember = async ( name, location, gameMember ) => {
  try {
    console.log(name, location, gameMember);
    const response = await axios.delete(`${GAME_URL}/gameMember`, {
      params: {
        name,
        location,
        gameMember
      },
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

