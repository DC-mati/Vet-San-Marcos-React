import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import AppProviders from '../context/AppProviders'
import DuenoCatalogoPage from '../pages/DuenoCatalogoPage'
import DuenoDetalleServicioPage from '../pages/DuenoDetalleServicioPage'
import ServiciosPage from '../pages/ServiciosPage'
import RutaProtegida from '../components/RutaProtegida'
import TarjetaServicio from '../components/molecules/TarjetaServicio'
import { CLAVES } from '../utils/storage'
import { rutasCatalogoDueno } from '../constants/rutasCatalogo'
import { enlacesPanelDueno } from '../constants/enlacesDueno'

function sesionDueno() {
  localStorage.setItem(
    CLAVES.sesion,
    JSON.stringify({
      correo: 'camila@correo.cl',
      nombre: 'Camila Rojas',
      rol: 'cliente',
    }),
  )
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('Catálogo del dueño', () => {
  it('enlace Catálogo del sidebar apunta a /dueno/catalogo', () => {
    const enlace = enlacesPanelDueno.find((e) => e.texto === 'Catálogo')
    expect(enlace?.to).toBe('/dueno/catalogo')
  })

  it('catálogo privado mantiene layout del dueño', () => {
    sesionDueno()

    render(
      <MemoryRouter initialEntries={['/dueno/catalogo']}>
        <AppProviders>
          <Routes>
            <Route
              path="/dueno/catalogo"
              element={
                <RutaProtegida rolesPermitidos={['cliente']}>
                  <DuenoCatalogoPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByText('Camila Rojas')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Mi panel' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Catálogo' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /catálogo de servicios/i }),
    ).toBeInTheDocument()
  })

  it('tarjeta usa ruta de detalle privada', () => {
    const rutaDetalle = (codigo, search = '') =>
      `${rutasCatalogoDueno.detalle(codigo)}${search}`

    render(
      <MemoryRouter initialEntries={['/dueno/catalogo?categoria=Consultas']}>
        <TarjetaServicio
          servicio={{
            codigo: 'SV001',
            categoria: 'Consultas',
            nombre: 'Consulta general',
            especie: 'Perro',
            precio: 15000,
          }}
          onSolicitar={vi.fn()}
          rutaDetalle={rutaDetalle}
        />
      </MemoryRouter>,
    )

    const enlace = screen.getByRole('button', { name: /ver detalle/i })
    expect(enlace.getAttribute('href')).toContain('/dueno/catalogo/SV001')
    expect(enlace.getAttribute('href')).toContain('categoria=Consultas')
  })

  it('detalle privado muestra volver al catálogo con filtros', () => {
    sesionDueno()

    render(
      <MemoryRouter
        initialEntries={['/dueno/catalogo/SV001?categoria=Cirug%C3%ADa']}
      >
        <AppProviders>
          <Routes>
            <Route
              path="/dueno/catalogo/:codigo"
              element={
                <RutaProtegida rolesPermitidos={['cliente']}>
                  <DuenoDetalleServicioPage />
                </RutaProtegida>
              }
            />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    const volver = screen.getByRole('button', { name: /^volver$/i })
    expect(volver.getAttribute('href')).toContain('/dueno/catalogo')
    expect(volver.getAttribute('href')).toContain('categoria')
  })
})

describe('Catálogo público', () => {
  it('sigue disponible en /servicios', () => {
    render(
      <MemoryRouter initialEntries={['/servicios']}>
        <AppProviders>
          <ServiciosPage />
        </AppProviders>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /catálogo de servicios/i }),
    ).toBeInTheDocument()
  })
})
