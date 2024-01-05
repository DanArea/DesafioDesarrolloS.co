// src/BlocDeNotas.js

// src/BlocDeNotas.js

import React, { useState } from 'react';
import './BlocDeNotas.css';

function BlocDeNotas() {
  const [texto, setTexto] = useState('');

  const handleChange = (event) => {
    setTexto(event.target.value);
  };

  const guardarComoJSON = () => {
    fetch('http://localhost:3001/guardar', {
      method: 'POST', //Esto está inventado, parte de la base de que el 3001 es el servidor (que no existe para esta demostración)
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto }),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Muestra el mensaje de confirmación del servidor
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="bloc-de-notas">
      <textarea 
        className="bloc-de-notas-texto"
        value={texto}
        onChange={handleChange}
        placeholder="Escribe aquí..."
      ></textarea>
      <button className="bloc-de-notas-btn" onClick={guardarComoJSON}>¡Estoy listo!</button>
    </div>
  );
}

export default BlocDeNotas;
