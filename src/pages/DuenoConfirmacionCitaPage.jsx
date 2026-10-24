import { Navigate } from 'react-router-dom'

import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useTituloPagina } from '../hooks/useTitulodePagina'

/** Ruta legada: la confirmación está integrada en el formulario de dos etapas. */
export default function DuenoConfirmacionCitaPage() {
  useTituloPagina('Confirmar solicitud')
  return <Navigate to={rutasCitaDueno.formulario} replace />
}
