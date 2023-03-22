import {useState} from "react";
import React from "react";

function Messages () {
  
    const [messages, setMessages] = useState();
    
    return (
      <ul className="Messages-list">
        {messages.map(m => setMessages(m))}
        
      </ul>
    );
  
  function renderMessage(message) {
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
        "Messages-message currentMember" : "Messages-message";
    return (
        <li className={className}>
        <span
            className="Avatar-pic-my"
            style={{backgroundColor: member.clientData.randomAvartar}}
        />
        <div className="Message-content">
            <div className="username">
            {member.clientData.randomName}
            </div> 
            <div className="text">{text}</div>
        </div>
        </li>
    );
    }
}


export default Messages;