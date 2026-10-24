import { beforeEach, describe, expect, it } from 'vitest'

import { CLAVE_DEMO } from '../data/usuariosDemo'
import { CLAVES } from '../utils/storage'
import {
  cerrarSesion,
  iniciarSesion,
  leerSesion,
  rutaPorRol,
} from './authService'

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

describe('authService', () => {
  it('inicia sesión demo y persiste datos básicos', () => {
    const resultado = iniciarSesion('admin@sanmarcos.cl', CLAVE_DEMO)
    expect(resultado.ok).toBe(true)
    expect(resultado.usuario.rol).toBe('admin')

    const sesion = leerSesion()
    expect(sesion?.correo).toBe('admin@sanmarcos.cl')
  })

  it('cierra sesión y limpia almacenamiento', () => {
    iniciarSesion('tecnico@sanmarcos.cl', CLAVE_DEMO)
    cerrarSesion()

    expect(leerSesion()).toBeNull()
    expect(localStorage.getItem(CLAVES.sesion)).toBeNull()
  })

  it('devuelve ruta según rol', () => {
    expect(rutaPorRol('cliente')).toBe('/dueno')
    expect(rutaPorRol('recepcion')).toBe('/recepcion')
  })
})
