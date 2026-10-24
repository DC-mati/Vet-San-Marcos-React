import { serviciosIniciales } from '../data/catalogoInicial'
import { CLAVES, guardarLista, leerLista } from '../utils/storage'

/**
 * Inicializa la lista de servicios en localStorage si aún no existe.
 */
function asegurarDatos() {
  const actuales = leerLista(CLAVES.servicios, null)
  if (!actuales) {
    guardarLista(CLAVES.servicios, serviciosIniciales)
    return [...serviciosIniciales]
  }
  return actuales
}

/** Lista todos los servicios del catálogo. */
export function obtenerTodosServicios() {
  return asegurarDatos()
}

/** Busca un servicio por código (SV001, VA002, etc.). */
export function obtenerServicioPorCodigo(codigo) {
  return obtenerTodosServicios().find((s) => s.codigo === codigo) || null
}

/** Filtra por texto en nombre o categoría. */
export function buscarServicios(termino) {
  const texto = (termino || '').trim().toLowerCase()
  if (!texto) {
    return obtenerTodosServicios()
  }

  return obtenerTodosServicios().filter((servicio) => {
    const nombre = (servicio.nombre || '').toLowerCase()
    const categoria = (servicio.categoria || '').toLowerCase()
    return nombre.includes(texto) || categoria.includes(texto)
  })
}

/** Filtra servicios por categoría exacta. */
export function filtrarServiciosPorCategoria(categoria) {
  if (!categoria) {
    return obtenerTodosServicios()
  }

  return obtenerTodosServicios().filter(
    (servicio) => servicio.categoria === categoria,
  )
}

/** Devuelve categorías únicas ordenadas alfabéticamente. */
export function obtenerCategorias() {
  const categorias = obtenerTodosServicios().map((s) => s.categoria)
  return [...new Set(categorias)].sort()
}

/**
 * Crea un servicio nuevo. Valida código único.
 * @returns {{ ok: boolean, servicio?: object, error?: string }}
 */
export function crearServicio(datos) {
  const lista = obtenerTodosServicios()
  const codigo = (datos.codigo || '').trim()

  if (!codigo) {
    return { ok: false, error: 'El código es obligatorio.' }
  }

  if (lista.some((s) => s.codigo === codigo)) {
    return { ok: false, error: 'Ese código ya existe.' }
  }

  const nuevo = {
    codigo,
    categoria: (datos.categoria || '').trim(),
    nombre: (datos.nombre || '').trim(),
    especie: (datos.especie || '').trim(),
    duracion: (datos.duracion || '').trim(),
    precio: Number(datos.precio) || 0,
    observaciones: (datos.observaciones || '').trim(),
  }

  if (!nuevo.nombre) {
    return { ok: false, error: 'El nombre es obligatorio.' }
  }

  const actualizada = [...lista, nuevo]
  guardarLista(CLAVES.servicios, actualizada)
  return { ok: true, servicio: nuevo }
}

/** Actualiza un servicio existente por código. */
export function actualizarServicio(codigo, datos) {
  const lista = obtenerTodosServicios()
  const indice = lista.findIndex((s) => s.codigo === codigo)

  if (indice === -1) {
    return { ok: false, error: 'Servicio no encontrado.' }
  }

  const actualizado = {
    ...lista[indice],
    ...datos,
    codigo,
    precio: Number(datos.precio ?? lista[indice].precio) || 0,
  }

  const copia = [...lista]
  copia[indice] = actualizado
  guardarLista(CLAVES.servicios, copia)
  return { ok: true, servicio: actualizado }
}

/** Elimina un servicio por código. */
export function eliminarServicio(codigo) {
  const lista = obtenerTodosServicios()
  const filtrada = lista.filter((s) => s.codigo !== codigo)

  if (filtrada.length === lista.length) {
    return { ok: false, error: 'Servicio no encontrado.' }
  }

  guardarLista(CLAVES.servicios, filtrada)
  return { ok: true }
}

/** Reinicia el catálogo a los datos iniciales (solo utilidad de demo). */
export function reiniciarServicios() {
  guardarLista(CLAVES.servicios, serviciosIniciales)
  return [...serviciosIniciales]
}
