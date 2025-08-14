// src/components/ListaVehiculos.js
import React, { useEffect, useState } from "react";
import { obtenerVehiculos } from "../services/VehicleService";
import "../styles/ListaVehiculos.css";

const ListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarVehiculos = async () => {
      try {
        const data = await obtenerVehiculos();
        if (data.ok) {
          setVehiculos(data.vehiculos);
        } else {
          setError("Error al obtener los vehículos.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    cargarVehiculos();
  }, []);

  return (
    <div className="lista-vehiculos-container">
      <h1 className="lista-vehiculos-titulo">Listado de Vehículos</h1>

      {error && <p className="lista-vehiculos-error">{error}</p>}

      <div className="lista-vehiculos-grid">
        {vehiculos.map((vehiculo) => (
          <div className="vehiculo-card" key={vehiculo.id}>
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${vehiculo.imagen}`}
              alt={vehiculo.nombre}
              className="vehiculo-img"
            />
            <h3 className="vehiculo-nombre">{vehiculo.nombre}</h3>
            <p className="vehiculo-info">
              <strong>Marca:</strong> {vehiculo.marca}
            </p>
            <p className="vehiculo-info">
              <strong>Categoría:</strong> {vehiculo.categoria}
            </p>
            <p className="vehiculo-info">
              <strong>Precio Base:</strong> S/ {vehiculo.precioBase}
            </p>
            <p className="vehiculo-info">
              <strong>Antigüedad (horas):</strong> {vehiculo.antiguedadHoras}
            </p>
            <p className="vehiculo-info">
              <strong>Fecha Compra:</strong>{" "}
              {new Date(vehiculo.fechaCompra).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaVehiculos;
