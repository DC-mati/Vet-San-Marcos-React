import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import AppProviders from '../context/AppProviders'
import App from '../App'
import PublicFooter from '../components/organisms/PublicFooter'
import ServiciosPage from '../pages/ServiciosPage'

afterEach(() => {
  cleanup()
})

function renderApp(rutaInicial) {
  return render(
    <MemoryRouter initialEntries={[rutaInicial]}>
      <AppProviders>
        <App />
      </AppProviders>
    </MemoryRouter>,
  )
}

describe('Navegación pública', () => {
  it('muestra Contacto en /contacto con formulario', () => {
    renderApp('/contacto')

    expect(screen.getByRole('heading', { level: 1, name: 'Contacto' })).toBeInTheDocument()
    expect(screen.getByLabelText(/^nombre/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar consulta/i })).toBeInTheDocument()
  })

  it('muestra Nosotros en /nosotros', () => {
    renderApp('/nosotros')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Sobre nosotros' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/fundada en 2009/i)).toBeInTheDocument()
  })

  it('navega desde Servicios hacia Contacto con React Router', async () => {
    const usuario = userEvent.setup()
    renderApp('/servicios')

    const enlaceContacto = screen.getAllByRole('link', { name: /^contacto$/i }).find(
      (el) => el.getAttribute('href') === '/contacto',
    )

    expect(enlaceContacto).toBeTruthy()
    await usuario.click(enlaceContacto)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Contacto' }),
    ).toBeInTheDocument()
  })

  it('footer enlaza a rutas internas correctas', () => {
    render(
      <MemoryRouter>
        <PublicFooter />
      </MemoryRouter>,
    )

    const pie = screen.getAllByRole('navigation', { name: /pie/i })[0]

    expect(within(pie).getByRole('link', { name: 'Inicio' })).toHaveAttribute(
      'href',
      '/',
    )
    expect(within(pie).getByRole('link', { name: 'Servicios' })).toHaveAttribute(
      'href',
      '/servicios',
    )
    expect(within(pie).getByRole('link', { name: 'Nosotros' })).toHaveAttribute(
      'href',
      '/nosotros',
    )
    expect(within(pie).getByRole('link', { name: 'Contacto' })).toHaveAttribute(
      'href',
      '/contacto',
    )
  })

  it('aplica filtro de categoría desde la URL en Servicios', () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: '/servicios', search: '?categoria=Consultas' },
        ]}
      >
        <AppProviders>
          <Routes>
            <Route path="/servicios" element={<ServiciosPage />} />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    )

    expect(screen.getByLabelText(/categoría/i)).toHaveValue('Consultas')
    expect(screen.getByText('Consulta general')).toBeInTheDocument()
    expect(screen.queryByText('Vacuna antirrábica canina')).toBeNull()
  })
})
