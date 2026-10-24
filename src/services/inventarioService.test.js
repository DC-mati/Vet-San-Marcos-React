import { beforeEach, describe, expect, it } from 'vitest'

import {
  obtenerInventario,
  productosConStockBajo,
  UMBRAL_STOCK_DEMO,
} from './inventarioService'
import { medicamentosIniciales } from '../data/catalogoInicial'

beforeEach(() => {
  localStorage.clear()
})

describe('inventarioService', () => {
  it('carga el catálogo oficial de medicamentos', () => {
    const lista = obtenerInventario()
    expect(lista.length).toBe(medicamentosIniciales.length)
  })

  it('detecta stock bajo con umbral demo', () => {
    const bajos = productosConStockBajo(UMBRAL_STOCK_DEMO)
    expect(Array.isArray(bajos)).toBe(true)
  })
})
