import { rutasCitaDueno } from './rutasDuenoCita'

/** Navegación lateral del panel del dueño de mascota. */
export const enlacesPanelDueno = [
  { to: '/dueno', texto: 'Mi panel' },
  { to: rutasCitaDueno.formulario, texto: 'Solicitar cita' },
  { to: '/dueno/mis-citas', texto: 'Mis citas' },
  { to: '/servicios', texto: 'Catálogo' },
]
