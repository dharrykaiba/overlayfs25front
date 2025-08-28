// src/components/ListaMods.js
import React, { useEffect, useState } from "react";
import { obtenerModsPorSavegame } from "../services/ModsService";
import "../styles/ListaMods.css";

const ListaMods = ({ savegameId = 4 }) => {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMods = async () => {
      try {
        setLoading(true);
        const response = await obtenerModsPorSavegame(savegameId);

        if (response.ok) {
          setMods(response.mods);
        } else {
          setError(response.mensaje || "Error al obtener mods");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMods();
  }, [savegameId]);

  if (loading) return <p>⏳ Cargando mods...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div className="mods-container">
      <h3>📦 Lista de Mods (Savegame {savegameId})</h3>
      <table className="mods-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Mod Name</th>
            <th>Título (ES)</th>
            <th>Título (EN)</th>
            <th>Versión</th>
            <th>Requerido</th>
            <th>Descripción (ES)</th>
            <th>Descripción (EN)</th>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody>
          {mods.map((mod, idx) => (
            <tr key={mod.id}>
              <td>{idx + 1}</td>
              <td>
                {mod.iconFilename ? (
                  <picture>
                    <source
                      srcSet={`${
                        process.env.REACT_APP_API_URL
                      }/images/${mod.iconFilename.replace(
                        /\.[^/.]+$/,
                        ".webp"
                      )}`}
                      type="image/webp"
                    />
                    <img
                      src={`${process.env.REACT_APP_API_URL}/images/${mod.iconFilename}`}
                      alt={mod.iconFilename || mod.modName}
                      className="mod-icon"
                    />
                  </picture>
                ) : (
                  "—"
                )}
              </td>

              <td>{mod.modName}</td>
              <td>{mod.title_es || "—"}</td>
              <td>{mod.title_en || "—"}</td>
              <td>{mod.version}</td>
              <td>{mod.required ? "✅ Sí" : "❌ No"}</td>
              <td className="desc-cell">
                {mod.description_es
                  ? mod.description_es.slice(0, 120) + "…"
                  : "—"}
              </td>
              <td className="desc-cell">
                {mod.description_en
                  ? mod.description_en.slice(0, 120) + "…"
                  : "—"}
              </td>
              <td className="hash-cell">{mod.fileHash || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMods;
