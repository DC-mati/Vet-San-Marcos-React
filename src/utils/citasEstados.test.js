import { describe, expect, it } from 'vitest'

import { ESTADOS_CITA } from './estadosCita'
import {
  ordenarCitasRecepcion,
  puedeConfirmarCita,
  puedeMarcarRealizada,
  puedeProponerHorario,
  validarPropuestaHorario,
} from './citasEstados'

describe('citasEstados', () => {
  it('permite confirmar pendientes y propuestas', () => {
    expect(
      puedeConfirmarCita({ estado: ESTADOS_CITA.pendiente }),
    ).toBe(true)
    expect(
      puedeConfirmarCita({ estado: ESTADOS_CITA.propuesta }),
    ).toBe(true)
    expect(
      puedeConfirmarCita({ estado: ESTADOS_CITA.cancelada }),
    ).toBe(false)
  })

  it('valida propuesta en el pasado', () => {
    const resultado = validarPropuestaHorario('2000-01-01', '10:00')
    expect(resultado.ok).toBe(false)
  })

  it('valida propuesta con campos vacíos', () => {
    expect(validarPropuestaHorario('', '10:00').ok).toBe(false)
  })

  it('solo marca realizada citas confirmadas', () => {
    expect(
      puedeMarcarRealizada({ estado: ESTADOS_CITA.confirmada }),
    ).toBe(true)
    expect(
      puedeMarcarRealizada({ estado: ESTADOS_CITA.pendiente }),
    ).toBe(false)
  })

  it('ordena pendientes antes que otras', () => {
    const ordenadas = ordenarCitasRecepcion([
      { estado: ESTADOS_CITA.confirmada, fecha: '2026-01-02', hora: '09:00' },
      { estado: ESTADOS_CITA.pendiente, fecha: '2026-01-03', hora: '09:00' },
    ])

    expect(ordenadas[0].estado).toBe(ESTADOS_CITA.pendiente)
  })

  it('no propone horario en citas canceladas', () => {
    expect(
      puedeProponerHorario({ estado: ESTADOS_CITA.cancelada }),
    ).toBe(false)
  })
})
