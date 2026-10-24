import { beforeEach, describe, expect, it } from 'vitest'

import {
  crearCita,
  obtenerTodasCitas,
  actualizarEstadoCita,
} from './citasService'
import { CLAVES } from '../utils/storage'

beforeEach(() => {
  localStorage.clear()
  localStorage.removeItem(CLAVES.citas)
})

describe('citasService', () => {
  it('crea una cita pendiente', () => {
    const resultado = crearCita({
      fecha: '2026-12-01',
      hora: '10:00',
      nombreMascota: 'Firulais',
      especie: 'Perro',
      codigoServicio: 'SV001',
      nombreServicio: 'Consulta general',
      correo: 'test@correo.cl',
      nombreDueno: 'Test',
      precioEstimado: 15000,
    })

    expect(resultado.ok).toBe(true)
    expect(resultado.cita.estado).toBe('Pendiente')
  })

  it('cambia el estado de una cita', () => {
    const { cita } = crearCita({
      fecha: '2026-12-02',
      hora: '11:00',
      nombreMascota: 'Mishi',
      especie: 'Gato',
      codigoServicio: 'SV001',
      nombreServicio: 'Consulta general',
      correo: 'test@correo.cl',
      nombreDueno: 'Test',
      precioEstimado: 15000,
    })

    actualizarEstadoCita(cita.id, 'Confirmada')
    const actualizada = obtenerTodasCitas().find((c) => c.id === cita.id)
    expect(actualizada?.estado).toBe('Confirmada')
  })
})
