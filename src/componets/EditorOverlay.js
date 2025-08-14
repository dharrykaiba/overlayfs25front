// src/components/EditorOverlay.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditorOverlay = ({
  width,
  height,
  text,
  setWidth,
  setHeight,
  setText,
  onGuardar
}) => {
  const [nuevoId, setNuevoId] = useState("");
  const [color, setColor] = useState("#00BFFF");
  const [fuente, setFuente] = useState("Arial");
  const [tamaño, setTamaño] = useState(26);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(100);

  const handleGuardar = async () => {
    const idGenerado = `overlay_${Date.now()}`;
    setNuevoId(idGenerado);

    const nuevoOverlay = {
      id: idGenerado,
      resolucion: `${width}x${height}`,
      texto: text,
      extra: {
        color: color,
        fuente: fuente,
        tamaño: Number(tamaño),
        posicion: {
          x: Number(posX),
          y: Number(posY)
        }
      }
    };

    if (onGuardar) {
      await onGuardar(nuevoOverlay);
    }
  };

  return (
    <div>
      <h1>Configura tu Overlay</h1>

      <label>
        Ancho (px):
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Alto (px):
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Texto:
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <br />
      <label>
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Fuente:
        <input
          type="text"
          value={fuente}
          onChange={(e) => setFuente(e.target.value)}
        />
      </label>
      <br />
      <label>
        Tamaño de texto (px):
        <input
          type="number"
          value={tamaño}
          onChange={(e) => setTamaño(e.target.value)}
        />
      </label>
      <br />
      <label>
        Posición X:
        <input
          type="number"
          value={posX}
          onChange={(e) => setPosX(e.target.value)}
        />
      </label>
      <br />
      <label>
        Posición Y:
        <input
          type="number"
          value={posY}
          onChange={(e) => setPosY(e.target.value)}
        />
      </label>
      <br />

      <Link
        to={`/overlay?width=${width}&height=${height}&text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Ver Overlay en nueva ventana</button>
      </Link>

      <br /><br />
      <button onClick={handleGuardar}>Guardar Overlay</button>

      {nuevoId && (
        <p><strong>Nuevo ID:</strong> {nuevoId}</p>
      )}
    </div>
  );
};

export default EditorOverlay;
