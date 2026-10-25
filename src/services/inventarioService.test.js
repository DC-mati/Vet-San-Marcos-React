import { beforeEach, describe, expect, it } from 'vitest'

import {
  actualizarProducto,
  buscarInventario,
  filtrarInventarioPorCategoria,
  obtenerCategoriasInventario,
  obtenerInventario,
  productosConStockBajo,
  UMBRAL_STOCK_DEMO,
} from './inventarioService'
import { medicamentosIniciales } from '../data/catalogoInicial'

beforeEach(() => {
  localStorage.clear()
})

describe('inventarioService', () => {
  it('consulta filtra busca y actualiza productos del inventario', () => {
    // Arrange: primer producto del catálogo oficial
    const codigo = medicamentosIniciales[0].codigo

    // Act: operaciones usadas en el panel administrativo
    const lista = obtenerInventario()
    const categorias = obtenerCategoriasInventario()
    const porCategoria = filtrarInventarioPorCategoria(
      medicamentosIniciales[0].categoria,
    )
    const busqueda = buscarInventario(medicamentosIniciales[0].nombre.slice(0, 4))
    const bajos = productosConStockBajo(UMBRAL_STOCK_DEMO)
    const actualizado = actualizarProducto(codigo, { stock: 5 })
    const fallo = actualizarProducto('NO-EXISTE', { stock: 1 })

    // Assert: inventario coherente y editable
    expect(lista.length).toBe(medicamentosIniciales.length)
    expect(categorias.length).toBeGreaterThan(0)
    expect(porCategoria.every((p) => p.categoria === medicamentosIniciales[0].categoria)).toBe(true)
    expect(busqueda.length).toBeGreaterThan(0)
    expect(Array.isArray(bajos)).toBe(true)
    expect(actualizado.ok).toBe(true)
    expect(actualizado.producto.stock).toBe(5)
    expect(fallo.ok).toBe(false)
  })
})
