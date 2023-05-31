import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Input from './Input';
import './App.css';

const DopApp = ({ messages, currentMember, onSendMessage }) => {
  const location = useLocation();
  const nickname = location.state?.nickname;

  const [senderNicknames, setSenderNicknames] = useState({});
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const channel = new BroadcastChannel('nickname_channel');
    const newClientId = Math.random().toString(36).substr(2, 9);
    setClientId(newClientId);

    const savedSenderNicknames = localStorage.getItem('senderNicknames');
    if (savedSenderNicknames) {
      setSenderNicknames(JSON.parse(savedSenderNicknames));
    } else {
      setSenderNicknames((prevNicknames) => ({
        ...prevNicknames,
        [currentMember.id]: currentMember.nickname,
      }));
    }

    channel.postMessage({ senderId: currentMember.id, senderNickname: nickname, clientId: newClientId });

    const handleNicknameChange = (event) => {
      const { senderId, senderNickname, clientId: newClientId } = event.data;

      setSenderNicknames((prevNicknames) => ({
        ...prevNicknames,
        [senderId]: senderNickname,
      }));

      if (clientId !== newClientId) {
        setClientId(newClientId);
      }
    };

    channel.addEventListener('message', handleNicknameChange);

    localStorage.setItem('senderNicknames', JSON.stringify(senderNicknames));
    channel.postMessage({ senderNicknames });

    return () => {
      channel.removeEventListener('message', handleNicknameChange);
      channel.close();
    };
  }, [currentMember.id, nickname]);

  useEffect(() => {
    localStorage.setItem('senderNicknames', JSON.stringify(senderNicknames));
  }, [senderNicknames]);

  const getSenderNickname = (senderId) => {
    return senderNicknames[senderId] || '';
  };

  const getNicknameLabel = useMemo(() => {
    return (senderId) => {
      if (senderId === currentMember.id) {
        return 'You';
      } else {
        const senderNickname = getSenderNickname(senderId);
        return senderNickname || 'Unknown';
      }
    };
  }, [senderNicknames, currentMember.id]);

  return (
    <div className="App">
      <div className="App-header">
        <h1>DopApp</h1>
        <h3>You are chatting as {nickname}</h3>
      </div>
      <div className="message-container">
        {messages.map((message) => {
          const senderId = message.member.id;
          const nicknameLabel = getNicknameLabel(senderId);

          return (
            <div
              key={message.id}
              className={`message ${senderId === currentMember.id ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                <div className="message-nickname">{nicknameLabel}</div>
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

export default DopApp ;
