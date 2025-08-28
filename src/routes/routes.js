//src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeView from "../views/HomeView.js";
import Overlay from "../views/Overlay.js";
import OverlayID from "../views/OverlayID.js";
import OverlayEditorView from "../views/OverlayEditorView.js";
import OverlayMaquinas from "../views/OverlayMaquinas.js";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/overlay" element={<Overlay />} />
      <Route path="/overlayid/:id" element={<OverlayID />} />{" "}
      <Route path="/editor" element={<OverlayEditorView />} />
      <Route path="/overlay-maquinas/:savegameId" element={<OverlayMaquinas />} />
      
    </Routes>
  );
};

export default AppRouter;
