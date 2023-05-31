import React, { useState } from 'react';
import './App.css';

const Input = (props) => {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setText('');
    props.onSendMessage(text);
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          className="Input-mess"
          onChange={onChange}
          value={text}
          type="text"
          placeholder={`Upiši svoju poruku i pritisni ENTER`}
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Input;
