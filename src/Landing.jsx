import React, {Component, useRef, useState, createRef, useContext, useEffect, createContext} from 'react';
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
  const nickname = props.nickname
  const setNickname = props.setNickname

  console.log('landing rendering')
  const [avatar, setAvatar] = useState("👧");
  const [error, setError] = useState("");
  const nameRef = useRef();
  const randomId = Math.floor(Math.random() * 9) + 10;
  const [currentMember, setCurrentMember] = useState()
  const navigate = useNavigate();


  useEffect(() => {
    console.log(nameRef.current.value)

  }, [])


  // const handleNicknameChange = (event) => {

  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(nickname)
    console.log("if handelsubmit")
    setNickname(nameRef.current.value)
    console.log(nickname)
    setCurrentMember({ nickname, avatar, randomId });
    navigate("/DopApp", { state: { nickname } });



  }
  
  const selectRandomAvatar = (e) => {
    e.preventDefault();
    if (nameRef.current.value) {
      setNickname(nameRef.current.value);
    }
    // TODO: Implement the logic for selecting a random avatar
  };

  // const joinChat = (e) => {
  //   e.preventDefault();



  // };

  return (
    <div className="App">
      <h1 className="App-title">
        DopApp <img className="App-logo" src={logo} alt="" />
      </h1>
      <div className="Name-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={nameRef}
            onChange={() => { }}
            placeholder="Enter your username"
          />
          <button type="submit">Pridruži se</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
      {/*<ul className="Avatar-pic">
        <li>
          <img src={girl} alt="Girl Avatar" onClick={selectRandomAvatar} />
        </li>
        <li>
          <img src={man} alt="Man Avatar" onClick={selectRandomAvatar} />
        </li>
      </ul>*/}
  </div>
  );
}

export default Landing;