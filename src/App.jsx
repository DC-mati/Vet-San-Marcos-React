import { Navigate, Route, Routes } from 'react-router-dom'

import RutaProtegida from './components/RutaProtegida'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'
import ServiciosPage from './pages/ServiciosPage'
import CategoriasPage from './pages/CategoriasPage'
import DetalleServicioPage from './pages/DetalleServicioPage'
import SolicitarCitaPage from './pages/SolicitarCitaPage'
import ConfirmacionCitaPage from './pages/ConfirmacionCitaPage'
import ResultadoCitaPage from './pages/ResultadoCitaPage'
import MisCitasPage from './pages/MisCitasPage'
import DuenoDashboardPage from './pages/DuenoDashboardPage'
import RedireccionMisCitas from './pages/RedireccionMisCitas'
import BlogPage from './pages/BlogPage'
import BlogDetallePage from './pages/BlogDetallePage'
import AdminPage from './pages/AdminPage'
import AdminServiciosPage from './pages/AdminServiciosPage'
import AdminCitasPage from './pages/AdminCitasPage'
import RecepcionPage from './pages/RecepcionPage'
import PanelSimplePage from './pages/PanelSimplePage'
import NosotrosPage from './pages/NosotrosPage'
import ContactoPage from './pages/ContactoPage'
import ScrollAlCambiarRuta from './components/ScrollAlCambiarRuta'

export default function App() {
  return (
    <>
      <ScrollAlCambiarRuta />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nosotros" element={<NosotrosPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />

      <Route path="/servicios" element={<ServiciosPage />} />
      <Route path="/categorias" element={<CategoriasPage />} />
      <Route path="/servicios/:codigo" element={<DetalleServicioPage />} />

      <Route path="/solicitar-cita" element={<SolicitarCitaPage />} />
      <Route
        path="/solicitar-cita/confirmacion"
        element={<ConfirmacionCitaPage />}
      />
      <Route
        path="/solicitar-cita/exito"
        element={<ResultadoCitaPage tipo="exito" />}
      />
      <Route
        path="/solicitar-cita/error"
        element={<ResultadoCitaPage tipo="error" />}
      />
      <Route path="/mis-citas" element={<RedireccionMisCitas />} />

      <Route
        path="/dueno"
        element={
          <RutaProtegida rolesPermitidos={['cliente']}>
            <DuenoDashboardPage />
          </RutaProtegida>
        }
      />
      <Route
        path="/dueno/mis-citas"
        element={
          <RutaProtegida rolesPermitidos={['cliente']}>
            <MisCitasPage />
          </RutaProtegida>
        }
      />

      <Route path="/cliente" element={<Navigate to="/dueno" replace />} />

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetallePage />} />

      <Route
        path="/admin"
        element={
          <RutaProtegida rolesPermitidos={['admin']}>
            <AdminPage />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/servicios"
        element={
          <RutaProtegida rolesPermitidos={['admin']}>
            <AdminServiciosPage />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/citas"
        element={
          <RutaProtegida rolesPermitidos={['admin']}>
            <AdminCitasPage />
          </RutaProtegida>
        }
      />

      <Route
        path="/recepcion"
        element={
          <RutaProtegida rolesPermitidos={['recepcion', 'admin']}>
            <RecepcionPage />
          </RutaProtegida>
        }
      />

      <Route
        path="/veterinario"
        element={
          <RutaProtegida rolesPermitidos={['veterinario']}>
            <PanelSimplePage
              titulo="Panel veterinario"
              descripcion="Vista de demostración: agenda clínica conectada al flujo de citas."
              enlaces={[{ to: '/veterinario', texto: 'Inicio' }]}
            />
          </RutaProtegida>
        }
      />

      <Route
        path="/tecnico"
        element={
          <RutaProtegida rolesPermitidos={['tecnico']}>
            <PanelSimplePage
              titulo="Panel técnico"
              descripcion="Vista de demostración para apoyo clínico y preparación de pacientes."
              enlaces={[{ to: '/tecnico', texto: 'Inicio' }]}
            />
          </RutaProtegida>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
