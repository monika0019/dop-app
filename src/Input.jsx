import React, { useState } from "react";

const Input = (props) => {
  console.log('input rendering')
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
    props.onSendMessage(text);
  }

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Upiši svoju poruku i pritisni ENTER"
          autoFocus={true}
        />
        <button>Pošalji</button>
      </form>
    </div>
  );
}

export default Input;