/** Estados finales donde no se confirma ni reprograma. */
const ESTADOS_CERRADOS = ['Cancelada', 'Rechazada']

export function puedeConfirmarCita(cita) {
  if (!cita) {
    return false
  }
  return cita.estado === 'Pendiente' || cita.estado === 'Propuesta de horario'
}

export function puedeProponerHorario(cita) {
  if (!cita) {
    return false
  }
  if (ESTADOS_CERRADOS.includes(cita.estado)) {
    return false
  }
  return cita.estado === 'Pendiente' || cita.estado === 'Confirmada'
}

/**
 * Valida fecha y hora de una propuesta de recepción.
 * Devuelve { ok, error }.
 */
export function validarPropuestaHorario(fecha, hora) {
  if (!fecha || !hora) {
    return { ok: false, error: 'Indica fecha y hora para la propuesta.' }
  }

  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const [anio, mes, dia] = fecha.split('-').map(Number)
  const fechaObj = new Date(anio, mes - 1, dia)

  if (Number.isNaN(fechaObj.getTime())) {
    return { ok: false, error: 'La fecha no es válida.' }
  }

  if (fechaObj < hoy) {
    return { ok: false, error: 'La propuesta no puede ser en el pasado.' }
  }

  return { ok: true }
}

/** Prioriza pendientes y luego ordena por fecha. */
export function ordenarCitasRecepcion(citas) {
  const peso = (estado) => {
    if (estado === 'Pendiente') {
      return 0
    }
    if (estado === 'Propuesta de horario') {
      return 1
    }
    return 2
  }

  return [...citas].sort((a, b) => {
    const pa = peso(a.estado)
    const pb = peso(b.estado)
    if (pa !== pb) {
      return pa - pb
    }
    return `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
  })
}
