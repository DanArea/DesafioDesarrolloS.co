import React, { useState } from 'react';
import Pizarra from './Blackboard';
import BlocDeNotas from './BlocDeNotas';
import './AiButton.css';

const ChatButton = () => {
  const [showCloud, setShowCloud] = useState(false);
  const [showPizarra, setShowPizarra] = useState(true);

  var texto = "Texto del chatttt";
  const toggleCloud = () => {
    setShowCloud(!showCloud);
  };

  const toggleView = () => {
    setShowPizarra(!showPizarra);
  };

  return (
    <div>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={showPizarra} onChange={toggleView} />
          <span className="slider round"></span>
        </label>
      </div>
      {showPizarra ? <Pizarra /> : <BlocDeNotas />}
      <div className="chat-button-container">
        <button className="chat-button" onClick={toggleCloud}>
          Chat
        </button>
        {showCloud && <div className="chat-cloud">{texto}</div>}
      </div>
    </div>
  );
};

export default ChatButton;
