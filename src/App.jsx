import React, {Component, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './App.css';
import Landing from './Landing';
import user from './images/user.png';
import girl from './images/girl.png';
import man from './images/man.png';
import woman from './images/woman.png';
import logo from './images/logo.png';
import Input from './Input';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


function App() {
  return (
    <Router>
    
      <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
    </Router>
  )
}

export default App;


/*function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
function App () {
   const [messages, setMessages]= useState('')
   const [member, setMember]= useState('')
  
  const state = {
    messages: [],
    member: {
      username: randomName(),
      avatar: randomColor(),
    }
  }

  
    const drone = new window.Scaledrone("ExTsKSbEDHLDRpqH", {
      data: state.member
    });
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = drone.clientId;
      setMember(state.member);
    });
    const room = drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = state.messages;
      messages.push({member, text: data});
      setMessages(state.messages);
    });


    return (
      <div className="App">
        <div className="App-header">
          <h1>DopApp</h1>
        </div>
        <Messages
          messages={state.messages}
          currentMember={state.member}
        />
        <Input
          onSendMessage={onSendMessage}
        />
      </div>
    );
  }

  const onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }


export default App;*/


