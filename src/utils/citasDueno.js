/**
 * Utilidades para filtrar y resumir citas del dueño autenticado.
 * La asociación se hace por correo (identificador único en la simulación).
 */

const ESTADOS_CANCELADOS = ['Cancelada', 'Rechazada']

/** Convierte fecha dd/mm/aaaa o aaaa-mm-dd a objeto Date (solo día). */
export function parseFechaCita(fechaTexto) {
  if (!fechaTexto) {
    return null
  }

  if (fechaTexto.includes('/')) {
    const [dia, mes, anio] = fechaTexto.split('/').map(Number)
    if (!dia || !mes || !anio) {
      return null
    }
    return new Date(anio, mes - 1, dia)
  }

  const partes = fechaTexto.split('-').map(Number)
  if (partes.length === 3) {
    const [anio, mes, dia] = partes
    return new Date(anio, mes - 1, dia)
  }

  return null
}

function inicioDelDia(fecha) {
  const copia = new Date(fecha)
  copia.setHours(0, 0, 0, 0)
  return copia
}

/** Citas que pertenecen al correo del usuario en sesión. */
export function filtrarCitasPorCorreo(citas, correoUsuario) {
  const correo = (correoUsuario || '').trim().toLowerCase()
  if (!correo) {
    return []
  }

  return citas.filter(
    (cita) => (cita.correoDueno || '').toLowerCase() === correo,
  )
}

/** Resumen numérico real a partir de las citas del dueño. */
export function resumenCitasDueno(citasDelDueno, hoy = new Date()) {
  const inicioHoy = inicioDelDia(hoy)

  const proximas = citasDelDueno.filter((cita) => {
    if (ESTADOS_CANCELADOS.includes(cita.estado)) {
      return false
    }
    const fecha = parseFechaCita(cita.fecha)
    if (!fecha) {
      return false
    }
    return inicioDelDia(fecha) >= inicioHoy
  })

  return {
    proximas: proximas.length,
    pendientes: citasDelDueno.filter((c) => c.estado === 'Pendiente').length,
    confirmadas: citasDelDueno.filter((c) => c.estado === 'Confirmada').length,
  }
}

/** Próximas citas ordenadas por fecha y hora. */
export function listarProximasCitas(citasDelDueno, hoy = new Date(), limite = 5) {
  const inicioHoy = inicioDelDia(hoy)

  return citasDelDueno
    .filter((cita) => {
      if (ESTADOS_CANCELADOS.includes(cita.estado)) {
        return false
      }
      const fecha = parseFechaCita(cita.fecha)
      return fecha && inicioDelDia(fecha) >= inicioHoy
    })
    .sort((a, b) => {
      const fa = parseFechaCita(a.fecha)?.getTime() || 0
      const fb = parseFechaCita(b.fecha)?.getTime() || 0
      if (fa !== fb) {
        return fa - fb
      }
      return (a.hora || '').localeCompare(b.hora || '')
    })
    .slice(0, limite)
}
