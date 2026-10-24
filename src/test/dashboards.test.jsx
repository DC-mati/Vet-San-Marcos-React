import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import AppProviders from '../context/AppProviders'
import DashboardStats from '../components/organisms/DashBoardStats'
import DuenoSolicitarCitaPage from '../pages/DuenoSolicitarCitaPage'
import RutaProtegida from '../components/RutaProtegida'
import VeterinarioDashboardPage from '../pages/VeterinarioDashboardPage'
import { CLAVES } from '../utils/storage'
import { validarPropuestaHorario } from '../utils/citasEstados'
import { resolverDestinoTrasLogin } from '../utils/destinoLogin'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

function sesion(rol, correo, nombre) {
  localStorage.setItem(
    CLAVES.sesion,
    JSON.stringify({ rol, correo, nombre }),
  )
}

describe('Dashboards unificados', () => {
  it('7. admin no usa estadísticas fijas en DashboardStats', () => {
    render(
      <MemoryRouter>
        <AppProviders>
          <DashboardStats />
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.queryByText('20')).toBeNull()
    expect(screen.queryByText('15')).toBeNull()
    expect(screen.getByText(/solicitudes pendientes/i)).toBeInTheDocument()
  })

  it('4. dueño abre solicitar cita con layout privado', () => {
    sesion('cliente', 'camila@correo.cl', 'Camila Rojas')

    render(
      <MemoryRouter initialEntries={['/dueno/solicitar-cita']}>
        <AppProviders>
          <Routes>
            <Route
              path="/dueno/solicitar-cita"
              element={
                <RutaProtegida rolesPermitidos={['cliente']}>
                  <DuenoSolicitarCitaPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /solicitud de cita veterinaria/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /mi panel/i }).length).toBeGreaterThan(0)
    expect(screen.getByLabelText(/nombre de la mascota/i)).toBeInTheDocument()
  })

  it('15. veterinario ve panel sin acciones admin', () => {
    sesion('veterinario', 'veterinario@sanmarcos.cl', 'Dr. Martín Soto')

    render(
      <MemoryRouter initialEntries={['/veterinario']}>
        <AppProviders>
          <Routes>
            <Route
              path="/veterinario"
              element={
                <RutaProtegida rolesPermitidos={['veterinario']}>
                  <VeterinarioDashboardPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /panel veterinario/i }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /eliminar/i })).toBeNull()
  })

  it('13. rechaza propuesta de horario vacía', () => {
    const resultado = validarPropuestaHorario('', '')
    expect(resultado.ok).toBe(false)
  })

  it('19. admin con destino /dueno vuelve a su panel', () => {
    expect(resolverDestinoTrasLogin('/dueno/mis-citas', 'admin')).toBe('/admin')
  })
})
