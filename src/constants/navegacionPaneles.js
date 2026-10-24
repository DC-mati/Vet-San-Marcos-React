/** Etiquetas legibles para cada rol interno. */
export const etiquetaRol = {
  admin: 'Administrador',
  recepcion: 'Recepcionista',
  cliente: 'Dueño de mascota',
  veterinario: 'Veterinario',
  tecnico: 'Técnico veterinario',
}

export const enlacesAdmin = [
  { to: '/admin', texto: 'Dashboard' },
  { to: '/admin/servicios', texto: 'Servicios' },
  { to: '/admin/citas', texto: 'Citas' },
  { to: '/admin/usuarios', texto: 'Usuarios' },
  { to: '/recepcion', texto: 'Recepción' },
]

export const enlacesRecepcion = [
  { to: '/recepcion', texto: 'Gestión de citas' },
]

export const enlacesVeterinario = [
  { to: '/veterinario', texto: 'Agenda clínica' },
]

export const enlacesTecnico = [
  { to: '/tecnico', texto: 'Apoyo operativo' },
]
