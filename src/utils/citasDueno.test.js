import { describe, expect, it } from 'vitest'

import {
  filtrarCitasPorCorreo,
  listarProximasCitas,
  resumenCitasDueno,
} from './citasDueno'

describe('citasDueno', () => {
  const citas = [
    {
      id: 'a',
      fecha: '25/10/2026',
      hora: '10:00',
      correoDueno: 'uno@correo.cl',
      estado: 'Pendiente',
    },
    {
      id: 'b',
      fecha: '30/10/2026',
      hora: '11:00',
      correoDueno: 'dos@correo.cl',
      estado: 'Confirmada',
    },
    {
      id: 'c',
      fecha: '01/11/2026',
      hora: '09:00',
      correoDueno: 'uno@correo.cl',
      estado: 'Confirmada',
    },
  ]

  it('filtra citas por correo del dueño', () => {
    const delUno = filtrarCitasPorCorreo(citas, 'uno@correo.cl')
    expect(delUno).toHaveLength(2)
    expect(delUno.every((c) => c.correoDueno === 'uno@correo.cl')).toBe(true)
  })

  it('calcula resumen real', () => {
    const hoy = new Date(2026, 9, 23)
    const resumen = resumenCitasDueno(
      filtrarCitasPorCorreo(citas, 'uno@correo.cl'),
      hoy,
    )

    expect(resumen.pendientes).toBe(1)
    expect(resumen.confirmadas).toBe(1)
    expect(resumen.proximas).toBe(2)
  })

  it('ordena próximas citas por fecha', () => {
    const hoy = new Date(2026, 9, 23)
    const proximas = listarProximasCitas(
      filtrarCitasPorCorreo(citas, 'uno@correo.cl'),
      hoy,
    )

    expect(proximas.map((c) => c.id)).toEqual(['a', 'c'])
  })
})
