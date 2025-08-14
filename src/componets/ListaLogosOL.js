// src/componets/ListaLogosOL.js
import React, { useEffect, useState, useRef } from "react";
import "../styles/ListaLogosOL.css";

const ListaLogosOL = ({
  savegameId,
  width = "300px",
  height = "200px",
  backgroundColor = "rgba(0, 0, 0, 0)",
}) => {
  const [logos, setLogos] = useState([]);
  const [indexActual, setIndexActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const intervalRef = useRef(null);

  const nombresLogos = [
    "logodieseldharry.png",
    "logoxlr.png",
  ];

  useEffect(() => {
    const imagenes = nombresLogos.map((nombre) => ({
      id: nombre,
      src: `/logos/${nombre}`,
      alt: nombre.replace(/\.[^/.]+$/, ""),
    }));
    setLogos(imagenes);
  }, []);

  useEffect(() => {
    if (logos.length === 0 || pausado) return;

    intervalRef.current = setInterval(() => {
      setIndexActual((prev) => {
        const nuevoIndex = prev + 1;
        if (nuevoIndex >= logos.length) {
          setPausado(true);
          setIndexActual(null);
          setTimeout(() => {
            setPausado(false);
            setIndexActual(0);
          }, 1500); // ✅ 1 segundo de pausa
          return prev;
        }
        return nuevoIndex;
      });
    }, 9000); // ✅ 9 segundos por logo

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [logos, pausado]);

  const logoActual = indexActual !== null ? logos[indexActual] : null;

  return (
    <div
      className="overlay-container"
      style={{ width, height, backgroundColor }}
    >
      {logoActual && (
        <div className="overlay-item fade-in" key={logoActual.id}>
          <img
            src={logoActual.src}
            alt={logoActual.alt}
            className="overlay-img"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default ListaLogosOL;