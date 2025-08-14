// src/views/Overlay.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Overlay = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const width = params.get("width") || "800";
  const height = params.get("height") || "600";
  const text = params.get("text") || "Texto por defecto";
  const color = params.get("color") || "#ffffff";
  const fuente = params.get("fuente") || "Arial";
  const tamano = params.get("tamano") || "24";
  const x = params.get("x") || "0";
  const y = params.get("y") || "0";

  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    border: "2px solid white",
    overflow: "hidden",
  };

  const textStyle = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    color: color,
    fontFamily: fuente,
    fontSize: `${tamano}px`,
    whiteSpace: "pre-wrap",
  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>{text}</div>
    </div>
  );
};

export default Overlay;
