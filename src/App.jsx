import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import {DopApp, randomColor} from './DopApp';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [currentMember, setCurrentMember] = useState(null);
  const [drone, setDrone] = useState(null);
  const [senderNicknames, setSenderNicknames] = useState({});

  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (!drone) {
      const myDrone = new window.Scaledrone('OKoLR1ZgZTNHMeUZ', { data: currentMember });
      setDrone(myDrone);
    }

    return () => {
      if (drone) {
        drone.disconnect();
      }
    };
  }, [currentMember]);

  useEffect(() => {
    if (drone) {
      drone.on('open', (error) => {
        if (error) {
          return console.log(error);
        }

        console.log('Opening connection');
        console.log('drone', drone.clientId);
        const member = { ...currentMember, color: randomColor() };
        member.id = drone.clientId;
        setCurrentMember(member);

        if (drone) {
          const room = drone.subscribe('observable-room');
          room.on('data', (data, member) => {
            console.log(member);
            const newMessage = { member, text: data };
            if (member.id !== drone.clientId) {
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
          });
        }

        drone.on('error', (error) => {
          console.error('Error with connection:', error);
        });

        drone.on('close', (event) => {
          console.log('Connection closed:', event);
        });
      });
    }
  }, [currentMember, drone]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (message) => {
    if (drone && currentMember) {
      drone.publish({
        room: 'observable-room', // Replace with your Scaledrone room name
        message,
      });
      const newMessage = {
        member: currentMember,
        text: message,
        id: Math.random().toString(36).substr(2, 9),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Landing onJoin={setCurrentMember} />}
        />
        <Route
          path="/DopApp"
          element={
            <DopApp
            messages={messages}
            currentMember={currentMember}
            onSendMessage={handleSendMessage}
            senderNicknames={senderNicknames}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;