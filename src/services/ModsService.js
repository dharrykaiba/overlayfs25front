// src/services/ModsService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const handleServiceError = (error, message) => {
  console.error("API Error:", error);
  return new Error(message || "Error en el servicio.");
};

// Servicio para obtener mods por savegameId
export const obtenerModsPorSavegame = async (savegameId) => {
  if (!savegameId || isNaN(savegameId)) {
    console.error(`❌ savegameId inválido: ${savegameId}`);
    return { ok: false, mods: [], mensaje: 'ID de partida inválido' };
  }

  console.log(`🚀 Solicitando mods para savegameId: ${savegameId} a ${API_URL}/mods/savegame/${savegameId}`);

  try {
    const response = await axios.get(`${API_URL}/mods/savegame/${savegameId}`);

    if (!response.data) {
      console.warn(`⚠️ Respuesta vacía del servidor para savegameId ${savegameId}`);
      return { ok: false, mods: [], mensaje: 'Respuesta vacía del servidor' };
    }

    // Si la API responde con mods, agregamos orden
    if (response.data?.mods && Array.isArray(response.data.mods)) {
      response.data.mods = response.data.mods.map((mod, index) => ({
        orden: index + 1,
        ...mod
      }));
    }

    const cantidad = Array.isArray(response.data.mods) ? response.data.mods.length : 0;
    console.log(`✅ Mods recibidos para savegame ${savegameId}: ${cantidad}`, response.data.mods || []);

    return response.data; // { ok: true, mods: [...] }
  } catch (error) {
    console.error(`❌ Error al obtener mods para savegameId ${savegameId}:`, error);
    throw handleServiceError(error, `No se pudieron obtener los mods del savegame ${savegameId}.`);
  }
};
