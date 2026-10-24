import { citasIniciales } from '../data/catalogoInicial'
import { CLAVES, guardarLista, leerLista } from '../utils/storage'
import { ESTADOS_CITA, tipoVisualPorEstado } from '../utils/estadosCita'
import { validarFechaCita } from '../utils/validaciones'
import { generarIdUnico } from '../utils/idUnico'
import { crearMascota, obtenerMascotaPorId } from './mascotasService'
import { obtenerServicioPorCodigo } from './serviciosService'

/**
 * Añade correoDueno si un registro antiguo solo tenía el campo correo.
 * No borra citas, solo completa datos faltantes.
 */
function migrarCompatibilidadCitas(lista) {
  let cambio = false

  const normalizada = lista.map((cita) => {
    let item = { ...cita }

    if (!item.correoDueno && item.correo) {
      cambio = true
      item = { ...item, correoDueno: item.correo }
    }

    if (!item.tutorCorreo && item.correoDueno) {
      cambio = true
      item = { ...item, tutorCorreo: item.correoDueno }
    }

    if (!item.mascotaId) {
      item = { ...item, mascotaId: item.mascotaId || '' }
    }

    return item
  })

  if (cambio) {
    guardarLista(CLAVES.citas, normalizada)
  }

  return normalizada
}

function asegurarCitas() {
  const actuales = leerLista(CLAVES.citas, null)
  if (!actuales) {
    guardarLista(CLAVES.citas, citasIniciales)
    return [...citasIniciales]
  }
  return migrarCompatibilidadCitas(actuales)
}

/** Evita dos solicitudes idénticas pendientes del mismo dueño. */
function esSolicitudDuplicada(datos, lista) {
  const correo = (datos.correo || datos.tutorCorreo || '').trim().toLowerCase()
  const mascotaId = (datos.mascotaId || '').trim()
  const codigo = (datos.codigoServicio || '').trim()

  return lista.some(
    (c) =>
      c.estado === ESTADOS_CITA.pendiente
      && (c.correoDueno || c.tutorCorreo || '').toLowerCase() === correo
      && (c.mascotaId || '') === mascotaId
      && c.fecha === datos.fecha
      && c.hora === datos.hora
      && (c.codigoServicio || '') === codigo,
  )
}

/**
 * Valida datos mínimos antes de crear una cita nueva.
 * Devuelve { ok, error, correo, servicio, mascotaId }.
 */
export function validarDatosNuevaCita(datos) {
  const correo = (datos.correo || datos.tutorCorreo || '').trim().toLowerCase()

  if (!correo) {
    return { ok: false, error: 'Indica el correo del dueño.' }
  }

  if (!(datos.nombreDueno || '').trim()) {
    return { ok: false, error: 'Indica el nombre del dueño.' }
  }

  const errorFecha = validarFechaCita(datos.fecha)
  if (errorFecha) {
    return { ok: false, error: errorFecha }
  }

  if (!(datos.hora || '').trim()) {
    return { ok: false, error: 'Indica la hora de la cita.' }
  }

  const codigo = (datos.codigoServicio || '').trim()
  if (!codigo) {
    return { ok: false, error: 'Selecciona un servicio válido.' }
  }

  const servicio = obtenerServicioPorCodigo(codigo)
  if (!servicio) {
    return { ok: false, error: 'El servicio no existe en el catálogo.' }
  }

  const mascotaId = (datos.mascotaId || '').trim()
  if (!mascotaId && !datos.registrarMascotaEnFlujo) {
    return {
      ok: false,
      error: 'Asocia la cita a una mascota registrada y activa.',
    }
  }

  if (datos.registrarMascotaEnFlujo && !(datos.nombreMascota || '').trim()) {
    return { ok: false, error: 'Indica el nombre de la mascota a registrar.' }
  }

  return {
    ok: true,
    correo,
    servicio,
    mascotaId,
  }
}

/** Lista todas las citas. */
export function obtenerTodasCitas() {
  return asegurarCitas()
}

/** Obtiene una cita por id. */
export function obtenerCitaPorId(id) {
  return obtenerTodasCitas().find((c) => c.id === id) || null
}

