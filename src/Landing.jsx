
import DopApp from "./DopApp";
import React, {Component, useRef, useState } from 'react';
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



function Landing() {
  const [avatar, setAvatar] = useState()
  const nameRef = useRef()
  /*let navigate = useNavigate(); 
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
  const randomAvartar = () => {
    
    alert('Izabrali ste svog avatara')

  }
    
    
      return (
        <div className="App">
          <h1 className='App-title'>DopApp <img className='App-logo' src={logo} alt="" />
          </h1>
        <div className='Name-form'>
            <form onSubmit={randomName}>
                <input ref={nameRef} type="text" placeholder='Upišite  Nickname...'/>
                <button type="submit">
                  Pridruži se
                </button>
            </form>
        </div>
        <div className='Avatar-pic'>
        <img src={girl} onClick={randomAvartar} />
        <img src={man} onClick={randomAvartar} />
      </div>
      </div>
      )
}

export default Landing;