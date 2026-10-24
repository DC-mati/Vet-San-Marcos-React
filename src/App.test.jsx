import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from './App'
import AppProviders from './context/AppProviders'
import { CLAVES } from './utils/storage'

function renderApp(rutaInicial) {
  return render(
    <MemoryRouter initialEntries={[rutaInicial]}>
      <AppProviders>
        <App />
      </AppProviders>
    </MemoryRouter>,
  )
}

function sesion(rol, correo, nombre) {
  localStorage.setItem(
    CLAVES.sesion,
    JSON.stringify({ correo, nombre, rol }),
  )
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

afterEach(() => {
  cleanup()
})

describe('App', () => {
  it('integra catálogo público paneles por rol y rutas protegidas', () => {
    // Arrange y Act: catálogo público sin sesión
    const publico = renderApp('/servicios')

    // Assert: plantilla pública del catálogo
    expect(
      publico.getByRole('heading', { name: /catálogo de servicios/i }),
    ).toBeInTheDocument()
    publico.unmount()

    // Arrange: dueño autenticado en catálogo privado
    sesion('cliente', 'camila@correo.cl', 'Camila Rojas')
    const dueno = renderApp('/dueno/catalogo?categoria=Consultas')

    // Assert: sidebar del panel dueño
    expect(dueno.getByText('Camila Rojas')).toBeInTheDocument()
    expect(dueno.getByRole('link', { name: 'Catálogo' })).toBeInTheDocument()
    expect(dueno.getByLabelText(/buscar servicio/i)).toBeInTheDocument()
    dueno.unmount()

    // Arrange: administrador en recepción embebida
    sesion('admin', 'admin@sanmarcos.cl', 'Ana Contreras')
    const admin = renderApp('/admin/recepcion')

    // Assert: menú administrativo visible
    expect(admin.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(admin.getByRole('link', { name: 'Recepción' })).toBeInTheDocument()
    expect(
      admin.getByRole('heading', { name: /panel de recepción/i }),
    ).toBeInTheDocument()
    admin.unmount()

    // Arrange: recepcionista en su panel
    sesion('recepcion', 'recepcion@sanmarcos.cl', 'Carolina Pérez')
    const recepcion = renderApp('/recepcion')

    // Assert: navegación de recepción sin menú admin
    expect(recepcion.getByRole('link', { name: 'Gestión de citas' })).toBeInTheDocument()
    expect(recepcion.getByRole('link', { name: 'Pacientes' })).toBeInTheDocument()
    recepcion.unmount()

    // Arrange: sin sesión al entrar al panel dueño
    localStorage.removeItem(CLAVES.sesion)
    const bloqueo = renderApp('/dueno')

    // Assert: redirección al login
    expect(bloqueo.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
  })
})
