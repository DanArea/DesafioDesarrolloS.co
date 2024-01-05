import React, { useRef, useEffect } from 'react';
import './Blackboard.css';  // Importa los estilos CSS


const Pizarra = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawing = useRef(false);
  const isErasing = useRef(false);
  var newSize = 5;

  const handleBrushSizeChange = (e) => {

    console.log(e.target.value);
    newSize = e.target.value;
    ctxRef.current.lineWidth = newSize;  // Establece el nuevo ancho de línea para el pincel
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
      ctx.lineWidth = isErasing.current ? 35 : newSize;
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

  const setPencilCursor = () => {
    canvasRef.current.style.cursor = 'crosshair';
  };

  const setEraserCursor = () => {
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
      </div>
    </div>
  );
};

export default Pizarra;
