// src/components/listIds.js
import React, { useEffect, useState } from "react";
import { obtenerIdsOverlays } from "../services/HomeViewBack";
import { Link } from "react-router-dom";

const OverlayIdListBox = ({ onOverlaySelect }) => {
  const [overlays, setOverlays] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedOverlay, setSelectedOverlay] = useState(null);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const data = await obtenerIdsOverlays();
        const lista = data?.overlays || [];
        setOverlays(lista);
        if (lista.length > 0) {
          setSelectedId(lista[0].id);
          setSelectedOverlay(lista[0]);
          if (onOverlaySelect) onOverlaySelect(lista[0]);
        }
      } catch (error) {
        console.error("Error al obtener overlays:", error.message);
      }
    };

    fetchIds();
  }, [onOverlaySelect]);

  const handleChange = (e) => {
    const idSeleccionado = e.target.value;
    setSelectedId(idSeleccionado);

    const overlay = overlays.find((o) => o.id === idSeleccionado);
    setSelectedOverlay(overlay);

    if (overlay && onOverlaySelect) {
      onOverlaySelect(overlay);
    }
  };

  const obtenerWidthHeight = (resolucion) => {
    if (!resolucion) return { width: 0, height: 0 };
    const [width, height] = resolucion.split("x").map(Number);
    return { width, height };
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleString(); // o .toLocaleDateString() si solo quieres la fecha
  };

  return (
    <div>
      <label htmlFor="overlay-select">Selecciona un ID de Overlay:</label>
      <select id="overlay-select" value={selectedId} onChange={handleChange}>
        {overlays.map((overlay) => (
          <option key={overlay.id} value={overlay.id}>
            {overlay.id}
          </option>
        ))}
      </select>

      {selectedOverlay && (
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>ID:</strong> {selectedOverlay.id}
          </p>
          <p>
            <strong>Resolución:</strong> {selectedOverlay.resolucion}
          </p>
          <p>
            <strong>Texto:</strong> {selectedOverlay.texto}
          </p>
          <p>
            <strong>Color:</strong> {selectedOverlay.extra?.color}
          </p>
          <p>
            <strong>Fuente:</strong> {selectedOverlay.extra?.fuente}
          </p>
          <p>
            <strong>Tamaño:</strong> {selectedOverlay.extra?.tamaño}px
          </p>
          <p>
            <strong>Posición:</strong> X: {selectedOverlay.extra?.posicion?.x},
            Y: {selectedOverlay.extra?.posicion?.y}
          </p>
          <p>
            <strong>Creado en:</strong> {formatFecha(selectedOverlay.createdAt)}
          </p>

          <Link
            to={`/overlayid/${selectedOverlay.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={{ marginTop: "0.5rem" }}>
              Ver Overlay en nueva ventana
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OverlayIdListBox;
