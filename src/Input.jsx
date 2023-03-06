import { useState} from "react";
import React from "react";

function Input (props) {
  const [state, setState] = useState({text: ""})

  function onChange(e) {
    setState({text: e.target.value});
  }

   const onSubmit =(e) => {
    setState(e.target.value)
    props.onSendMessage(state.text);
  }


    return (
      <div className="Input-mess">
        <form onSubmit={e => onSubmit(e)}>
          <input
            value={state}
            onChange={e => onChange(e)}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }

export default Input;