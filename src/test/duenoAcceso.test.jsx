import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'
import {
  cleanup,
  render,
  screen,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import App from '../App'
import AppProviders from '../context/AppProviders'
import LoginPage from '../pages/LoginPage'
import DuenoDashboardPage from '../pages/DuenoDashboardPage'
import MisCitasPage from '../pages/MisCitasPage'
import RedireccionMisCitas from '../pages/RedireccionMisCitas'
import RutaProtegida from '../components/RutaProtegida'
import PublicHeader from '../components/organisms/HeaderPublico'
import { CLAVE_DEMO } from '../data/usuariosDemo'
import { crearCita, actualizarEstadoCita } from '../services/citasService'
import { crearMascota } from '../services/mascotasService'
import { CLAVES } from '../utils/storage'
import { iniciarSesion } from '../services/authService'

function renderRutas(inicial, rutas) {
  return render(
    <MemoryRouter initialEntries={[inicial]}>
      <AppProviders>{rutas}</AppProviders>
    </MemoryRouter>,
  )
}

function crearCitaDePrueba(opciones) {
  const correo = opciones.correo || 'camila@correo.cl'
  let mascotaId = opciones.mascotaId

  if (!mascotaId) {
    const registro = crearMascota({
      nombre: opciones.nombreMascota || 'Mascota QA',
      especie: opciones.especie || 'Perro',
      tutorCorreo: correo,
    })
    mascotaId = registro.mascota.id
  }

  return crearCita({
    codigoServicio: 'SV001',
    nombreServicio: 'Consulta general',
    precioEstimado: 15000,
    nombreDueno: opciones.nombreDueno || 'Dueño',
    ...opciones,
    correo,
    mascotaId,
  })
}

function sesionDueno(correo, nombre) {
  localStorage.setItem(
    CLAVES.sesion,
    JSON.stringify({ correo, nombre, rol: 'cliente' }),
  )
}

function sesionAdmin() {
  localStorage.setItem(
    CLAVES.sesion,
    JSON.stringify({
      correo: 'admin@sanmarcos.cl',
      nombre: 'Ana Contreras',
      rol: 'admin',
    }),
  )
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  sessionStorage.clear()
})

