import React from "react";

const Messages = (props) => {
  console.log('mess rendering')
  const { messages, currentMember } = props;

  const renderMessage = (message, k) => {
    const { member, text } = message;
    const messageFromMe = member.username === currentMember;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li key={k} className={className}>
        <span
          className="avatar"
          style={{ backgroundColor: member.avatar }}
        />
        <div className="Message-content">
          <div className="username">{member.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }

  return (
    <ul className="Messages-list">
      {messages.map((message, k) => renderMessage(message, k))}
    </ul>
  );
}

export default Messages;