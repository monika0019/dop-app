import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import logo from './images/logo.png';

const Landing = () => {
  const [error, setError] = useState('');
  const nameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
      nameRef.current.value = savedNickname;
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nickname = nameRef.current.value.trim();
    if (nickname) {
      localStorage.setItem('nickname', nickname); // Save the nickname to localStorage
      const tabId = uuidv4();
      navigate('/DopApp', {
        state: { nickname, tabId, currentMember: { username: nickname } },
      });
    } else {
      setError('Please enter a valid username');
    }
  };

  return (
    <div className="App">
      <h1 className="App-title">
        DopApp <img className="App-logo" src={logo} alt="" />
      </h1>
      <div className="Name-form">
        <form onSubmit={handleSubmit}>
          <input type="text" ref={nameRef} placeholder="Enter your username" />
          <button type="submit">Pridruži se</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Landing;
