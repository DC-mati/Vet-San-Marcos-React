import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function DuenoSolicitarCitaPage() {
  useTituloPagina('Solicitar cita')
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { usuario } = useAuth()

  const codigo = params.get('codigo') || ''

  if (!usuario || usuario.rol !== 'cliente') {
    return <Navigate to="/login" state={{ desde: rutasCitaDueno.formulario }} replace />
  }

  const continuar = (datos) => {
    navigate(rutasCitaDueno.confirmacion, { state: { solicitud: datos } })
  }

  return (
    <PlantillaAdmin
      titulo="Solicitud de cita veterinaria"
      descripcion="Completa el formulario. Los datos de tu cuenta ya están asociados."
      enlaces={enlacesPanelDueno}
    >
      <div className="mx-auto panel-formulario-cita">
        <FormularioSolicitudCita
          codigoInicial={codigo}
          valoresIniciales={{
            correo: usuario.correo,
            nombreDueno: usuario.nombre || '',
          }}
          bloquearDatosCuenta
          onContinuar={continuar}
        />
      </div>
    </PlantillaAdmin>
  )
}
