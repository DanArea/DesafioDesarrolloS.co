import React, { useState, useEffect } from 'react';
import Pizarra from './Blackboard';
import BlocDeNotas from './BlocDeNotas';
import './AiButton.css';

const ChatButton = () => {
  const [showCloud, setShowCloud] = useState(true);
  const [showPizarra, setShowPizarra] = useState(true);
  const [texto, setTexto] = useState("Describe una situación en la que te viste enfrentando un conflicto de valores en tu trabajo anterior. ¿Cómo manejaste esa situación y qué aprendiste de ella?");

  const [isRotated, setIsRotated] = useState(true);

  const toggleCloud = () => {
    setShowCloud(!showCloud);
    setIsRotated(!isRotated);  // Cambiar el estado de rotación
  };

  const toggleView = () => {
    setShowPizarra(!showPizarra);
  };

  // Método para actualizar el texto usando la API de ChatGPT
    const updateTextFromAPI = async () => {
      const API_KEY = 'API KEY';  // Reemplazar con API key
      const prompt = "Dame un ejemplo en menos de 10 lineas de una pregunta para una entrevista de trabajo";  // Puedes ajustar esto según tus necesidades
    
      try {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            prompt: prompt,
            model: "gpt-3.5-turbo",
            max_tokens: 100  // Ajusta según tus necesidades
          })
        });
    
        const data = await response.json();
        console.log(data);  // Imprime la respuesta para verificar la estructura
        setTexto(data.choices[0].text.trim());
    
      } catch (error) {
        console.error('Error al obtener respuesta de la API:', error);
      }
    };

  useEffect(() => {
    updateTextFromAPI();  // Llamada inicial para obtener el texto
  }, []);

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
      <button className={`chat-button ${isRotated ? 'rotate' : ''}`} onClick={toggleCloud}>
          Chat
        </button>
        {showCloud && <div className="chat-cloud">{texto}</div>}
      </div>
    </div>
  );
};

export default ChatButton;