describe('Acceso del dueño de mascota', () => {
  it('1. sin sesión /dueno redirige a login', () => {
    renderRutas(
      '/dueno',
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dueno"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <DuenoDashboardPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
  })

  it('2. sin sesión /mis-citas no muestra tabla pública', () => {
    renderRutas(
      '/mis-citas',
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mis-citas" element={<RedireccionMisCitas />} />
      </Routes>,
    )

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.queryByText(/ingresa el mismo correo/i)).toBeNull()
  })

  it('3. dueño inicia sesión y ve su dashboard', async () => {
    const usuario = userEvent.setup()

    renderRutas(
      '/login',
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dueno"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <DuenoDashboardPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    await usuario.type(screen.getByLabelText(/correo electrónico/i), 'camila@correo.cl')
    await usuario.type(screen.getByLabelText(/contraseña/i), CLAVE_DEMO)
    await usuario.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(screen.getByText(/hola, camila rojas/i)).toBeInTheDocument()
    expect(
      screen.getByText(/bienvenido a tu espacio de veterinaria san marcos/i),
    ).toBeInTheDocument()
  })

  it('4. dueño solo ve sus citas en mis citas', () => {
    crearCitaDePrueba({
      fecha: '2026-12-10',
      hora: '10:00',
      nombreMascota: 'Luna',
      especie: 'Perro',
      correo: 'camila@correo.cl',
      nombreDueno: 'Camila Rojas',
    })

    crearCitaDePrueba({
      fecha: '2026-12-11',
      hora: '11:00',
      nombreMascota: 'Otro',
      especie: 'Gato',
      correo: 'otro@correo.cl',
      nombreDueno: 'Otra persona',
    })

    sesionDueno('camila@correo.cl', 'Camila Rojas')

    renderRutas(
      '/dueno/mis-citas',
      <Routes>
        <Route
          path="/dueno/mis-citas"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <MisCitasPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getAllByText('Luna').length).toBeGreaterThan(0)
    expect(screen.queryByText('Otro')).toBeNull()
  })

  it('5. dos dueños ven citas distintas', () => {
    crearCitaDePrueba({
      fecha: '2026-12-12',
      hora: '09:00',
      nombreMascota: 'Milo',
      especie: 'Perro',
      correo: 'dueno1@correo.cl',
      nombreDueno: 'Dueño Uno',
    })

    crearCitaDePrueba({
      fecha: '2026-12-13',
      hora: '09:30',
      nombreMascota: 'Kiwi',
      especie: 'Ave',
      correo: 'dueno2@correo.cl',
      nombreDueno: 'Dueño Dos',
    })

    sesionDueno('dueno1@correo.cl', 'Dueño Uno')

    const vista = renderRutas(
      '/dueno/mis-citas',
      <Routes>
        <Route
          path="/dueno/mis-citas"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <MisCitasPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getAllByText('Milo').length).toBeGreaterThan(0)
    expect(screen.queryByText('Kiwi')).toBeNull()

    cleanup()

    sesionDueno('dueno2@correo.cl', 'Dueño Dos')

    renderRutas(
      '/dueno/mis-citas',
      <Routes>
        <Route
          path="/dueno/mis-citas"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <MisCitasPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getAllByText('Kiwi').length).toBeGreaterThan(0)
    expect(screen.queryByText('Milo')).toBeNull()

    vista.unmount()
  })

  it('6. recepción cambia estado y el dueño lo ve', () => {
    const { cita } = crearCitaDePrueba({
      fecha: '2026-12-14',
      hora: '15:00',
      nombreMascota: 'Bruno',
      especie: 'Perro',
      correo: 'camila@correo.cl',
      nombreDueno: 'Camila Rojas',
    })

    actualizarEstadoCita(cita.id, 'Confirmada')
    sesionDueno('camila@correo.cl', 'Camila Rojas')

    renderRutas(
      '/dueno/mis-citas',
      <Routes>
        <Route
          path="/dueno/mis-citas"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <MisCitasPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getAllByText(/confirmada/i).length).toBeGreaterThan(0)
  })

  it('7. administrador no entra al dashboard del dueño', () => {
    sesionAdmin()

    renderRutas(
      '/dueno',
      <Routes>
        <Route path="/admin" element={<p>Panel admin</p>} />
        <Route
          path="/dueno"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <DuenoDashboardPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getByText('Panel admin')).toBeInTheDocument()
  })

  it('8. dueño cierra sesión y pierde acceso', async () => {
    const usuario = userEvent.setup()
    sesionDueno('camila@correo.cl', 'Camila Rojas')

    render(
      <MemoryRouter initialEntries={['/dueno']}>
        <AppProviders>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dueno"
              element={
                <RutaProtegida rolesPermitidos={['cliente']}>
                  <DuenoDashboardPage />
                </RutaProtegida>
              }
            />
          </Routes>
          <PublicHeader />
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByText(/hola, camila rojas/i)).toBeInTheDocument()

    const sidebar = document.querySelector('.sidebar')
    await usuario.click(
      within(sidebar).getByRole('button', { name: /cerrar sesión/i }),
    )

    expect(screen.queryByText(/hola, camila rojas/i)).toBeNull()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
  })

  it('9. nueva cita queda asociada al correo del dueño', () => {
    iniciarSesion('camila@correo.cl', CLAVE_DEMO)

    const resultado = crearCitaDePrueba({
      fecha: '2026-12-20',
      hora: '12:00',
      nombreMascota: 'Nueva',
      especie: 'Gato',
      correo: 'camila@correo.cl',
      nombreDueno: 'Camila Rojas',
    })

    expect(resultado.ok).toBe(true)
    expect(resultado.cita.correoDueno).toBe('camila@correo.cl')

    sesionDueno('camila@correo.cl', 'Camila Rojas')

    renderRutas(
      '/dueno/mis-citas',
      <Routes>
        <Route
          path="/dueno/mis-citas"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <MisCitasPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getAllByText('Nueva').length).toBeGreaterThan(0)
  })

  it('10. citas persisten en localStorage tras recargar contexto', () => {
    crearCitaDePrueba({
      fecha: '2026-12-21',
      hora: '08:00',
      nombreMascota: 'Persistente',
      especie: 'Perro',
      correo: 'camila@correo.cl',
      nombreDueno: 'Camila Rojas',
    })

    sesionDueno('camila@correo.cl', 'Camila Rojas')

    renderRutas(
      '/dueno/mis-citas',
      <Routes>
        <Route
          path="/dueno/mis-citas"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <MisCitasPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getAllByText('Persistente').length).toBeGreaterThan(0)

    cleanup()

    sesionDueno('camila@correo.cl', 'Camila Rojas')

    renderRutas(
      '/dueno/mis-citas',
      <Routes>
        <Route
          path="/dueno/mis-citas"
          element={
            <RutaProtegida rolesPermitidos={['cliente']}>
              <MisCitasPage />
            </RutaProtegida>
          }
        />
      </Routes>,
    )

    expect(screen.getAllByText('Persistente').length).toBeGreaterThan(0)
  })

  it('navbar público no muestra mis citas sin sesión', () => {
    render(
      <MemoryRouter>
        <AppProviders>
          <PublicHeader />
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.queryByRole('link', { name: /mis citas/i })).toBeNull()
  })

  it('solicitar cita sin sesión redirige a login', () => {
    render(
      <MemoryRouter initialEntries={['/solicitar-cita?codigo=SV001']}>
        <AppProviders>
          <App />
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
  })
})
