/**
 * Genera un identificador único para registros locales.
 * Usa randomUUID cuando el navegador lo permite.
 */
export function generarIdUnico(prefijo) {
  const base = prefijo || 'id'

  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${base}-${crypto.randomUUID()}`
  }

  const aleatorio = Math.random().toString(36).slice(2, 10)
  return `${base}-${Date.now()}-${aleatorio}`
}
