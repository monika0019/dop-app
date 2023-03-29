import React, {Component, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './App.css';
import DopApp from './DopApp'
import user from './images/user.png';
import girl from './images/girl.png';
import man from './images/man.png';
import woman from './images/woman.png';
import logo from './images/logo.png';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Landing from './Landing';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/DopApp" element={<DopApp />}></Route>
      <Route path="/" element={<Landing />}></Route>
      </Routes>
    </Router>
  )
}

export default App;

