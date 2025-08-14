import React from "react";
/* */
import { HashRouter as Router } from "react-router-dom";

import "./App.css";
import Routes from "./routes/routes"; // Importa el archivo de rutas

function App() {
  return (
    <div className="App">
      {
        /**/
        <Router>
          <Routes />
        </Router>
        /**/
      }
    </div>
  );
}

export default App;
