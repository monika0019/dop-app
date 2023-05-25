import React, { useContext, useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import ReactDOM from 'react-dom';
import "./App.css";
import Landing from './Landing';
import { randomColor, DopApp } from './DopApp';

const App = () => {
  console.log('App rendering');
  const [messages, setMessages] = useState([]);
  const [CurrentMember, setCurrentMember] = useState()
  const [nickname, setNickname] = useState("");
  const [tabId, setTabId] = useState("");
  const [drone, setDrone] = useState(null);
  const currentMember = {
    username: nickname,
    avatar: randomColor(),
    id: tabId
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    const generatedTabId = localStorage.getItem('tabId');
    if (generatedTabId) {
      setTabId(generatedTabId);
    } else {
      const newTabId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('tabId', newTabId);
      setTabId(newTabId);
    }
  }, []);

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
  }, []);
  
  useEffect(() => {
    if (drone) {
  drone.on("open", error => {
    if (error) {
      return console.log(error);
    }
    
    console.log("openning connection");
    console.log("drone", drone.clientId);
    const member = { ...currentMember };
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
  }, []);
  }
}
  );

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleNicknameSubmit = (submittedNickname) => {
    localStorage.setItem('nickname', submittedNickname);
    setNickname(submittedNickname);
  };

  const handleSendMessage = (message) => {
    if (drone && currentMember) {
      drone.publish({
        room: "observable-room", // Replace with your Scaledrone room name
        message,
      });
      const newMessage = {
        member: currentMember,
        text: message,
        id: Math.random().toString(36).substr(2, 9),
        senderTabId: localStorage.getItem('tabId'),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/DopApp"
          element={
            <DopApp
              messages={messages}
              currentMember={currentMember}
              onSendMessage={handleSendMessage}
            />
          }
        />
        <Route
          path="/"
          element={<Landing onNicknameSubmit={handleNicknameSubmit} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
