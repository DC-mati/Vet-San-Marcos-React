import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import AppProviders from '../context/AppProviders'
import AdminRecepcionPage from '../pages/AdminRecepcionPage'
import AdminUsuariosPage from '../pages/AdminUsuariosPage'
import RecepcionPage from '../pages/RecepcionPage'
import LoginPage from '../pages/LoginPage'
import RegistroPage from '../pages/RegistroPage'
import RutaProtegida from '../components/RutaProtegida'
import { CLAVES } from '../utils/storage'

function sesion(rol, correo, nombre) {
  localStorage.setItem(
    CLAVES.sesion,
    JSON.stringify({ rol, correo, nombre }),
  )
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('Navegación por rol', () => {
  it('admin en recepción mantiene menú administrativo', () => {
    sesion('admin', 'admin@sanmarcos.cl', 'Ana Contreras')

    render(
      <MemoryRouter initialEntries={['/admin/recepcion']}>
        <AppProviders>
          <Routes>
            <Route
              path="/admin/recepcion"
              element={
                <RutaProtegida rolesPermitidos={['admin']}>
                  <AdminRecepcionPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByText('Ana Contreras')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Usuarios' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Recepción' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /panel de recepción/i }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Pacientes' })).toBeNull()
  })

  it('recepcionista ve su menú en /recepcion', () => {
    sesion('recepcion', 'recepcion@sanmarcos.cl', 'Carolina Pérez')

    render(
      <MemoryRouter initialEntries={['/recepcion']}>
        <AppProviders>
          <Routes>
            <Route
              path="/recepcion"
              element={
                <RutaProtegida rolesPermitidos={['recepcion']}>
                  <RecepcionPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Gestión de citas' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pacientes' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Dashboard' })).toBeNull()
  })

  it('recepcionista no accede a /admin/recepcion', () => {
    sesion('recepcion', 'recepcion@sanmarcos.cl', 'Carolina Pérez')

    render(
      <MemoryRouter initialEntries={['/admin/recepcion']}>
        <AppProviders>
          <Routes>
            <Route path="/recepcion" element={<p>Panel recepción</p>} />
            <Route
              path="/admin/recepcion"
              element={
                <RutaProtegida rolesPermitidos={['admin']}>
                  <AdminRecepcionPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByText('Panel recepción')).toBeInTheDocument()
  })

  it('admin navega de recepción a usuarios', () => {
    sesion('admin', 'admin@sanmarcos.cl', 'Ana Contreras')

    render(
      <MemoryRouter initialEntries={['/admin/recepcion']}>
        <AppProviders>
          <Routes>
            <Route
              path="/admin/recepcion"
              element={
                <RutaProtegida rolesPermitidos={['admin']}>
                  <AdminRecepcionPage />
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
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Usuarios' })).toHaveAttribute(
      'href',
      '/admin/usuarios',
    )
  })
})

describe('Textos visibles', () => {
  it('usuarios admin no muestra PGVet ni simulación académica', () => {
    sesion('admin', 'admin@sanmarcos.cl', 'Ana Contreras')

    render(
      <MemoryRouter initialEntries={['/admin/usuarios']}>
        <AppProviders>
          <Routes>
            <Route
              path="/admin/usuarios"
              element={
                <RutaProtegida rolesPermitidos={['admin']}>
                  <AdminUsuariosPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.queryByText(/PGVet/i)).toBeNull()
    expect(screen.queryByText(/simulación académica/i)).toBeNull()
    expect(
      screen.getByText(/administra las cuentas, los roles/i),
    ).toBeInTheDocument()
  })
})

describe('Login y registro', () => {
  it('login muestra Volver al inicio', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppProviders>
          <LoginPage />
        </AppProviders>
      </MemoryRouter>,
    )

    const enlace = screen.getByRole('link', { name: /volver al inicio/i })
    expect(enlace).toHaveAttribute('href', '/')
  })

  it('registro muestra Volver al inicio', () => {
    render(
      <MemoryRouter initialEntries={['/registro']}>
        <AppProviders>
          <RegistroPage />
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
