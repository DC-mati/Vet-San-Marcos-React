import { beforeEach, describe, expect, it } from 'vitest'

import {
  buscarServicios,
  crearServicio,
  eliminarServicio,
  obtenerServicioPorCodigo,
  obtenerTodosServicios,
  reiniciarServicios,
} from './serviciosService'

beforeEach(() => {
  localStorage.clear()
  reiniciarServicios()
})

describe('serviciosService', () => {
  it('carga 31 servicios iniciales', () => {
    expect(obtenerTodosServicios()).toHaveLength(31)
  })

  it('obtiene un servicio por código', () => {
    const servicio = obtenerServicioPorCodigo('SV001')
    expect(servicio?.nombre).toBe('Consulta general')
  })

  it('busca por nombre', () => {
    const resultados = buscarServicios('hemograma')
    expect(resultados.some((s) => s.codigo === 'EX001')).toBe(true)
  })

  it('crea un servicio nuevo', () => {
    const resultado = crearServicio({
      codigo: 'ZZ999',
      categoria: 'Otros',
      nombre: 'Prueba',
      especie: 'Perro',
      duracion: '10 min',
      precio: 1000,
      observaciones: '',
    })
    expect(resultado.ok).toBe(true)
    expect(obtenerServicioPorCodigo('ZZ999')).toBeTruthy()
  })

  it('elimina un servicio', () => {
    crearServicio({
      codigo: 'ZZ998',
      categoria: 'Otros',
      nombre: 'Borrar',
      especie: 'Gato',
      duracion: '5 min',
      precio: 2000,
      observaciones: '',
    })
    eliminarServicio('ZZ998')
    expect(obtenerServicioPorCodigo('ZZ998')).toBeNull()
  })
})
