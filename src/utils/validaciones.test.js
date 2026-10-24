import { describe, expect, it } from 'vitest'
import { validarEmail, validarFechaCita, validarSolicitudCita } from './validaciones'

describe('validaciones', () => {
  it('valida correos básicos', () => {
    expect(validarEmail('a@b.cl')).toBe(true)
    expect(validarEmail('invalido')).toBe(false)
  })

  it('rechaza fechas pasadas', () => {
    expect(validarFechaCita('2000-01-01')).toMatch(/pasada/)
  })

  it('exige campos en solicitud de cita', () => {
    const errores = validarSolicitudCita({})
    expect(errores.nombreMascota).toBeTruthy()
    expect(errores.codigoServicio).toBeTruthy()
  })
})
