import { describe, expect, it } from 'vitest'
import {
  RECARGO_URGENCIA_FUERA_HORARIO,
  calcularPrecioUrgencia,
  esServicioUrgencia,
} from './calcularPrecioUrgencia'

describe('calcularPrecioUrgencia', () => {
  it('devuelve el precio base sin recargo', () => {
    expect(calcularPrecioUrgencia(25000, false)).toBe(25000)
  })

  it('suma el recargo una sola vez fuera de horario', () => {
    expect(calcularPrecioUrgencia(25000, true)).toBe(
      25000 + RECARGO_URGENCIA_FUERA_HORARIO,
    )
  })

  it('detecta el servicio SV002 como urgencia', () => {
    expect(esServicioUrgencia({ codigo: 'SV002' })).toBe(true)
  })
})
