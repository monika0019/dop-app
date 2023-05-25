import React from "react";
import { useLocation } from "react-router-dom";
import Messages from "./Messages";
import Input from "./Input";

export function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

const DopApp = (props) => {
  console.log("Passing nickname from APP to DoApp " + props.currentMember.username);
  console.log("DopApp rendering");
  const { messages, onSendMessage, currentMember } = props;
  const location = useLocation();
  const { nickname } = location.state || {};

  return (
    <div className="App">
      <div className="App-header">
        <h1>DopApp</h1>
        <h3>You are chatting as {nickname}</h3>
      </div>
      <div className="message-container">
        {messages.map((message) => {
          const isSent = message.member.id === currentMember.id;
          return (
            <div
              key={message.id}
              className={`message ${isSent ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                <span className="message-username">
                  {isSent ? 'You' : message.member.username}
                </span>
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

export { DopApp };
