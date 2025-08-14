// src/componets/ListaMaquinasOL.js
import React, { useState, useEffect } from "react";
import "../styles/ListaMaquinasOL.css";

const ListaMaquinasOL = ({
  maquinas = [],
  width = "300px",
  height = "200px",
  backgroundColor = "rgba(0, 0, 0, 0)",
}) => {
  const [indexActual, setIndexActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (maquinas.length === 0 || pausado) return;

    const intervalo = setInterval(() => {
      setIndexActual((prev) => {
        const nuevoIndex = prev + 1;
        if (nuevoIndex >= maquinas.length) {
          setPausado(true);
          setIndexActual(null);
          setTimeout(() => {
            setPausado(false);
            setIndexActual(0);
          }, 1000); // ✅ 1 segundo de pausa
          return prev;
        }
        return nuevoIndex;
      });
    }, 9000); // ✅ 9 segundos por máquina

    return () => clearInterval(intervalo);
  }, [maquinas, pausado]);

  const maquinaActual = indexActual !== null ? maquinas[indexActual] : null;

  return (
    <div className="overlay-container" style={{ width, height, backgroundColor }}>
      {maquinaActual && (
        <div className="overlay-item fade-in" key={maquinaActual.id}>
          <img
            src={`${process.env.REACT_APP_API_URL}/images/${maquinaActual.imagen}`}
            alt={maquinaActual.nombre}
            className="overlay-img"
          />
          <div className="overlay-info">
            <h4 className="overlay-nombre">
              {maquinaActual.nombre.replace(/\.[^/.]+$/, "").replace(/^./, (c) => c.toUpperCase())}
            </h4>
            <p className="overlay-detalle">{maquinaActual.marca}</p>
            <p className="overlay-detalle">
              $
              {parseInt(maquinaActual.precioBase)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaMaquinasOL;