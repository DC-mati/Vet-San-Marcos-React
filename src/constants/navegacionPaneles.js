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
  { to: '/admin/inventario', texto: 'Inventario' },
  { to: '/admin/usuarios', texto: 'Usuarios' },
  { to: '/admin/reportes', texto: 'Reportes' },
  { to: '/recepcion', texto: 'Recepción' },
]

export const enlacesRecepcion = [
  { to: '/recepcion', texto: 'Gestión de citas' },
  { to: '/recepcion/pacientes', texto: 'Pacientes' },
]

export const enlacesVeterinario = [
  { to: '/veterinario', texto: 'Agenda clínica' },
]

export const enlacesTecnico = [
  { to: '/tecnico', texto: 'Apoyo operativo' },
]
