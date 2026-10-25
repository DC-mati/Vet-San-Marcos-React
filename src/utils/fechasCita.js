import { parseFechaCita } from './citasDueno'

/** Compara una cita con una fecha del input date (YYYY-MM-DD). */
export function citaEnFechaIso(cita, fechaIso) {
  if (!cita?.fecha || !fechaIso) {
    return false
  }

  const fechaCita = parseFechaCita(cita.fecha)
  if (!fechaCita) {
    if (cita.fecha === fechaIso) {
      return true
    }
    return false
  }

  const [anio, mes, dia] = fechaIso.split('-').map(Number)
  return (
    fechaCita.getFullYear() === anio
    && fechaCita.getMonth() === mes - 1
    && fechaCita.getDate() === dia
  )
}

export function fechaIsoHoy() {
  const hoy = new Date()
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const dia = String(hoy.getDate()).padStart(2, '0')
  return `${hoy.getFullYear()}-${mes}-${dia}`
}
