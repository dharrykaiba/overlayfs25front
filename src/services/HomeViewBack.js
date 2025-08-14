// src/services/HomeViewBack.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const handleServiceError = (error, message) => {
  console.error("API Error:", error);
  return new Error(message || "Error en el servicio.");
};

// Función para probar el endpoint /
export const obtenerHome = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw handleServiceError(error, "No se pudo conectar con la API.");
  }
};

// Servicio para listar solo los IDs
export const obtenerIdsOverlays = async () => {
  try {
    const response = await axios.get(`${API_URL}/overlay`);
    return response.data;
  } catch (error) {
    throw handleServiceError(error, "No se pudieron obtener los IDs.");
  }
};
// Servicio para guardar un overlay nuevo
export const guardarOverlay = async (nuevoOverlay) => {
  try {
    const response = await axios.post(`${API_URL}/overlay/guardar`, nuevoOverlay);
    return response.data;
  } catch (error) {
    throw handleServiceError(error, "No se pudo guardar el overlay.");
  }
};

export const obtenerOverlayPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/overlay/${id}`);
    return response.data;
  } catch (error) {
    throw handleServiceError(error, "No se pudo obtener el overlay.");
  }
};
