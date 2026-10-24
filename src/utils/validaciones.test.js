import { describe, expect, it } from 'vitest'

import {
  validarEmail,
  validarFechaCita,
  validarSolicitudCita,
} from './validaciones'

describe('validaciones', () => {
  it('valida correo fecha y campos mínimos de una solicitud de cita', () => {
    // Arrange: datos válidos e inválidos
    const solicitudVacia = {}

    // Act: ejecutar validadores reutilizados por formularios
    const correoValido = validarEmail('camila@correo.cl')
    const correoInvalido = validarEmail('sin-arroba')
    const fechaPasada = validarFechaCita('2000-01-01')
    const erroresFormulario = validarSolicitudCita(solicitudVacia)

    // Assert: mensajes y reglas esperadas
    expect(correoValido).toBe(true)
    expect(correoInvalido).toBe(false)
    expect(fechaPasada).toMatch(/pasada/)
    expect(erroresFormulario.nombreMascota).toBeTruthy()
    expect(erroresFormulario.codigoServicio).toBeTruthy()
  })
})
