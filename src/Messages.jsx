import React from "react";

const Messages = ({ messages, currentMember }) => {
  return (
    <ul className="Messages-list">
      {messages.map((message, index) => {
        const isSent = message.member.id === currentMember.id;

        return (
          <li
            key={index}
            className={`Messages-message ${
              isSent ? "Messages-message-sent" : "Messages-message-received"
            }`}
          >
            <div className={`message-content ${isSent ? "sent" : "received-message"}`}>
              {!isSent && (
                <span className="message-username">
                  {message.senderName} 
                </span>
              )}
              <p className="text">{message.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Messages;
