import React, {useContext, useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Landing from './Landing';
import { randomColor, DopApp } from './DopApp';


const App = () => {
  console.log('App rendering')
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState('');

  function handleJoinChat(nickname) {
    setNickname(nickname);
  }

  const [currentMember, setCurrentMember] = useState({
    username: nickname,
    avatar: randomColor(),
    id: "",
  });


  const drone = new window.Scaledrone("OKoLR1ZgZTNHMeUZ", {
    data: currentMember,
  });
  useEffect(() => {
    console.log("Landing.username:", Landing.username);
    setCurrentMember((prevMember) => ({
      ...prevMember,
      username: Landing.nickname,
    }));
  }, []);

  useEffect(() => {
    drone.on("open", (error) => {
      if (error) {
        return console.log(error);
      }

      console.log("openning connection");
      console.log("drone", drone.clientId);
      let member = { ...currentMember };
      member.id = drone.clientId;
      setCurrentMember(member);
    });
    const room = drone.subscribe("observable-room");
    room.on("data", (member) => {
      console.log(member);
      const newMessage = { member: currentMember, text: member };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    drone.on("error", (error) => {
      console.error("Error with connection:", error);
    });
    drone.on("close", (event) => {
      console.log("Connection closed:", event);
    });
  }, []);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };
  return (
    <Router>
      <Routes>
        <Route path="/DopApp" element={<DopApp messages={messages} currentMember={currentMember} onSendMessage={onSendMessage} nickname={nickname} />} />
        <Route path="/" element={<Landing currentMember={currentMember} setCurrentMember={setCurrentMember} nickname={nickname} setNickname={setNickname} />} />
      </Routes>
    </Router>
  )
}

export default App;

