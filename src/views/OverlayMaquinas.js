// src/views/ListaMaquinasOverlayView.js
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { obtenerVehiculosPorSavegame } from "../services/VehicleService";
import ListaMaquinasOL from "../componets/ListaMaquinasOL";
import ListaLogosOL from "../componets/ListaLogosOL";
import "../styles/ListaMaquinasOverlayView.css";

const categoriasMaquinas = [
  "tractorsS", "tractorsM", "tractorsL", "harvesters", "cutters",
  "cultivators", "discHarrows", "powerHarrows", "cars",
  "riceHarvesters", "ricePlanters", "trucks", "planters",
  "seeders", "mowers", "forestryWinches", "plows", "misc",
];

const DURACION_POR_ITEM = 9000;      // ✅ 9 segundos por imagen
const PAUSA_ENTRE_GRUPOS = 1000;     // ✅ 1 segundo entre grupos

const ListaMaquinasOverlayView = () => {
  const { savegameId } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const overlayWidth = params.get("width") || "1920";
  const overlayHeight = params.get("height") || "1080";
  const innerWidth = params.get("boxWidth") || "250";
  const innerHeight = params.get("boxHeight") || "205";
  const x = params.get("x") || overlayWidth - innerWidth;
  const y = params.get("y") || (overlayHeight - innerHeight) / 2;

  const [grupoActual, setGrupoActual] = useState("logos");
  const [maquinas, setMaquinas] = useState([]);
  const socketRef = useRef(null);
  const intervaloRef = useRef(null);

  const cargarMaquinas = async () => {
    try {
      const data = await obtenerVehiculosPorSavegame(savegameId);
      if (data.ok) {
        const soloMaquinas = data.vehiculos
          .filter((v) => categoriasMaquinas.includes(v.categoria))
          .sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra));
        setMaquinas(soloMaquinas);
      }
    } catch (err) {
      console.error("❌ Error cargando máquinas:", err);
    }
  };

  useEffect(() => {
    if (!savegameId) return;

    cargarMaquinas();

    socketRef.current = io(process.env.REACT_APP_API_URL || "http://localhost:3001");

    socketRef.current.on("vehiculo_agregado", (nuevoVehiculo) => {
      if (categoriasMaquinas.includes(nuevoVehiculo.categoria)) {
        setMaquinas((prev) => [nuevoVehiculo, ...prev]);
      }
    });

    socketRef.current.on("reiniciar_maquinas", () => {
      cargarMaquinas();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [savegameId]);

  // Calcular duración de logos (estático, por ahora)
  const duracionLogos = 2 * DURACION_POR_ITEM + PAUSA_ENTRE_GRUPOS; // 2 logos → 2*9s + 1s
  const duracionMaquinas = maquinas.length > 0
    ? maquinas.length * DURACION_POR_ITEM + PAUSA_ENTRE_GRUPOS
    : 10000; // fallback

  useEffect(() => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }

    const duracionActual = grupoActual === "logos" ? duracionLogos : duracionMaquinas;

    intervaloRef.current = setInterval(() => {
      setGrupoActual((prev) => (prev === "logos" ? "maquinas" : "logos"));
    }, duracionActual);

    return () => clearInterval(intervaloRef.current);
  }, [grupoActual, duracionLogos, duracionMaquinas]);

  return (
    <div
      className="overlay"
      style={{ width: `${overlayWidth}px`, height: `${overlayHeight}px` }}
    >
      <div
        className="inner-box"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${innerWidth}px`,
          height: `${innerHeight}px`,
        }}
      >
        {grupoActual === "logos" && (
          <ListaLogosOL
            savegameId={Number(savegameId)}
            width={`${innerWidth}px`}
            height={`${innerHeight}px`}
          />
        )}

        {grupoActual === "maquinas" && (
          <ListaMaquinasOL
            maquinas={maquinas}
            savegameId={Number(savegameId)}
            width={`${innerWidth}px`}
            height={`${innerHeight}px`}
          />
        )}
      </div>
    </div>
  );
};

export default ListaMaquinasOverlayView;