import React, {useContext, useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router,
  Route,
  Routes ,Link, useNavigate, useLocation } from "react-router-dom";
  import ReactDOM from 'react-dom';
import "./App.css";
import Landing from './Landing';
import { randomColor, DopApp } from './DopApp';


const App = () => {
  console.log('App rendering')
  const [messages, setMessages] = useState([]);
const [nickname, setNickname] = useState("");
function generateTabId() {
  const tabId = localStorage.getItem('tabId');
  if (tabId) {
    return tabId;
  } else {
    const newTabId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem('tabId', newTabId);
    return newTabId;
  }
}
const [currentMember, setCurrentMember] = useState({
username: nickname,
avatar: randomColor(),
id: generateTabId()
});
const [drone, setDrone] = useState(null);

useEffect(() => {
  if (!drone) {
    const myDrone = new window.Scaledrone("OKoLR1ZgZTNHMeUZ", { data: currentMember });
    setDrone(myDrone)
  }
    return () => {
      if (drone) {
        drone.disconnect();
      }
    };
  }, []);
  
  useEffect(() => {
    if (drone) {
  drone.on("open", error => {
    if (error) {
      return console.log(error);
    }
    
    console.log("openning connection");
    console.log("drone", drone.clientId);
    const member = { ...currentMember };
    member.id = drone.clientId;
    setCurrentMember(member);
    
    if (drone) {
      const room = drone.subscribe("observable-room");
      room.on("data", (data, member) => {
      console.log(member);
      setMessages(prevMessages => [...prevMessages, { member, text: data }]);
    });}

    drone.on("error", error => {
      console.error("Error with connection:", error);
    });
    
    drone.on("close", event => {
      console.log("Connection closed:", event);
    });
    
    return () => {
      if (drone) {
        drone.close();
      }
    };
  }, []);
  }
}
  );
  
  const onSendMessage = (message) => {
    drone.publish({
      room: 'observable-room',
      message
    });
    const isSentByCurrentUser = currentMember.username === nickname;

    setMessages((prevMessages) => [
      ...prevMessages,
      { member: currentMember, text: message, isSentByCurrentUser }
    ]);
  };
  

    return (
      <Router>
        <Routes>
          <Route
            path="/DopApp"
            element={<DopApp messages={messages}
            currentMember={{
              username: nickname,
              avatar: randomColor(),
              id: Math.floor(Math.random() * 9) + 10
            }} onSendMessage={onSendMessage} />}
          />
          <Route
            path="/"
            element={
              <Landing
                setNickname={setNickname}
              />
            }
          />
        </Routes>
      </Router>
);
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
