import { beforeEach, describe, expect, it } from 'vitest'

import {
  crearMascota,
  desactivarMascota,
  obtenerMascotasPorTutor,
} from './mascotasService'
import { CLAVES } from '../utils/storage'

beforeEach(() => {
  localStorage.clear()
})

describe('mascotasService', () => {
  it('registra mascotas por tutor y permite desactivar sin borrar', () => {
    // Arrange: dos tutores distintos
    const correoA = 'uno@correo.cl'
    const correoB = 'dos@correo.cl'

    // Act: altas y desactivación
    const mascotaA = crearMascota({
      nombre: 'Luna',
      especie: 'Perro',
      tutorCorreo: correoA,
    })
    crearMascota({ nombre: 'Michi', especie: 'Gato', tutorCorreo: correoB })
    desactivarMascota(mascotaA.mascota.id, correoA)
    const activasA = obtenerMascotasPorTutor(correoA)
    const activasB = obtenerMascotasPorTutor(correoB)
    const historial = JSON.parse(localStorage.getItem(CLAVES.mascotas))

    // Assert: aislamiento por tutor y persistencia
    expect(mascotaA.ok).toBe(true)
    expect(activasA).toHaveLength(0)
    expect(activasB[0].nombre).toBe('Michi')
    expect(historial[0].activo).toBe(false)
  })
})
