import React, {Component, useRef, useState, createRef, createContext} from 'react';
import { Link, useNavigate, useLocation, useHistory } from "react-router-dom";
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



const Landing = (props) => {
  console.log('landing rendering')
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState("👧");
  const [error, setError] = useState("");
  const nameRef = useRef();
  const randomId = Math.floor(Math.random() * 90000) + 10000;
  const [currentMember, setCurrentMember] = useState()
  const navigate = useNavigate();

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

  }
  const handleJoinChat = (e) => {
    e.preventDefault();
  if (nickname) {
    setCurrentMember({ nickname, avatar, randomId });
    navigate("/DopApp");
  } else {
    setError("Upišite svoj nadimak!");
  }
  };

  const selectRandomAvatar = (e) => {
    e.preventDefault();
    if (nameRef.current.value) {
      setNickname(nameRef.current.value);
    }
    // TODO: Implement the logic for selecting a random avatar
  };

  const joinChat = (e) => {
    e.preventDefault();
  if (nickname) {
    navigate("/DopApp", { state: { nickname } });
  } else {
    setError("Upišite svoj nadimak!");
  }


  };

  return (
    <div className="App">
      <h1 className="App-title">
        DopApp <img className="App-logo" src={logo} alt="" />
      </h1>
      <div className="Name-form">
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        placeholder="Enter your username"
      />
          <button onClick={joinChat} type="submit">Pridruži se</button>
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