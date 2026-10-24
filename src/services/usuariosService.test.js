import { beforeEach, describe, expect, it } from 'vitest'

import { CLAVE_DEMO } from '../data/usuariosDemo'
import { CLAVES } from '../utils/storage'
import {
  actualizarUsuarioAdmin,
  listarUsuariosParaAdmin,
  obtenerPerfilPorCorreo,
} from './usuariosService'
import { iniciarSesion, leerSesion } from './authService'

beforeEach(() => {
  localStorage.clear()
})

describe('usuariosService y auth', () => {
  it('desactiva cuenta demo desde administración', () => {
    actualizarUsuarioAdmin('camila@correo.cl', { activo: false })

    const perfil = obtenerPerfilPorCorreo('camila@correo.cl')
    expect(perfil?.activo).toBe(false)
  })

  it('rechaza login de cuenta inactiva', () => {
    actualizarUsuarioAdmin('camila@correo.cl', { activo: false })

    const resultado = iniciarSesion('camila@correo.cl', CLAVE_DEMO)
    expect(resultado.ok).toBe(false)
    expect(resultado.error).toMatch(/desactivada/i)
  })

  it('invalida sesión guardada si la cuenta queda inactiva', () => {
    iniciarSesion('camila@correo.cl', CLAVE_DEMO)
    expect(leerSesion()?.correo).toBe('camila@correo.cl')

    actualizarUsuarioAdmin('camila@correo.cl', { activo: false })
    expect(leerSesion()).toBeNull()
    expect(localStorage.getItem(CLAVES.sesion)).toBeNull()
  })

  it('lista usuarios con origen demo y registrados', () => {
    const lista = listarUsuariosParaAdmin()
    expect(lista.some((u) => u.correo === 'admin@sanmarcos.cl')).toBe(true)
  })
})
