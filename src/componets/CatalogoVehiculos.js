// src/components/CatalogoVehiculos.jsx
import React, { useEffect, useState, useRef } from "react";
import { obtenerVehiculosPorSavegame } from "../services/VehicleService";
import { io } from "socket.io-client";
import "../styles/CatalogoVehiculos.css";

const CatalogoVehiculos = ({ savegameId }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState("");
  const socketRef = useRef(null);

  const cargarVehiculos = async () => {
    if (!savegameId) return;

    try {
      const { ok, vehiculos } = await obtenerVehiculosPorSavegame(savegameId);
      if (!ok) throw new Error(`No se pudieron obtener los vehículos del savegame ${savegameId}`);

      setVehiculos(
        vehiculos.sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra))
      );

      console.log(`Vehículos cargados para savegame ${savegameId}`);
    } catch (err) {
      setError(`⚠️ ${err.message || "Error desconocido al cargar vehículos"}`);
    }
  };

  useEffect(() => {
    cargarVehiculos();
  }, [savegameId]);

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_URL || "http://localhost:3001");

    socketRef.current.on("vehiculo_agregado", (nuevoVehiculo) => {
      console.log("📥 Vehículo recibido desde socket:", nuevoVehiculo);
      if (nuevoVehiculo.savegameId === savegameId) {
        setVehiculos((prev) => [nuevoVehiculo, ...prev]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [savegameId]);

  // 🔹 Agrupamos los vehículos por categoría
  const vehiculosPorCategoria = vehiculos.reduce((acc, vehiculo) => {
    if (!acc[vehiculo.categoria]) {
      acc[vehiculo.categoria] = [];
    }
    acc[vehiculo.categoria].push(vehiculo);
    return acc;
  }, {});

  return (
    <div className="catalogo-container">
      {error && <p className="catalogo-error">{error}</p>}

      {Object.entries(vehiculosPorCategoria).map(([categoria, lista]) => (
        <div key={categoria} className="catalogo-grupo">
          <h2 className="catalogo-subtitulo">{categoria}</h2>

          <div className="catalogo-grid">
            {lista.map((vehiculo) => {
              const nombreLimpio = vehiculo.nombre.replace(/\.[^/.]+$/, "");
              const nombreFormateado = /^[a-zA-Z]/.test(nombreLimpio)
                ? nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1)
                : nombreLimpio;

              return (
                <div className="catalogo-item" key={vehiculo.id}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/images/${vehiculo.imagen}`}
                    alt={vehiculo.nombre}
                    className="catalogo-img"
                  />
                  <div className="catalogo-info">
                    <h4 className="catalogo-nombre">{nombreFormateado}</h4>
                    <p className="catalogo-detalle">{vehiculo.marca}</p>
                    <p className="catalogo-detalle">
                      $
                      {parseInt(vehiculo.precioBase)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogoVehiculos;
