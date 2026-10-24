import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import FilaCategoria from './FilaCategoria'

describe('FilaCategoria', () => {
  it('agrupa nombre y cantidad y enlaza al catálogo filtrado', () => {
    render(
      <MemoryRouter>
        <ul>
          <FilaCategoria
            nombre="Cirugía"
            cantidad={6}
            enlaceCatalogo="/servicios?categoria=Cirug%C3%ADa"
          />
        </ul>
      </MemoryRouter>,
    )

    expect(screen.getByText('Cirugía')).toBeInTheDocument()
    expect(screen.getByText('6 servicios')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver servicios/i })).toHaveAttribute(
      'href',
      '/servicios?categoria=Cirug%C3%ADa',
    )
  })
})
