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
  const UserContext = createContext();
  const nameRef = useRef()
  const navigate = useNavigate();
  /* 
  function Redirect() {
    let navigate = useNavigate();
    function handleClick() {
      navigate('/input')
    }*/
  
  /*const randomAvartar= () => {
      <div>
        <img src={girl} alt="" />
        <img src={man} alt="" />
      </div>
  }*/
  
  const randomName = (e) => {

    e.preventDefault();
    
  }
  const randomAvartar = (e) => {

    e.preventDefault();
    
  }
  
    
      return (
        <div className="App">
          <h1 className='App-title'>DopApp <img className='App-logo' src={logo} alt="" />
          </h1>
        <div className='Name-form'>
            <form onSubmit={randomName}>
                <input ref={nameRef} type="text" placeholder='Upišite  Nickname...'/>
                <button type="submit" onClick={() => navigate("/DopApp")}>
                  Pridruži se
                </button>
            </form>
        </div>
        <ul className='Avatar-pic'>
        <li><img src={girl} onClick={randomAvartar} /></li>
        <li><img src={man} onClick={randomAvartar} /></li>
      </ul>
      </div>
      )
}

export default Landing;