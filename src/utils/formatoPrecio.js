/**
 * Convierte un número a texto de precio en pesos chilenos (CLP).
 * @param {number} monto - Valor numérico del precio
 * @returns {string} Precio formateado, por ejemplo "$15.000"
 */
export function formatoPrecio(monto) {
  const valor = Number(monto) || 0
  return `$${valor.toLocaleString('es-CL')}`
}
