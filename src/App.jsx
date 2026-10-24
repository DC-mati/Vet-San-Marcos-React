import { Navigate, Route, Routes } from 'react-router-dom'

import RutaProtegida from './components/RutaProtegida'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'
import ServiciosPage from './pages/ServiciosPage'
import CategoriasPage from './pages/CategoriasPage'
import DetalleServicioPage from './pages/DetalleServicioPage'
import RedireccionSolicitarCita from './pages/RedireccionSolicitarCita'
import MisCitasPage from './pages/MisCitasPage'
import DuenoDashboardPage from './pages/DuenoDashboardPage'
import DuenoSolicitarCitaPage from './pages/DuenoSolicitarCitaPage'
import DuenoConfirmacionCitaPage from './pages/DuenoConfirmacionCitaPage'
import DuenoResultadoCitaPage from './pages/DuenoResultadoCitaPage'
import RedireccionMisCitas from './pages/RedireccionMisCitas'
import BlogPage from './pages/BlogPage'
import BlogDetallePage from './pages/BlogDetallePage'
import AdminPage from './pages/AdminPage'
import AdminServiciosPage from './pages/AdminServiciosPage'
import AdminCitasPage from './pages/AdminCitasPage'
import AdminUsuariosPage from './pages/AdminUsuariosPage'
import AdminInventarioPage from './pages/AdminInventarioPage'
import AdminReportesPage from './pages/AdminReportesPage'
import DuenoMascotasPage from './pages/DuenoMascotasPage'
import RecepcionPage from './pages/RecepcionPage'
import RecepcionPacientesPage from './pages/RecepcionPacientesPage'
import AdminRecepcionPage from './pages/AdminRecepcionPage'
import VeterinarioDashboardPage from './pages/VeterinarioDashboardPage'
import TecnicoDashboardPage from './pages/TecnicoDashboardPage'
import NosotrosPage from './pages/NosotrosPage'
import ContactoPage from './pages/ContactoPage'
import ScrollAlCambiarRuta from './components/ScrollAlCambiarRuta'
import { rutasCitaDueno } from './constants/rutasDuenoCita'

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

      <Route path="/solicitar-cita" element={<RedireccionSolicitarCita />} />
      <Route
        path="/solicitar-cita/confirmacion"
        element={<Navigate to={rutasCitaDueno.confirmacion} replace />}
      />
      <Route
        path="/solicitar-cita/exito"
        element={<Navigate to={rutasCitaDueno.exito} replace />}
      />
      <Route
        path="/solicitar-cita/error"
        element={<Navigate to={rutasCitaDueno.error} replace />}
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
      <Route
        path="/dueno/mis-mascotas"
        element={
          <RutaProtegida rolesPermitidos={['cliente']}>
            <DuenoMascotasPage />
          </RutaProtegida>
        }
      />
      <Route
        path={rutasCitaDueno.formulario}
        element={
          <RutaProtegida rolesPermitidos={['cliente']}>
            <DuenoSolicitarCitaPage />
          </RutaProtegida>
        }
      />
      <Route
        path={rutasCitaDueno.confirmacion}
        element={
          <RutaProtegida rolesPermitidos={['cliente']}>
            <DuenoConfirmacionCitaPage />
          </RutaProtegida>
        }
      />
      <Route
        path={rutasCitaDueno.exito}
        element={
          <RutaProtegida rolesPermitidos={['cliente']}>
            <DuenoResultadoCitaPage tipo="exito" />
          </RutaProtegida>
        }
      />
      <Route
        path={rutasCitaDueno.error}
        element={
          <RutaProtegida rolesPermitidos={['cliente']}>
            <DuenoResultadoCitaPage tipo="error" />
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
        path="/admin/usuarios"
        element={
          <RutaProtegida rolesPermitidos={['admin']}>
            <AdminUsuariosPage />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/inventario"
        element={
          <RutaProtegida rolesPermitidos={['admin']}>
            <AdminInventarioPage />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/reportes"
        element={
          <RutaProtegida rolesPermitidos={['admin']}>
            <AdminReportesPage />
          </RutaProtegida>
        }
      />
      <Route
        path="/admin/recepcion"
        element={
          <RutaProtegida rolesPermitidos={['admin']}>
            <AdminRecepcionPage />
          </RutaProtegida>
        }
      />

      <Route
        path="/recepcion"
        element={
          <RutaProtegida rolesPermitidos={['recepcion']}>
            <RecepcionPage />
          </RutaProtegida>
        }
      />
      <Route
        path="/recepcion/pacientes"
        element={
          <RutaProtegida rolesPermitidos={['recepcion']}>
            <RecepcionPacientesPage />
          </RutaProtegida>
        }
      />

      <Route
        path="/veterinario"
        element={
          <RutaProtegida rolesPermitidos={['veterinario']}>
            <VeterinarioDashboardPage />
          </RutaProtegida>
        }
      />

      <Route
        path="/tecnico"
        element={
          <RutaProtegida rolesPermitidos={['tecnico']}>
            <TecnicoDashboardPage />
          </RutaProtegida>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
