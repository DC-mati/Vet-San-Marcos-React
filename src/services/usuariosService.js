import { cuentasDemo } from '../data/usuariosDemo'
import { leerLista } from '../utils/storage'

/**
 * Lista usuarios visibles para administración (sin contraseñas).
 */
export function listarUsuariosParaAdmin() {
  const demo = cuentasDemo.map(({ clave: _clave, ...resto }) => ({
    ...resto,
    origen: 'Cuenta demo',
  }))

  const registrados = leerLista('vet_usuarios_registrados', []).map(
    ({ clave: _clave, ...resto }) => ({
      ...resto,
      origen: 'Registro simulado',
    }),
  )

  return [...demo, ...registrados]
}

export function contarUsuariosVisibles() {
  return listarUsuariosParaAdmin().length
}
