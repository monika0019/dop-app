import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import './App.css';
import logo from './images/logo.png';

const Landing = (props) => {
 
  const [error, setError] = useState("");
  const nameRef = useRef();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
    
  const handleSubmit = (event) => {
    setNickname(event.target.value);
    const nickname = nameRef.current.value.trim();
    if (nickname) {
      const tabId = uuidv4(); // Generate a unique ID for the tab
      navigate("/DopApp", { state: { nickname, tabId: tabId, currentMember: { username: nickname } } });
    } else {
      setError("Please enter a valid username");
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
            ref={nameRef}
            placeholder="Enter your username"
          />
          
          <Link to={{ pathname: '/DopApp', state: { nickname } }}><button type="submit">Pridruži se</button></Link>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Landing;
