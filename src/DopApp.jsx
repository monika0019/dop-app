import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Messages from './Messages';
import Input from './Input';
import './App.css';

export function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

const DopApp = ({ messages, currentMember, onSendMessage }) => {
  const location = useLocation();
  const { nickname } = location.state || {};

  const [senderNicknames, setSenderNicknames] = useState({});
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const channel = new BroadcastChannel('nickname_channel');

    // Generate a new clientId and send the nickname and clientId to other tabs
    const newClientId = Math.random().toString(36).substr(2, 9);
    setClientId(newClientId);
    channel.postMessage({ senderId: currentMember.id, senderNickname: nickname, clientId: newClientId });

    const handleNicknameChange = (event) => {
      const { senderId, senderNickname, clientId } = event.data;
    
      // Update the senderNicknames map with the received senderId and senderNickname
      setSenderNicknames((prevNicknames) => ({
        ...prevNicknames,
        [senderId]: senderNickname,
      }));
    
      // Update the clientId if it's different from the current clientId
      if (clientId !== newClientId) {
        setClientId(clientId);
      }
    };

    // Listen for nickname updates from other tabs
    channel.addEventListener('message', handleNicknameChange);

    return () => {
      channel.removeEventListener('message', handleNicknameChange);
      channel.close();
    };
  }, [currentMember.id, nickname]);

  const getSenderNickname = (senderId) => {
    return senderNicknames[senderId] || '';
  };

  const getNicknameLabel = (isSent, senderId) => {
    if (isSent) {
      return 'You';
    } else {
      const senderNickname = getSenderNickname(senderId);
      return senderNickname || 'Unknown';
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
          const senderId = message.member.id;
          const nicknameLabel = getNicknameLabel(isSent, senderId);

          return (
            <div
              key={message.id}
              className={`message ${isSent ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                {isSent && (
                  <p className="message-nickname">You</p>
                )}
                {!isSent && (
                  <div className="message-nickname">{nicknameLabel}</div>
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

export { DopApp };
