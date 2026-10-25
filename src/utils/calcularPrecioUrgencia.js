/** Recargo en CLP para consulta de urgencia fuera de horario. */
export const RECARGO_URGENCIA_FUERA_HORARIO = 10000

/**
 * Calcula el precio final de un servicio de urgencia.
 * El recargo se aplica una sola vez cuando aplicaFueraHorario es true.
 *
 * @param {number} precioBase - Precio del servicio sin recargo
 * @param {boolean} aplicaFueraHorario - Si el dueño solicita fuera de horario
 * @returns {number} Precio total
 */
export function calcularPrecioUrgencia(precioBase, aplicaFueraHorario) {
  const base = Number(precioBase) || 0

  if (!aplicaFueraHorario) {
    return base
  }

  return base + RECARGO_URGENCIA_FUERA_HORARIO
}

/**
 * Indica si un servicio es la consulta de urgencia del catálogo.
 * @param {{ codigo?: string, nombre?: string }} servicio
 */
export function esServicioUrgencia(servicio) {
  if (!servicio) {
    return false
  }

  return (
    servicio.codigo === 'SV002'
    || (servicio.nombre || '').toLowerCase().includes('urgencia')
  )
}
