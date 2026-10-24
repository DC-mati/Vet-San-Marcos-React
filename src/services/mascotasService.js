import { CLAVES, guardarLista, leerLista } from '../utils/storage'
import { generarIdUnico } from '../utils/idUnico'

function asegurarMascotas() {
  return leerLista(CLAVES.mascotas, [])
}

/** Mascotas activas de un dueño identificado por correo. */
export function obtenerMascotasPorTutor(correoTutor) {
  const correo = (correoTutor || '').trim().toLowerCase()
  return asegurarMascotas().filter(
    (m) =>
      m.activo !== false
      && (m.tutorCorreo || '').toLowerCase() === correo,
  )
}

export function obtenerMascotaPorId(id) {
  return asegurarMascotas().find((m) => m.id === id) || null
}

export function contarMascotasActivas() {
  return asegurarMascotas().filter((m) => m.activo !== false).length
}

/** Registra una mascota ligada al tutor autenticado. */
export function crearMascota(datos) {
  const nombre = (datos.nombre || '').trim()
  const tutorCorreo = (datos.tutorCorreo || '').trim().toLowerCase()

  if (!nombre || !tutorCorreo) {
    return { ok: false, error: 'Indica nombre y tutor de la mascota.' }
  }

  const nueva = {
    id: generarIdUnico('m'),
    tutorCorreo,
    nombre,
    especie: (datos.especie || 'Perro').trim(),
    raza: (datos.raza || '').trim(),
    sexo: (datos.sexo || '').trim(),
    edad: (datos.edad || '').trim(),
    peso: (datos.peso || '').trim(),
    activo: true,
  }

  const lista = [...asegurarMascotas(), nueva]
  guardarLista(CLAVES.mascotas, lista)
  return { ok: true, mascota: nueva }
}

export function actualizarMascota(id, datos, correoTutor) {
  const lista = asegurarMascotas()
  const indice = lista.findIndex((m) => m.id === id)

  if (indice === -1) {
    return { ok: false, error: 'Mascota no encontrada.' }
  }

  if ((lista[indice].tutorCorreo || '').toLowerCase() !== correoTutor.toLowerCase()) {
    return { ok: false, error: 'No puedes editar mascotas de otro dueño.' }
  }

  const actualizada = {
    ...lista[indice],
    nombre: (datos.nombre || lista[indice].nombre).trim(),
    especie: (datos.especie || lista[indice].especie).trim(),
    raza: (datos.raza || '').trim(),
    sexo: (datos.sexo || '').trim(),
    edad: (datos.edad || '').trim(),
    peso: (datos.peso || '').trim(),
  }

  const copia = [...lista]
  copia[indice] = actualizada
  guardarLista(CLAVES.mascotas, copia)
  return { ok: true, mascota: actualizada }
}

/** Desactiva sin borrar el historial asociado por id. */
export function desactivarMascota(id, correoTutor) {
  const lista = asegurarMascotas()
  const indice = lista.findIndex((m) => m.id === id)

  if (indice === -1) {
    return { ok: false, error: 'Mascota no encontrada.' }
  }

  if ((lista[indice].tutorCorreo || '').toLowerCase() !== correoTutor.toLowerCase()) {
    return { ok: false, error: 'No puedes desactivar mascotas de otro dueño.' }
  }

  const copia = [...lista]
  copia[indice] = { ...copia[indice], activo: false }
  guardarLista(CLAVES.mascotas, copia)
  return { ok: true }
}
