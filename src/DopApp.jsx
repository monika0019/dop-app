import {React, useContext, createContext, useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Messages from "./Messages";
import Input from "./Input";
import './App.css';
import App from "./App";

export function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

const DopApp = ({ messages, currentMember, onSendMessage }) => {
  const location = useLocation();
  const { nickname, tabId } = location.state || {};

  const [senderNicknames, setSenderNicknames] = useState({ [tabId]: nickname });

  
  const getSenderNickname = (message) => {
    const senderTabId = message.member.tabId;
    return senderNicknames[senderTabId] || '';
  };

  const getNicknameLabel = (isSent, senderNickname) => {
    if (isSent) {
      return 'You';
    } else {
      return senderNickname;
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>DopApp</h1>
        <h3>You are chatting as {nickname}</h3>
      </div>
      <div className="message-container">
        {messages.map((message) => {
          const isSent = message.member.id === currentMember.id;
          const isReceived = !isSent;
          const senderNickname = getSenderNickname(message);
          const nicknameLabel = getNicknameLabel(isSent, senderNickname);

          return (
            <div
              key={message.id}
              className={`message ${isSent ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                {isReceived && (
                  <div className="message-nickname">{senderNickname}</div>
                )}
                {isSent && (
                  <p className="message-nickname">You</p>
                )}
                <p className="message-text">{message.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};

export {DopApp};