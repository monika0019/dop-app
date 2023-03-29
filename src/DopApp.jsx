import './App.css';
import React, { useEffect, useState, Component } from "react";
import Messages from "./Messages";
import Input from "./Input";
import {setUsername } from './Landing'
import Landing from './Landing';
 
function randomName() {
  const adjectives = [
    "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
    "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
    "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
    "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
    "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
    "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
    "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
    "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
    "ancient", "purple", "lively", "nameless"
  ];
  const nouns = [
    "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
    "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
    "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
    "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
    "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
    "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
    "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
    "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
    "smoke", "star"
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

/*export const NextPage = ({ nickname }) => {
  return (
    <div>
      <p>Ime: {nickname}</p>
    </div>
  );
  };*/

function DopApp () {
  const [messages, setMessages]= useState([]);
  const [member, setMember]= useState({
    username: randomName(),
    avatar: randomColor(),
    id: ''
  });
  
    const drone = new window.Scaledrone("ExTsKSbEDHLDRpqH", {
      data: member
    });
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...member};
      member.id = drone.clientId;
      setMember(member);
    });
    const room = drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const newMessage = messages;
      messages.push({member, text: data});
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });


    const onSendMessage = (message) => {
      drone.publish({
        room: "observable-room",
        message
      });
    }

    

    return (
      <div className="App">
        <div className="App-header">
          <h1>DopApp</h1>
        </div>
        <Messages
          messages={messages}
          currentMember={member}
        />
        <Input
          onSendMessage={onSendMessage}
        />
      </div>
    );
  }


export default DopApp;