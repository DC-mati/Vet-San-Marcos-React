import { beforeEach, describe, expect, it } from 'vitest'

import {
  actualizarEstadoCita,
  crearCita,
  eliminarCita,
  obtenerTodasCitas,
  proponerHorarioCita,
  validarDatosNuevaCita,
} from './citasService'
import { crearMascota } from './mascotasService'
import { CLAVES, leerLista } from '../utils/storage'

beforeEach(() => {
  localStorage.clear()
})

describe('citasService', () => {
  it('gestiona el ciclo de vida de una cita con validaciones de negocio', () => {
    // Arrange: mascota activa y datos base de solicitud
    const correo = 'dueno@test.cl'
    const { mascota } = crearMascota({
      nombre: 'Firulais',
      especie: 'Perro',
      tutorCorreo: correo,
    })
    const solicitud = {
      fecha: '2026-12-01',
      hora: '10:00',
      mascotaId: mascota.id,
      nombreMascota: mascota.nombre,
      especie: mascota.especie,
      codigoServicio: 'SV001',
      nombreServicio: 'Consulta general',
      correo,
      nombreDueno: 'Dueño prueba',
      precioEstimado: 15000,
    }

    // Act: crear, confirmar, proponer horario y eliminar
    const sinMascota = validarDatosNuevaCita({
      fecha: solicitud.fecha,
      hora: solicitud.hora,
      codigoServicio: 'SV001',
      correo,
      nombreDueno: 'Dueño prueba',
    })
    const creada = crearCita(solicitud)
    const duplicada = crearCita(solicitud)
    const confirmada = actualizarEstadoCita(creada.cita.id, 'Confirmada')
    const propuesta = proponerHorarioCita(
      creada.cita.id,
      '2026-12-05',
      '15:00',
    )
    const eliminada = eliminarCita(creada.cita.id)

    localStorage.setItem(
      CLAVES.citas,
      JSON.stringify([
        {
          id: 'legacy',
          fecha: '2026-11-01',
          hora: '09:00',
          correo: 'legacy@correo.cl',
          estado: 'Pendiente',
        },
      ]),
    )
    const migrada = obtenerTodasCitas()

    const registroFlujo = crearCita({
      fecha: '2026-12-03',
      hora: '12:00',
      nombreMascota: 'Pelusa',
      especie: 'Gato',
      codigoServicio: 'SV001',
      correo: 'nuevo@correo.cl',
      nombreDueno: 'Nuevo',
      registrarMascotaEnFlujo: true,
    })
    const rechazoFlujo = crearCita({
      fecha: '',
      hora: '12:00',
      nombreMascota: 'NoDebeGuardarse',
      especie: 'Gato',
      codigoServicio: 'SV001',
      correo: 'fallo@test.cl',
      nombreDueno: 'Fallo',
      registrarMascotaEnFlujo: true,
    })
    const mascotasPersistidas = leerLista(CLAVES.mascotas, [])

    // Assert: reglas críticas del servicio de citas
    expect(sinMascota.ok).toBe(false)
    expect(creada.ok).toBe(true)
    expect(creada.cita.estado).toBe('Pendiente')
    expect(duplicada.ok).toBe(false)
    expect(confirmada.ok).toBe(true)
    expect(propuesta.cita.estado).toBe('Propuesta de horario')
    expect(eliminada.ok).toBe(true)
    expect(migrada[0].correoDueno).toBe('legacy@correo.cl')
    expect(registroFlujo.ok).toBe(true)
    expect(registroFlujo.cita.mascotaId).toMatch(/^m-/)
    expect(rechazoFlujo.ok).toBe(false)
    expect(
      mascotasPersistidas.some((m) => m.nombre === 'NoDebeGuardarse'),
    ).toBe(false)
  })
})
