import { rutaPorRol } from '../services/authService'

/**
 * Comprueba si el rol puede usar la ruta guardada en login.
 * Evita que un admin termine en /dueno por un destino antiguo.
 */
export function resolverDestinoTrasLogin(desde, rol) {
  if (!desde) {
    return rutaPorRol(rol)
  }

  const esDueno = desde.startsWith('/dueno')
  const esAdmin = desde.startsWith('/admin')
  const esRecepcionAdmin = desde.startsWith('/admin/recepcion')
  const esRecepcion = desde.startsWith('/recepcion')
  const esVeterinario = desde.startsWith('/veterinario')
  const esTecnico = desde.startsWith('/tecnico')

  if (esDueno && rol !== 'cliente') {
    return rutaPorRol(rol)
  }
  if (esAdmin && rol !== 'admin') {
    return rutaPorRol(rol)
  }
  if (esRecepcionAdmin && rol !== 'admin') {
    return rutaPorRol(rol)
  }
  if (esRecepcion && rol !== 'recepcion') {
    return rutaPorRol(rol)
  }
  if (esVeterinario && rol !== 'veterinario') {
    return rutaPorRol(rol)
  }
  if (esTecnico && rol !== 'tecnico') {
    return rutaPorRol(rol)
  }

  return desde
}
