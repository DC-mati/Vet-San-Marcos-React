import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import TarjetaServicio from './TarjetaServicio'

const servicio = {
  codigo: 'SV001',
  categoria: 'Consultas',
  nombre: 'Consulta general',
  especie: 'Perro / Gato',
  duracion: '30 min',
  precio: 15000,
  observaciones: '',
}

describe('TarjetaServicio', () => {
  it('muestra nombre, código y precio', () => {
    render(
      <MemoryRouter>
        <TarjetaServicio servicio={servicio} onSolicitar={vi.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Consulta general')).toBeInTheDocument()
    expect(screen.getByText('SV001')).toBeInTheDocument()
    expect(screen.getByText(/\$15/)).toBeInTheDocument()
  })
})