/** Citas filtradas por correo del dueño (solicitudes propias). */
export function obtenerCitasPorCorreo(correo) {
  const texto = (correo || '').trim().toLowerCase()
  return obtenerTodasCitas().filter(
    (c) => (c.correoDueno || c.tutorCorreo || '').toLowerCase() === texto,
  )
}

/**
 * Crea una solicitud de cita en estado Pendiente.
 * Exige mascota activa del dueño en citas nuevas.
 */
export function crearCita(datos) {
  let payload = { ...datos }

  if (!payload.mascotaId && payload.registrarMascotaEnFlujo) {
    const correoRegistro = (
      payload.correo
      || payload.tutorCorreo
      || ''
    ).trim().toLowerCase()

    const registro = crearMascota({
      nombre: payload.nombreMascota,
      especie: payload.especie,
      tutorCorreo: correoRegistro,
    })

    if (!registro.ok) {
      return registro
    }

    payload = {
      ...payload,
      mascotaId: registro.mascota.id,
      nombreMascota: registro.mascota.nombre,
      especie: registro.mascota.especie,
    }
  }

  const validacion = validarDatosNuevaCita(payload)
  if (!validacion.ok) {
    return validacion
  }

  const mascota = obtenerMascotaPorId(validacion.mascotaId || payload.mascotaId)
  if (!mascota || mascota.activo === false) {
    return {
      ok: false,
      error: 'La mascota no está activa o no existe.',
    }
  }

  if ((mascota.tutorCorreo || '').toLowerCase() !== validacion.correo) {
    return {
      ok: false,
      error: 'La mascota no pertenece a esta cuenta.',
    }
  }

  const listaActual = obtenerTodasCitas()
  if (esSolicitudDuplicada(payload, listaActual)) {
    return {
      ok: false,
      error: 'Ya enviaste esta solicitud. Revisa Mis citas.',
    }
  }

  const servicio = validacion.servicio
  const estadoInicial = ESTADOS_CITA.pendiente

  const nueva = {
    id: generarIdUnico('c'),
    fecha: payload.fecha,
    hora: payload.hora,
    pacienteId: payload.pacienteId || '',
    nombreMascota: payload.nombreMascota || mascota.nombre,
    especie: payload.especie || mascota.especie,
    codigoServicio: servicio.codigo,
    servicio: payload.nombreServicio || servicio.nombre,
    correoDueno: validacion.correo,
    tutorCorreo: validacion.correo,
    mascotaId: mascota.id,
    motivo: (payload.observaciones || '').trim(),
    nombreDueno: payload.nombreDueno,
    telefono: payload.telefono || '',
    observaciones: payload.observaciones || '',
    fueraHorario: Boolean(payload.fueraHorario),
    precioEstimado: Number(payload.precioEstimado) || Number(servicio.precio) || 0,
    estado: estadoInicial,
    tipo: tipoVisualPorEstado(estadoInicial),
    propuestaFecha: '',
    propuestaHora: '',
  }

  const lista = [...listaActual, nueva]
  guardarLista(CLAVES.citas, lista)
  return { ok: true, cita: nueva }
}

/** Cambia el estado de una cita (recepción / admin). */
export function actualizarEstadoCita(id, estado, extras = {}) {
  const lista = obtenerTodasCitas()
  const indice = lista.findIndex((c) => c.id === id)

  if (indice === -1) {
    return { ok: false, error: 'Cita no encontrada.' }
  }

  const actualizada = {
    ...lista[indice],
    ...extras,
    estado,
    tipo: tipoVisualPorEstado(estado) || lista[indice].tipo,
  }

  const copia = [...lista]
  copia[indice] = actualizada
  guardarLista(CLAVES.citas, copia)
  return { ok: true, cita: actualizada }
}

/** Recepción propone otra fecha u hora. */
export function proponerHorarioCita(id, propuestaFecha, propuestaHora) {
  return actualizarEstadoCita(id, ESTADOS_CITA.propuesta, {
    propuestaFecha,
    propuestaHora,
  })
}

/** Elimina una cita (administración). */
export function eliminarCita(id) {
  const lista = obtenerTodasCitas()
  const filtrada = lista.filter((c) => c.id !== id)

  if (filtrada.length === lista.length) {
    return { ok: false, error: 'Cita no encontrada.' }
  }

  guardarLista(CLAVES.citas, filtrada)
  return { ok: true }
}
