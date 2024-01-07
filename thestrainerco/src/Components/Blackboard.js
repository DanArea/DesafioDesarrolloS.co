import React, { useRef, useEffect } from 'react';
import './Blackboard.css';  // Importa los estilos CSS


const Pizarra = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);
  const isErasing = useRef(false);
  var newSize = 3;

  const handleBrushSizeChange = (e) => { //Metodo para cuando el Brush-slider cambie, actualiza el tamaño del lapiz

    //console.log(e.target.value);
    newSize = e.target.value;
    ctxRef.current.lineWidth = newSize;  // Establece el nuevo ancho de línea para el pincel
  };

  const saveDrawing = async () => { //Metodo para guardar el dibujo en el backend (Luego será introduccido en Chatgpt, claro que no es compatible con inferior a 4)
    const canvas = canvasRef.current;
    const image = canvas.toDataURL(); // Obtiene la imagen en formato base64
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);// Este es el metodo para borrar la pizarra luego de guardar, está aqui porque 
    try {
      const response = await fetch('http://localhost:3001/saveDrawing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ drawing: image })
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar el dibujo');
      }
  
      const data = await response.json();
      console.log(data.message); // Dse tiene que ver 'Dibujo guardado con éxito' en la consola 
  
    } catch (error) {
      console.error('Error al intentar guardar el dibujo:', error.message);
    }

    //  Actualiza la pizarra por lo que borra el dibujo


  };
  

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    ctx.lineCap = 'round';

    const handleMouseDown = (e) => {
      isDrawing.current = true;
      isErasing.current = canvasRef.current.style.cursor === 'pointer';
      const rect = canvasRef.current.getBoundingClientRect(); // Obtén el rectángulo del canvas
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top); // Ajusta las coordenadas del mouse
    };

    const handleMouseMove = (e) => {
      if (!isDrawing.current) return;
      const rect = canvasRef.current.getBoundingClientRect(); // Obtén el rectángulo del canvas
      ctx.strokeStyle = isErasing.current ? 'white' : 'black';
      ctx.lineWidth = isErasing.current ? 3*newSize : newSize;
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top); // Ajusta las coordenadas del mouse
      ctx.stroke();
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseout', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseout', handleMouseUp);
    };
  }, []);

  const setPencilCursor = () => { //Cambia el cursor para cuando dibuje
    canvasRef.current.style.cursor = 'crosshair';
  };

  const setEraserCursor = () => {//Cambia el cursor para cuando borre
    canvasRef.current.style.cursor = 'pointer';
  };

  return (
    <div className="pizarra-container">
      <canvas ref={canvasRef} className="pizarra-canvas" />
      <div className="button-container">
        <div className="brush-slider-container">
          <input 
            type="range" 
            id="brush-slider" 
            className="brush-slider" 
            min="1" 
            max="50" 
            defaultValue="5" 
            onChange={handleBrushSizeChange}
          />
        </div>
        <button className="pizarra-button" onClick={setPencilCursor}>
          <i className="fas fa-pencil-alt"></i>  {/* Icono de lápiz */}
        </button>
        <button className="pizarra-button" onClick={setEraserCursor}>
          <i className="fas fa-eraser"></i>  {/* Icono de goma de borrar */}
        </button>
        <button className="pizarra-button" onClick={saveDrawing}>
         Envíar respuesta.
        </button>
      </div>
    </div>
  );
};

export default Pizarra;
