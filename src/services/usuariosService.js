import { cuentasDemo } from '../data/usuariosDemo'
import { CLAVES, leerLista, guardarLista } from '../utils/storage'

function leerAdminExtra() {
  return leerLista(CLAVES.usuariosAdmin, [])
}

function guardarAdminExtra(lista) {
  guardarLista(CLAVES.usuariosAdmin, lista)
}

function combinarUsuarios() {
  const demo = cuentasDemo.map(({ clave: _c, ...resto }) => ({
    ...resto,
    origen: 'Cuenta demo',
    editable: false,
    activo: resto.activo !== false,
  }))

  const registrados = leerLista('vet_usuarios_registrados', []).map(
    ({ clave: _c, ...resto }) => ({
      ...resto,
      origen: 'Registro simulado',
      editable: true,
      activo: resto.activo !== false,
    }),
  )

  const extra = leerAdminExtra().map((u) => ({
    ...u,
    origen: 'Alta administrador',
    editable: true,
    activo: u.activo !== false,
  }))

  const mapa = new Map()
  ;[...demo, ...registrados, ...extra].forEach((u) => {
    mapa.set(u.correo.toLowerCase(), u)
  })

  return [...mapa.values()]
}

/** Lista usuarios visibles para administración sin contraseñas. */
export function listarUsuariosParaAdmin() {
  return combinarUsuarios()
}

export function contarUsuariosVisibles() {
  return combinarUsuarios().filter((u) => u.activo).length
}

export function crearUsuarioAdmin(datos) {
  const nombre = (datos.nombre || '').trim()
  const correo = (datos.correo || '').trim().toLowerCase()
  const rol = datos.rol || 'cliente'

  if (!nombre || !correo) {
    return { ok: false, error: 'Completa nombre y correo.' }
  }

  const existe = combinarUsuarios().some((u) => u.correo.toLowerCase() === correo)
  if (existe) {
    return { ok: false, error: 'Ese correo ya existe.' }
  }

  const nuevo = {
    nombre,
    correo,
    rol,
    clave: datos.claveInterna || 'demo123',
    activo: true,
  }

  const lista = [...leerAdminExtra(), nuevo]
  guardarAdminExtra(lista)

  const registrados = leerLista('vet_usuarios_registrados', [])
  guardarLista('vet_usuarios_registrados', [
    ...registrados,
    {
      nombre,
      correo,
      clave: nuevo.clave,
      rol,
      activo: true,
    },
  ])

  return { ok: true }
}

export function actualizarUsuarioAdmin(correo, datos) {
  const email = correo.toLowerCase()
  const registrados = leerLista('vet_usuarios_registrados', [])
  const extra = leerAdminExtra()

  let cambio = false

  const regActualizados = registrados.map((u) => {
    if (u.correo.toLowerCase() !== email) {
      return u
    }
    cambio = true
    return {
      ...u,
      nombre: (datos.nombre || u.nombre).trim(),
      rol: datos.rol || u.rol,
      activo: datos.activo ?? u.activo ?? true,
    }
  })

  const extraActualizados = extra.map((u) => {
    if (u.correo.toLowerCase() !== email) {
      return u
    }
    cambio = true
    return {
      ...u,
      nombre: (datos.nombre || u.nombre).trim(),
      rol: datos.rol || u.rol,
      activo: datos.activo ?? u.activo ?? true,
    }
  })

  if (!cambio) {
    return { ok: false, error: 'Solo puedes editar cuentas registradas o de alta admin.' }
  }

  guardarLista('vet_usuarios_registrados', regActualizados)
  guardarAdminExtra(extraActualizados)
  return { ok: true }
}
