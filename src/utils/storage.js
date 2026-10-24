/**
 * Lee y escribe listas en localStorage.
 * Cada clave guarda un arreglo en formato JSON.
 */

export function leerLista(clave, valorPorDefecto = []) {
  if (typeof localStorage === 'undefined') {
    return valorPorDefecto
  }

  const texto = localStorage.getItem(clave)
  if (!texto) {
    return valorPorDefecto
  }

  try {
    return JSON.parse(texto)
  } catch {
    return valorPorDefecto
  }
}

export function guardarLista(clave, lista) {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.setItem(clave, JSON.stringify(lista))
}

export const CLAVES = {
  servicios: 'vet_data_services',
  citas: 'vet_data_appointments',
  medicamentos: 'vet_data_stock',
  mascotas: 'vet_data_pets',
  usuarios: 'vet_data_users',
  usuariosAdmin: 'vet_usuarios_admin',
  sesion: 'vet_sesion',
}
