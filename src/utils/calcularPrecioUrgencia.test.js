import { describe, expect, it } from 'vitest'

import {
  RECARGO_URGENCIA_FUERA_HORARIO,
  calcularPrecioUrgencia,
  esServicioUrgencia,
} from './calcularPrecioUrgencia'

describe('calcularPrecioUrgencia', () => {
  it('calcula precio base recargo fuera de horario y servicio de urgencia', () => {
    // Arrange: precio de consulta y servicio SV002
    const precioBase = 25000
    const servicioUrgencia = { codigo: 'SV002' }

    // Act: reglas de precio del catálogo
    const normal = calcularPrecioUrgencia(precioBase, false)
    const fueraHorario = calcularPrecioUrgencia(precioBase, true)
    const esUrgencia = esServicioUrgencia(servicioUrgencia)

    // Assert: montos y detección de urgencia
    expect(normal).toBe(precioBase)
    expect(fueraHorario).toBe(precioBase + RECARGO_URGENCIA_FUERA_HORARIO)
    expect(esUrgencia).toBe(true)
  })
})
