import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import '../admin.css'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'
import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

/** Reserva pública sin login previo; la cuenta se crea al confirmar. */
export default function SolicitarCitaPublicPage() {
  useTituloPagina('Solicitar cita')
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { usuario } = useAuth()

  const codigo = params.get('codigo') || ''
  const destinoDueno = codigo
    ? `${rutasCitaDueno.formulario}?codigo=${encodeURIComponent(codigo)}`
    : rutasCitaDueno.formulario

  if (usuario?.rol === 'cliente') {
    return <Navigate to={destinoDueno} replace />
  }

  if (usuario && usuario.rol !== 'cliente') {
    return <Navigate to="/" replace />
  }

  return (
    <PlantillaPublica>
      <div className="container py-4 py-lg-5">
        <div className="mx-auto panel-formulario-cita">
          <h1 className="h3 mb-2">Solicitar cita</h1>
          <p className="text-secondary mb-4">
            Reserva en pocos pasos. Crearás tu cuenta al confirmar, sin salir de
            este formulario.
          </p>
          <FormularioSolicitudCita
            variant="publico"
            codigoInicial={codigo}
            onExito={(cita) =>
              navigate(rutasCitaDueno.exito, { state: { cita } })
            }
          />
        </div>
      </div>
    </PlantillaPublica>
  )
}
