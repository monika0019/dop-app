import React, {Component, useRef, useState, createRef, createContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import './App.css';
import girl from './images/girl.png';
import man from './images/man.png';
import logo from './images/logo.png';
import Input from './Input';
import { 
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import DopApp from "./DopApp";



function Landing() {
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState("👧");
  const [error, setError] = useState("");
  const nameRef = useRef();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const selectRandomAvatar = (e) => {
    e.preventDefault();
    // TODO: Implement the logic for selecting a random avatar
  };

  const joinChat = (e) => {
    e.preventDefault();
    if (username) {
      navigate("/DopApp");
    } else {
      setError("Please enter a username");
    }
  };

  return (
    <div className="App">
      <h1 className="App-title">
        DopApp <img className="App-logo" src={logo} alt="" />
      </h1>
      <div className="Name-form">
        <form onSubmit={joinChat}>
          <input
            ref={nameRef}
            type="text"
            placeholder="Upiši svoj nadimak..."
            onChange={handleNameChange}
          />
          <button type="submit">Pridruži se</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
      <ul className="Avatar-pic">
        <li>
          <img src={girl} alt="Girl Avatar" onClick={selectRandomAvatar} />
        </li>
        <li>
          <img src={man} alt="Man Avatar" onClick={selectRandomAvatar} />
        </li>
      </ul>
    </div>
  );
}

export default Landing;