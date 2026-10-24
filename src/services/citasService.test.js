import { beforeEach, describe, expect, it } from 'vitest'

import {
  crearCita,
  obtenerTodasCitas,
  actualizarEstadoCita,
  validarDatosNuevaCita,
} from './citasService'
import { crearMascota } from './mascotasService'
import { CLAVES } from '../utils/storage'

beforeEach(() => {
  localStorage.clear()
  localStorage.removeItem(CLAVES.citas)
})

function mascotaYCorreo(correo = 'test@correo.cl') {
  const { mascota } = crearMascota({
    nombre: 'Firulais',
    especie: 'Perro',
    tutorCorreo: correo,
  })
  return { mascota, correo }
}

describe('citasService', () => {
  it('crea una cita pendiente con mascota registrada', () => {
    const { mascota, correo } = mascotaYCorreo()

    const resultado = crearCita({
      fecha: '2026-12-01',
      hora: '10:00',
      nombreMascota: mascota.nombre,
      especie: mascota.especie,
      mascotaId: mascota.id,
      codigoServicio: 'SV001',
      nombreServicio: 'Consulta general',
      correo,
      nombreDueno: 'Test',
      precioEstimado: 15000,
    })

    expect(resultado.ok).toBe(true)
    expect(resultado.cita.estado).toBe('Pendiente')
    expect(resultado.cita.mascotaId).toBe(mascota.id)
  })

  it('rechaza cita nueva sin mascota', () => {
    const validacion = validarDatosNuevaCita({
      fecha: '2026-12-01',
      hora: '10:00',
      codigoServicio: 'SV001',
      correo: 'test@correo.cl',
      nombreDueno: 'Test',
    })

    expect(validacion.ok).toBe(false)
  })

  it('rechaza servicio inexistente', () => {
    const { mascota, correo } = mascotaYCorreo()

    const resultado = crearCita({
      fecha: '2026-12-01',
      hora: '10:00',
      mascotaId: mascota.id,
      nombreMascota: mascota.nombre,
      especie: mascota.especie,
      codigoServicio: 'NO-EXISTE',
      correo,
      nombreDueno: 'Test',
    })

    expect(resultado.ok).toBe(false)
  })

  it('rechaza solicitud duplicada pendiente', () => {
    const { mascota, correo } = mascotaYCorreo()
    const base = {
      fecha: '2026-12-02',
      hora: '11:00',
      mascotaId: mascota.id,
      nombreMascota: mascota.nombre,
      especie: mascota.especie,
      codigoServicio: 'SV001',
      nombreServicio: 'Consulta general',
      correo,
      nombreDueno: 'Test',
      precioEstimado: 15000,
    }

    expect(crearCita(base).ok).toBe(true)
    expect(crearCita(base).ok).toBe(false)
  })

  it('migra correo antiguo a correoDueno', () => {
    localStorage.setItem(
      CLAVES.citas,
      JSON.stringify([
        {
          id: 'legacy',
          fecha: '2026-11-01',
          hora: '10:00',
          correo: 'legacy@correo.cl',
          estado: 'Pendiente',
        },
      ]),
    )

    const lista = obtenerTodasCitas()
    expect(lista[0].correoDueno).toBe('legacy@correo.cl')
  })

  it('cambia el estado de una cita', () => {
    const { mascota, correo } = mascotaYCorreo()
    const { cita } = crearCita({
      fecha: '2026-12-02',
      hora: '11:00',
      nombreMascota: mascota.nombre,
      especie: mascota.especie,
      mascotaId: mascota.id,
      codigoServicio: 'SV001',
      nombreServicio: 'Consulta general',
      correo,
      nombreDueno: 'Test',
      precioEstimado: 15000,
    })

    actualizarEstadoCita(cita.id, 'Confirmada')
    const actualizada = obtenerTodasCitas().find((c) => c.id === cita.id)
    expect(actualizada?.estado).toBe('Confirmada')
  })

  it('registra mascota en flujo cuando se indica la bandera', () => {
    const correo = 'nuevo@correo.cl'
    const resultado = crearCita({
      fecha: '2026-12-03',
      hora: '12:00',
      nombreMascota: 'Pelusa',
      especie: 'Gato',
      codigoServicio: 'SV001',
      nombreServicio: 'Consulta general',
      correo,
      nombreDueno: 'Nuevo dueño',
      registrarMascotaEnFlujo: true,
    })

    expect(resultado.ok).toBe(true)
    expect(resultado.cita.mascotaId).toMatch(/^m-/)
  })
})
