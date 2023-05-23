import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './App.css';
import girl from './images/girl.png';
import man from './images/man.png';
import logo from './images/logo.png';
import Input from './Input';
import DopApp from "./DopApp";

const Landing = (props) => {
  const [avatar, setAvatar] = useState("👧");
  const [error, setError] = useState("");
  const nameRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const nickname = nameRef.current.value.trim();
    if (nickname) {
      navigate("/DopApp", { state: { nickname, avatar } });
    } else {
      setError("Please enter a valid username");
    }
  };
  
  const handleAvatarChange = (selectedAvatar) => {
    setAvatar(selectedAvatar);
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
            ref={nameRef}
            placeholder="Enter your username"
          />
          <div>
            <span>Choose your avatar:</span>
            <button
              className={`avatar-btn ${avatar === "👧" ? "selected" : ""}`}
              onClick={() => handleAvatarChange("👧")}
            >
              👧
            </button>
            <button
              className={`avatar-btn ${avatar === "👨" ? "selected" : ""}`}
              onClick={() => handleAvatarChange("👨")}
            >
              👨
            </button>
          </div>
          <button type="submit">Pridruži se</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Landing;