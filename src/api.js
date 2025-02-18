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
      password,
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
};

// Profile Routes

export const updateProfile = async (description, picture, username) => {
  try {
    const response = await axios.post(PROFILE_URL, {
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

export const createGame = async (name, leader, time, court, sport) => {

  try {
    const response = await axios.post(GAME_URL, {
      name,
      leader,
      time,
      court,
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
    const response = await axios.delete(GAME_URL, {
      name,
      location
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

export const getGames = async ( location ) => {
  try {
    const response = await axios.get(GAME_URL, {
      location
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

export const addGameMember = async (name, location, user) => {
  try {
    const response = await axios.post(GAME_URL, {
      name,
      location,
      user,
    });
    response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

export const removeGameMember = async ( username ) => {
  try {
    const response = await axios.delete(GAME_URL, {
      username,
      });
      response.ok = true;
    return response.data;
  } catch (e) {
    throw e.response.data;
  }
}

