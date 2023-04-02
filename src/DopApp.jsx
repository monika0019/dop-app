import "./App.css";
import React, { useEffect, useState, Component } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { setUsername } from "./Landing";
import Landing from "./Landing";
import { useLocation, useParams, withRouter } from 'react-router-dom';


export function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}


const DopApp = (props) => {
  console.log("Passing nickname from APP to DoApp " + props.nickname)
  console.log('DopApp rendering')
  const { messages, onSendMessage } = props;

  const nickname = Landing.nickname || 'anonymous';
  return (
    <div className="App">
      <div className="App-header">
        <h1>DopApp</h1>
        <h3>You are chatting as {props.nickname}</h3>
      </div>
      <Messages messages={messages} currentMember={nickname} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}

export { DopApp };
