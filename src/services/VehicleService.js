// src/services/VehicleService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const handleServiceError = (error, message) => {
  console.error("API Error:", error);
  return new Error(message || "Error en el servicio.");
};

// Servicio para obtener todos los vehículos
export const obtenerVehiculos = async () => {
  try {
    const response = await axios.get(`${API_URL}/vehicle`);
    return response.data; // Devuelve el objeto con "ok" y "vehiculos"
  } catch (error) {
    throw handleServiceError(error, "No se pudieron obtener los vehículos.");
  }
};

// Servicio para obtener vehículos por savegameId
export const obtenerVehiculosPorSavegame = async (savegameId) => {
  if (!savegameId || isNaN(savegameId)) {
    console.error(`❌ savegameId inválido: ${savegameId}`);
    return { ok: false, vehiculos: [], mensaje: 'ID de partida inválido' };
  }

  console.log(`🚀 Solicitando vehículos para savegameId: ${savegameId} a ${API_URL}/vehicle/savegame/${savegameId}`);

  try {
    const response = await axios.get(`${API_URL}/vehicle/savegame/${savegameId}`);

    if (!response.data) {
      console.warn(`⚠️ Respuesta vacía del servidor para savegameId ${savegameId}`);
      return { ok: false, vehiculos: [], mensaje: 'Respuesta vacía del servidor' };
    }

    const cantidad = Array.isArray(response.data.vehiculos) ? response.data.vehiculos.length : 0;
    console.log(`✅ Vehículos recibidos para savegame ${savegameId}: ${cantidad}`, response.data.vehiculos || []);

    return response.data; // { ok: true, vehiculos: [...] }
  } catch (error) {
    console.error(`❌ Error al obtener vehículos para savegameId ${savegameId}:`, error);
    throw handleServiceError(error, `No se pudieron obtener los vehículos del savegame ${savegameId}.`);
  }
};


