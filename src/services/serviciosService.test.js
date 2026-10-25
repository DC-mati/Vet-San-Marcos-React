import { beforeEach, describe, expect, it } from 'vitest'

import {
  actualizarServicio,
  buscarServicios,
  crearServicio,
  eliminarServicio,
  filtrarServiciosPorCategoria,
  obtenerCategorias,
  obtenerServicioPorCodigo,
  obtenerTodosServicios,
  reiniciarServicios,
} from './serviciosService'

beforeEach(() => {
  localStorage.clear()
  reiniciarServicios()
})

describe('serviciosService', () => {
  it('consulta busca filtra crea actualiza y elimina servicios', () => {
    // Arrange: datos de un servicio temporal
    const nuevo = {
      codigo: 'ZZ999',
      categoria: 'Otros',
      nombre: 'Prueba QA',
      especie: 'Perro',
      duracion: '10 min',
      precio: 1000,
      observaciones: '',
    }

    // Act: flujo CRUD del catálogo administrable
    const totalInicial = obtenerTodosServicios()
    const categorias = obtenerCategorias()
    const porCategoria = filtrarServiciosPorCategoria('Consultas')
    const busqueda = buscarServicios('hemograma')
    const alta = crearServicio(nuevo)
    const duplicado = crearServicio(nuevo)
    const edicion = actualizarServicio('ZZ999', { precio: 1500 })
    eliminarServicio('ZZ999')
    const borrado = obtenerServicioPorCodigo('ZZ999')

    // Assert: reglas del servicio de catálogo
    expect(totalInicial).toHaveLength(31)
    expect(categorias).toContain('Consultas')
    expect(porCategoria.every((s) => s.categoria === 'Consultas')).toBe(true)
    expect(busqueda.some((s) => s.codigo === 'EX001')).toBe(true)
    expect(alta.ok).toBe(true)
    expect(duplicado.ok).toBe(false)
    expect(edicion.servicio.precio).toBe(1500)
    expect(borrado).toBeNull()
    expect(obtenerServicioPorCodigo('SV001')?.nombre).toBe('Consulta general')
  })
})
