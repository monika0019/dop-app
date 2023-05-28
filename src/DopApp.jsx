import React from "react";
import { useLocation } from "react-router-dom";
import Messages from "./Messages";
import Input from "./Input";

export function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

const DopApp = ({ messages, currentMember, onSendMessage }) => {
  const location = useLocation();
  const { nickname, tabId } = location.state || {};

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

          return (
            <div
              key={message.id} // Assign unique "key" prop to each message
              className={`message ${isSent ? "sent" : "received"}`}
            >
              <div className="message-content">
                {isReceived && (
                  <span className="message-username">
                    {message.member.username}
                  </span>
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
