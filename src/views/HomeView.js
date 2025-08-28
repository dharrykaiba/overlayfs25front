import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CatalogoVehiculos from "../componets/CatalogoVehiculos";
import ListaMods from "../componets/ListaMods";
import "../styles/HomeView.css";

export default function HomeView() {
  const navigate = useNavigate();

  const [partida, setPartida] = useState("");
  const [carpetaJuego, setCarpetaJuego] = useState("");
  const [carpetaGamer, setCarpetaGamer] = useState("");

  useEffect(() => {
    setPartida(localStorage.getItem("partida") || "");
    setCarpetaJuego(localStorage.getItem("carpetaJuego") || "");
    setCarpetaGamer(localStorage.getItem("carpetaGamer") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("partida", partida);
    localStorage.setItem("carpetaJuego", carpetaJuego);
    localStorage.setItem("carpetaGamer", carpetaGamer);
  }, [partida, carpetaJuego, carpetaGamer]);

  return (
    <div className="home-container">
      <h1 className="home-title">🎮 OverlayApp</h1>

      <button
        className="main-button"
        onClick={() => navigate("/overlay-maquinas")}
      >
        Abrir Overlay de Máquinas
      </button>

      <div className="config-box">
        <h2 className="config-title">⚙️ Configuración rápida (opcional)</h2>

        <label>
          Número de partida:
          <input
            type="number"
            value={partida}
            onChange={(e) => setPartida(e.target.value)}
            className="config-input"
          />
        </label>

        <label>
          Carpeta del juego:
          <input
            type="file"
            webkitdirectory="true"
            onChange={(e) => setCarpetaJuego(e.target.files[0]?.path || "")}
            className="config-input"
          />
        </label>

        <label>
          Carpeta del gamer:
          <input
            type="file"
            webkitdirectory="true"
            onChange={(e) => setCarpetaGamer(e.target.files[0]?.path || "")}
            className="config-input"
          />
        </label>
      </div>
      <div className="mods-wrapper">
        <ListaMods savegameId={4} />
      </div>

      {partida && (
        <div className="catalogo-container">
          <CatalogoVehiculos savegameId={Number(partida)} />
        </div>
      )}
    </div>
  );
}
