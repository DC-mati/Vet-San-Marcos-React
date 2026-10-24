/**
 * Valida formato básico de correo electrónico.
 */
export function validarEmail(correo) {
  const texto = (correo || '').trim()
  return texto.includes('@') && texto.includes('.')
}

/**
 * Valida que la fecha de cita no sea anterior a hoy.
 * @param {string} fechaIso - Formato YYYY-MM-DD del input date
 */
export function validarFechaCita(fechaIso) {
  if (!fechaIso) {
    return 'Selecciona una fecha.'
  }

  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const fechaCita = new Date(`${fechaIso}T00:00:00`)
  if (Number.isNaN(fechaCita.getTime())) {
    return 'La fecha no es válida.'
  }

  if (fechaCita < hoy) {
    return 'No puedes elegir una fecha pasada.'
  }

  return ''
}

/**
 * Valida campos mínimos de una solicitud de cita.
 */
export function validarSolicitudCita(datos) {
  const errores = {}

  if (!(datos.nombreMascota || '').trim()) {
    errores.nombreMascota = 'Indica el nombre de la mascota.'
  }

  if (!(datos.especie || '').trim()) {
    errores.especie = 'Selecciona la especie.'
  }

  if (!(datos.codigoServicio || '').trim()) {
    errores.codigoServicio = 'Selecciona un servicio.'
  }

  const errorFecha = validarFechaCita(datos.fecha)
  if (errorFecha) {
    errores.fecha = errorFecha
  }

  if (!(datos.hora || '').trim()) {
    errores.hora = 'Selecciona una hora.'
  }

  if (!(datos.nombreDueno || '').trim()) {
    errores.nombreDueno = 'Indica tu nombre.'
  }

  if (!validarEmail(datos.correo)) {
    errores.correo = 'Escribe un correo válido.'
  }

  return errores
}
