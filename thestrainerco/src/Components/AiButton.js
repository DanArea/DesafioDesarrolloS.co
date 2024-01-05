import React, { useState } from 'react';
import './AiButton.css';

const ChatButton = () => {
  const [showCloud, setShowCloud] = useState(false);

  const toggleCloud = () => {
    setShowCloud(!showCloud);
  };

  return (
    <div className="chat-button-container">
      <button className="chat-button" onClick={toggleCloud}>
        Chat
      </button>
      {showCloud && <div className="chat-cloud">Texto del chat</div>}
    </div>
  );
};

export default ChatButton;
