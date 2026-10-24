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
  it('registra mascota ligada al tutor', () => {
    const resultado = crearMascota({
      nombre: 'Luna',
      especie: 'Perro',
      tutorCorreo: 'camila@correo.cl',
    })

    expect(resultado.ok).toBe(true)
    expect(obtenerMascotasPorTutor('camila@correo.cl')).toHaveLength(1)
  })

  it('no mezcla mascotas de dos tutores', () => {
    crearMascota({
      nombre: 'A',
      tutorCorreo: 'uno@correo.cl',
    })
    crearMascota({
      nombre: 'B',
      tutorCorreo: 'dos@correo.cl',
    })

    expect(obtenerMascotasPorTutor('uno@correo.cl')[0].nombre).toBe('A')
    expect(obtenerMascotasPorTutor('dos@correo.cl')[0].nombre).toBe('B')
  })

  it('desactiva sin borrar registro', () => {
    const { mascota } = crearMascota({
      nombre: 'Kiwi',
      tutorCorreo: 'camila@correo.cl',
    })

    desactivarMascota(mascota.id, 'camila@correo.cl')
    expect(obtenerMascotasPorTutor('camila@correo.cl')).toHaveLength(0)

    const todas = JSON.parse(localStorage.getItem(CLAVES.mascotas))
    expect(todas[0].activo).toBe(false)
  })
})
