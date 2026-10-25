/**
 * Estados de citas usados en la simulación.
 * PGVet usa AGENDADA, CONFIRMADA, CANCELADA y REALIZADA.
 * Aquí conservamos los textos ya guardados en localStorage.
 */

export const ESTADOS_CITA = {
  pendiente: 'Pendiente',
  confirmada: 'Confirmada',
  propuesta: 'Propuesta de horario',
  cancelada: 'Cancelada',
  rechazada: 'Rechazada',
  realizada: 'Realizada',
  enEspera: 'En espera',
}

/** Estilo Bootstrap para la etiqueta visual. */
export function tipoVisualPorEstado(estado) {
  const mapa = {
    [ESTADOS_CITA.confirmada]: 'ok',
    [ESTADOS_CITA.pendiente]: 'warning',
    [ESTADOS_CITA.enEspera]: 'info',
    [ESTADOS_CITA.propuesta]: 'info',
    [ESTADOS_CITA.rechazada]: 'danger',
    [ESTADOS_CITA.cancelada]: 'danger',
    [ESTADOS_CITA.realizada]: 'secondary',
  }

  return mapa[estado] || 'secondary'
}
