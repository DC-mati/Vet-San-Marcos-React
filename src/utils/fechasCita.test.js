import { describe, expect, it } from 'vitest'

import { citaEnFechaIso, fechaIsoHoy } from './fechasCita'

describe('fechasCita', () => {
  it('fechaIsoHoy usa formato YYYY-MM-DD', () => {
    const hoy = fechaIsoHoy()
    expect(hoy).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('citaEnFechaIso compara fechas ISO iguales', () => {
    const cita = { fecha: '2026-12-05' }
    expect(citaEnFechaIso(cita, '2026-12-05')).toBe(true)
    expect(citaEnFechaIso(cita, '2026-12-06')).toBe(false)
  })

  it('citaEnFechaIso acepta fechas con formato dd/mm/yyyy', () => {
    const cita = { fecha: '06/09/2026' }
    expect(citaEnFechaIso(cita, '2026-09-06')).toBe(true)
  })

  it('devuelve false si falta fecha o filtro', () => {
    expect(citaEnFechaIso(null, '2026-01-01')).toBe(false)
    expect(citaEnFechaIso({ fecha: '2026-01-01' }, '')).toBe(false)
  })
})
