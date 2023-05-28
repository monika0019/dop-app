import React from "react";

const Messages = ({ messages, currentMember, avatarColor  }) => {
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
                <div className="avatar" style={{ backgroundColor: avatarColor }}>
                  {message.member.username.charAt(0)}
                </div>
              )}
              <div className="message-text">{message.text}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Messages;
