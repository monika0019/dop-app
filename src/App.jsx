import React, {useContext, useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
//import "./App.css";
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
import { randomName, randomColor, DopApp } from './DopApp';


const App = () => {
  console.log('App rendering')
  const [messages, setMessages] = useState([]);
const [nickname, setNickname] = useState("");
const randomId = Math.floor(Math.random() * 9) + 10;
const [currentMember, setCurrentMember] = useState({
username: nickname,
avatar: randomColor(),
id: randomId
});
const [drone, setDrone] = useState(null);


  
useEffect(() => {
  if (!drone) {
    const myDrone = new window.Scaledrone("OKoLR1ZgZTNHMeUZ", { data: currentMember });
    setDrone(myDrone)
  }
    return () => {
      if (drone) {
        drone.disconnect();
      }
    };
  }, [currentMember]);
  
  useEffect(() => {
    if (drone) {
  drone.on("open", error => {
    if (error) {
      return console.log(error);
    }
    

    console.log("openning connection");
    console.log("drone", drone.clientId);
    let member = { ...currentMember };
    member.id = drone.clientId;
    setCurrentMember(member);
    
    if (drone) {
      const room = drone.subscribe("observable-room");
      room.on("data", (data, member) => {
      console.log(member);
      setMessages(prevMessages => [...prevMessages, { member, text: data }]);
    });}

    drone.on("error", error => {
      console.error("Error with connection:", error);
    });
    
    drone.on("close", event => {
      console.log("Connection closed:", event);
    });
    
    return () => {
      if (drone) {
        drone.close();
      }
    };
  }, [currentMember, drone]);
  }
}
  );
  
  
  
  

const onSendMessage = message => {
  drone.publish({
  room: "observable-room",
  message
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

