import { citasIniciales } from '../data/catalogoInicial'
import { CLAVES, guardarLista, leerLista } from '../utils/storage'

/**
 * Añade correoDueno si un registro antiguo solo tenía el campo correo.
 * No borra citas, solo completa datos faltantes.
 */
function migrarCompatibilidadCitas(lista) {
  let cambio = false

  const normalizada = lista.map((cita) => {
    if (cita.correoDueno) {
      return cita
    }

    if (cita.correo) {
      cambio = true
      return { ...cita, correoDueno: cita.correo }
    }

    return cita
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

function generarId() {
  return `c${Date.now()}`
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
    (c) => (c.correoDueno || '').toLowerCase() === texto,
  )
}

/**
 * Crea una solicitud de cita en estado Pendiente.
 */
export function crearCita(datos) {
  const nueva = {
    id: generarId(),
    fecha: datos.fecha,
    hora: datos.hora,
    pacienteId: datos.pacienteId || '',
    nombreMascota: datos.nombreMascota,
    especie: datos.especie,
    codigoServicio: datos.codigoServicio,
    servicio: datos.nombreServicio,
    correoDueno: datos.correo,
    nombreDueno: datos.nombreDueno,
    telefono: datos.telefono || '',
    observaciones: datos.observaciones || '',
    fueraHorario: Boolean(datos.fueraHorario),
    precioEstimado: Number(datos.precioEstimado) || 0,
    estado: 'Pendiente',
    tipo: 'warning',
    propuestaFecha: '',
    propuestaHora: '',
  }

  const lista = [...obtenerTodasCitas(), nueva]
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

  const tipoPorEstado = {
    Confirmada: 'ok',
    Pendiente: 'warning',
    'En espera': 'info',
    Rechazada: 'danger',
    'Propuesta de horario': 'info',
  }

  const actualizada = {
    ...lista[indice],
    ...extras,
    estado,
    tipo: tipoPorEstado[estado] || lista[indice].tipo,
  }

  const copia = [...lista]
  copia[indice] = actualizada
  guardarLista(CLAVES.citas, copia)
  return { ok: true, cita: actualizada }
}

/** Recepción propone otra fecha u hora. */
export function proponerHorarioCita(id, propuestaFecha, propuestaHora) {
  return actualizarEstadoCita(id, 'Propuesta de horario', {
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
