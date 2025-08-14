// src/components/OverlayID.js
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { obtenerOverlayPorId } from "../services/HomeViewBack";

const OverlayID = () => {
  const { id } = useParams();

  const [overlayData, setOverlayData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarOverlay = async () => {
      console.log("[OverlayID] Iniciando carga de overlay...");
      console.log("[OverlayID] ID recibido:", id);

      try {
        const data = await obtenerOverlayPorId(id);
        console.log("[OverlayID] Datos recibidos desde el backend:", data);

        if (data?.ok && data?.overlay) {
          setOverlayData(data.overlay);
          console.log("[OverlayID] Overlay cargado correctamente");
        } else {
          console.warn("[OverlayID] Respuesta inesperada del backend:", data);
          setError("No se encontró el overlay o respuesta inválida.");
        }
      } catch (err) {
        console.error("[OverlayID] Error al cargar overlay:", err);
        setError(err.message || "Error al cargar el overlay.");
      }
    };

    if (id) {
      cargarOverlay();
    } else {
      console.warn("[OverlayID] No se proporcionó un ID.");
      setError("No se proporcionó un ID.");
    }
  }, [id]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!overlayData) {
    return <div>Cargando overlay...</div>;
  }

  // Desestructuración segura
  const [ancho, alto] = overlayData.resolucion?.split("x").map(Number) || [
    800, 600,
  ];
  const {
    texto = "Texto por defecto",
    extra: {
      color = "#ffffff",
      fuente = "Arial",
      tamaño = 24,
      posicion: { x = 0, y = 0 } = {},
    } = {},
  } = overlayData;

  const containerStyle = {
    width: `${ancho}px`,
    height: `${alto}px`,
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
    fontSize: `${tamaño}px`,
    whiteSpace: "pre-wrap",
  };

  console.log("[OverlayID] Renderizando overlay con estilos:", {
    containerStyle,
    textStyle,
  });

  return (
    <div style={containerStyle}>
      <div style={textStyle}>{texto}</div>
    </div>
  );
};

export default OverlayID;
