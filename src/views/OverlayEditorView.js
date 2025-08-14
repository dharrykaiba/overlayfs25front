import React, { useState } from "react";
import OverlayIdListBox from "../componets/listIds";
import EditorOverlay from "../componets/EditorOverlay";
import { guardarOverlay } from "../services/HomeViewBack";

const OverlayEditorView = () => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [text, setText] = useState("Hola OBS");

  const handleGuardarOverlay = async (overlayData) => {
    try {
      const resultado = await guardarOverlay(overlayData);
      alert("Overlay guardado correctamente");
      console.log("Respuesta backend:", resultado);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <EditorOverlay
        width={width}
        height={height}
        text={text}
        setWidth={setWidth}
        setHeight={setHeight}
        setText={setText}
        onGuardar={handleGuardarOverlay}
      />
      <OverlayIdListBox />
    </div>
  );
};

export default OverlayEditorView;
