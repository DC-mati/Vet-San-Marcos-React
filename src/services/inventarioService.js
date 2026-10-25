import { medicamentosIniciales } from '../data/catalogoInicial'
import { CLAVES, guardarLista, leerLista } from '../utils/storage'

/** Umbral solo para alertas de demostración, no viene del Excel. */
export const UMBRAL_STOCK_DEMO = 10

function asegurarInventario() {
  const actuales = leerLista(CLAVES.medicamentos, null)
  if (!actuales) {
    guardarLista(CLAVES.medicamentos, medicamentosIniciales)
    return [...medicamentosIniciales]
  }
  return actuales
}

export function obtenerInventario() {
  return asegurarInventario()
}

export function buscarInventario(termino) {
  const texto = (termino || '').trim().toLowerCase()
  if (!texto) {
    return obtenerInventario()
  }

  return obtenerInventario().filter((item) => {
    const nombre = (item.nombre || '').toLowerCase()
    const codigo = (item.codigo || '').toLowerCase()
    const categoria = (item.categoria || '').toLowerCase()
    return (
      nombre.includes(texto)
      || codigo.includes(texto)
      || categoria.includes(texto)
    )
  })
}

export function filtrarInventarioPorCategoria(categoria) {
  if (!categoria) {
    return obtenerInventario()
  }
  return obtenerInventario().filter((item) => item.categoria === categoria)
}

export function obtenerCategoriasInventario() {
  const cats = obtenerInventario().map((i) => i.categoria)
  return [...new Set(cats)].sort()
}

export function productosConStockBajo(umbral = UMBRAL_STOCK_DEMO) {
  return obtenerInventario().filter((item) => Number(item.stock) <= umbral)
}

export function actualizarProducto(codigo, datos) {
  const lista = obtenerInventario()
  const indice = lista.findIndex((p) => p.codigo === codigo)

  if (indice === -1) {
    return { ok: false, error: 'Producto no encontrado.' }
  }

  const actualizado = {
    ...lista[indice],
    stock: Number(datos.stock ?? lista[indice].stock),
    precio: Number(datos.precio ?? lista[indice].precio),
    nombre: (datos.nombre || lista[indice].nombre).trim(),
    categoria: (datos.categoria || lista[indice].categoria).trim(),
  }

  const copia = [...lista]
  copia[indice] = actualizado
  guardarLista(CLAVES.medicamentos, copia)
  return { ok: true, producto: actualizado }
}
