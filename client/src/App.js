import React from "react";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/Perfiles/LoginPage";
import RegisterPage from "./Pages/Perfiles/RegisterPage";
import AccountPage from "./Pages/Perfiles/AccountPage";
import UsersPage from "./Pages/Perfiles/UsersPage";
import AgregarServicios from "./Pages/Servicios/AgregarServicios";
import EditarServicios from "./Pages/Servicios/EditarServicios"
import ServicioPage from "./Pages/Servicios/ServicioPage";
import AgregarTrabajo from "./Pages/Trabajos/AgregarTrabajos";
import EditarTrabajos from "./Pages/Trabajos/EditarTrabajos"
import Trabajos from "./Pages/Trabajos/Trabajos"
import AgregarCertificacion from "./Pages/Certificaciones/AgregarCertificacion";
import EditarCertificacion from "./Pages/Certificaciones/EditarCertificacion";
import Certificaciones from "./Pages/Certificaciones/Certificaciones";
import MapadeServicioscercanosPage from "./Pages/Maps/MapadeServicioscercanosPage";
/* import ServiciosPage from "./Pages/Categorias/ServiciosPage";
import TodosLosServiciosPage from "./Pages/Servicios/TodosLosServiciosPage";
import MapadeServicioscercanosPage from "./Pages/Maps/MapadeServicioscercanosPage";
import DetalleProfesionalPage from "./Pages/Proveedores/DetalleProfesionalPage"
 */

import NotFoundPage from "./Pages/NotFound/NotFoundPage";
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';



//import Layout from "./components/Layouts/Layout";



function App() {
  return (
    <div /* className="container" */ >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/account" element={<AccountPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/nuevoServicio" element={<AgregarServicios />} />
          <Route path="/editarservicio" element={<EditarServicios />} />
          <Route path="/servicios" element={<ServicioPage />} />
          <Route path="/nuevotrabajo" element={<AgregarTrabajo />} />
          <Route path="/editarTrabajo/:trabajoId" element={<EditarTrabajos />} />
          <Route path="/trabajos" element={<Trabajos />} />
          <Route path="/nuevacertificacion" element={<AgregarCertificacion />} />
          <Route path="/editarcertificacion" element={<EditarCertificacion />} />
          <Route path="/certificaciones" element={<Certificaciones />} />
          <Route path="/mapaservicioscerca" element={<MapadeServicioscercanosPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;



