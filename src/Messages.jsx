import React from 'react';
import './App.css'; 

const Messages = ({ messages, currentMember, nickname }) => {
  return (
    <ul className="Messages-list">
      {messages.map((message, index) => {
        const isSent = message.member.id === currentMember.id;

        return (
          <li
            key={index}
            className={`Messages-message ${isSent ? 'Messages-message-sent' : 'Messages-message-received'}`}
          >
            <div className="message-content">
              {!isSent && (
                <div className="avatar" style={{ backgroundColor: currentMember.color }}>
                  {currentMember.nickname.charAt(0)}
                </div>
              )}
              <div className="message-text">
                {!isSent && (
                  <span className="message-nickname">
                  {message.member.nickname}
                </span>
                
                )}
                {message.text}
              </div>
              {isSent && (
                <div className="avatar" style={{ backgroundColor: currentMember.color }}>
                  {currentMember.nickname.charAt(0)}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Messages;
