import { cuentasDemo } from '../data/usuariosDemo'
import { CLAVES, leerLista, guardarLista } from '../utils/storage'
import { validarEmail } from '../utils/validaciones'

/**
 * Autenticación simulada: compara correo y clave con cuentas demo
 * o usuarios registrados en localStorage.
 */
export function iniciarSesion(correo, clave) {
  const email = (correo || '').trim().toLowerCase()
  const password = (clave || '').trim()

  if (!email || !password) {
    return { ok: false, error: 'Completa correo y contraseña.' }
  }

  if (!validarEmail(email)) {
    return { ok: false, error: 'Escribe un correo válido.' }
  }

  if (password.length < 6) {
    return {
      ok: false,
      error: 'La contraseña debe tener al menos 6 caracteres.',
    }
  }

  const registrados = leerLista('vet_usuarios_registrados', [])
  const cuenta =
    cuentasDemo.find(
      (u) => u.correo.toLowerCase() === email && u.clave === password,
    )
    || registrados.find(
      (u) => u.correo.toLowerCase() === email && u.clave === password,
    )

  if (!cuenta) {
    return {
      ok: false,
      error: 'Correo o contraseña incorrectos. Usa las cuentas demo.',
    }
  }

  const sesion = {
    correo: cuenta.correo,
    nombre: cuenta.nombre,
    rol: cuenta.rol,
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(CLAVES.sesion, JSON.stringify(sesion))
  }

  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('vetEmail', sesion.correo)
    sessionStorage.setItem('vetRole', sesion.rol)
  }

  return { ok: true, usuario: sesion }
}

/** Registro simulado: solo dueños de mascota. */
export function registrarUsuario(datos) {
  const nombre = (datos.nombre || '').trim()
  const correo = (datos.correo || '').trim().toLowerCase()
  const clave = (datos.clave || '').trim()

  if (!nombre || !correo || !clave) {
    return { ok: false, error: 'Completa todos los campos.' }
  }

  if (!validarEmail(correo)) {
    return { ok: false, error: 'Escribe un correo válido.' }
  }

  if (clave.length < 6) {
    return {
      ok: false,
      error: 'La contraseña debe tener al menos 6 caracteres.',
    }
  }

  const existe =
    cuentasDemo.some((u) => u.correo.toLowerCase() === correo)
    || leerLista('vet_usuarios_registrados', []).some(
      (u) => u.correo.toLowerCase() === correo,
    )

  if (existe) {
    return { ok: false, error: 'Ese correo ya está registrado.' }
  }

  const nuevo = {
    nombre,
    correo,
    clave,
    rol: 'cliente',
  }

  const lista = [...leerLista('vet_usuarios_registrados', []), nuevo]
  guardarLista('vet_usuarios_registrados', lista)
  return { ok: true, usuario: nuevo }
}

export function cerrarSesion() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(CLAVES.sesion)
  }

  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem('vetEmail')
    sessionStorage.removeItem('vetRole')
  }
}

export function leerSesion() {
  let sesion = null
  if (typeof localStorage !== 'undefined') {
    const texto = localStorage.getItem(CLAVES.sesion)
    if (texto) {
      try {
        sesion = JSON.parse(texto)
      } catch {
        sesion = null
      }
    }
  }

  if (sesion && sesion.correo) {
    return sesion
  }

  if (typeof sessionStorage !== 'undefined') {
    const correo = sessionStorage.getItem('vetEmail')
    const rol = sessionStorage.getItem('vetRole')
    if (correo && rol) {
      return { correo, rol, nombre: correo }
    }
  }

  return null
}

export function rutaPorRol(rol) {
  const mapa = {
    admin: '/admin',
    recepcion: '/recepcion',
    veterinario: '/veterinario',
    tecnico: '/tecnico',
    cliente: '/cliente',
  }

  return mapa[rol] || '/'
}
