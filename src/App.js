import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Parks from './pages/Parks.js';
import Profile from './pages/Profile.js';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/parks" exact element={<Parks/>}/>
          <Route path="/friends" exact />
          <Route path="/profile" exact element={<Profile/>}/>
        </Routes>
    </Router> 
    </>
  );
}

export default App;
