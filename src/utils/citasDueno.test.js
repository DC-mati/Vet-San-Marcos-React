import { describe, expect, it } from 'vitest'

import {
  filtrarCitasPorCorreo,
  listarProximasCitas,
  resumenCitasDueno,
} from './citasDueno'

describe('citasDueno', () => {
  it('filtra resume y ordena citas del dueño autenticado', () => {
    // Arrange: citas de dos dueños y fecha de referencia
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
    const hoy = new Date(2026, 9, 23)

    // Act: utilidades usadas en el panel del dueño
    const delUno = filtrarCitasPorCorreo(citas, 'uno@correo.cl')
    const resumen = resumenCitasDueno(delUno, hoy)
    const proximas = listarProximasCitas(delUno, hoy)

    // Assert: métricas del dashboard del dueño
    expect(delUno).toHaveLength(2)
    expect(resumen.pendientes).toBe(1)
    expect(resumen.confirmadas).toBe(1)
    expect(resumen.proximas).toBe(2)
    expect(proximas.map((c) => c.id)).toEqual(['a', 'c'])
  })
})
