import { beforeEach, describe, expect, it } from 'vitest'

import { CLAVE_DEMO } from '../data/usuariosDemo'
import {
  cerrarSesion,
  iniciarSesion,
  leerSesion,
  registrarUsuario,
  rutaPorRol,
} from './authService'
import { actualizarUsuarioAdmin } from './usuariosService'

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

describe('authService', () => {
  it('autentica cierra sesión registra dueños y bloquea inactivos', () => {
    // Arrange: credenciales demo y nuevo dueño
    const correoDueno = 'camila@correo.cl'
    const nuevoCorreo = 'nueva@correo.cl'

    // Act: flujos de autenticación simulada
    const admin = iniciarSesion('admin@sanmarcos.cl', CLAVE_DEMO)
    const claveIncorrecta = iniciarSesion('admin@sanmarcos.cl', 'mal')
    expect(claveIncorrecta.ok).toBe(false)
    cerrarSesion()
    const dueno = iniciarSesion(correoDueno, CLAVE_DEMO)
    actualizarUsuarioAdmin(correoDueno, { activo: false })
    const rechazo = iniciarSesion(correoDueno, CLAVE_DEMO)
    const registro = registrarUsuario({
      nombre: 'Nueva Dueña',
      correo: nuevoCorreo,
      clave: CLAVE_DEMO,
    })
    const loginNuevo = iniciarSesion(nuevoCorreo, CLAVE_DEMO)

    // Assert: sesión rutas y reglas de acceso
    expect(admin.ok).toBe(true)
    expect(admin.usuario.rol).toBe('admin')
    expect(dueno.ok).toBe(true)
    expect(rutaPorRol('veterinario')).toBe('/veterinario')
    expect(rechazo.ok).toBe(false)
    expect(rechazo.error).toMatch(/desactivada/i)
    expect(registro.ok).toBe(true)
    expect(loginNuevo.ok).toBe(true)
    expect(loginNuevo.usuario.rol).toBe('cliente')
    expect(leerSesion()?.correo).toBe(nuevoCorreo)
  })
})
