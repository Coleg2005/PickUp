import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About.js';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Friends from './pages/Friends.js';
import Login from './pages/Login.js';
import Park from './pages/Park.js';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" exact element={<Home/>} />
          <Route path="/park/:sport/:location" element={<Park/>} />
          <Route path="/about" exact element={<About/>}/>
          <Route path="/friends" exact element={<Friends/>}/>
          <Route path="/profile" exact element={<Profile/>}/>
          <Route path="/" exact element={<Login/>}/>
        </Routes>
    </Router> 
    </>
  );
}

export default App;
