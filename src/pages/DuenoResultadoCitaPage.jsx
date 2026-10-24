import { Navigate, useLocation } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import ResultadoSolicitudCita from '../components/organisms/ResultadoSolicitudCita'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function DuenoResultadoCitaPage({ tipo = 'exito' }) {
  useTituloPagina(tipo === 'exito' ? 'Cita registrada' : 'Error al registrar')
  const location = useLocation()
  const { usuario } = useAuth()
  const cita = location.state?.cita

  if (!usuario || usuario.rol !== 'cliente') {
    return <Navigate to="/login" replace />
  }

  return (
    <PlantillaAdmin
      titulo={tipo === 'exito' ? 'Solicitud registrada' : 'No se pudo registrar'}
      enlaces={enlacesPanelDueno}
    >
      <ResultadoSolicitudCita
        tipo={tipo}
        cita={cita}
        rutaMisCitas="/dueno/mis-citas"
        rutaPanel="/dueno"
        rutaReintentar={rutasCitaDueno.formulario}
      />
    </PlantillaAdmin>
  )
}
