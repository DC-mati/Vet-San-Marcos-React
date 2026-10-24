import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import ResumenConfirmacionSolicitud from '../components/organisms/ResumenConfirmacionSolicitud'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useAuth } from '../context/AuthContext'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function DuenoConfirmacionCitaPage() {
  useTituloPagina('Confirmar solicitud')
  const location = useLocation()
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const { solicitar } = useCitas()
  const [enviando, setEnviando] = useState(false)

  const solicitud = location.state?.solicitud

  if (!usuario || usuario.rol !== 'cliente') {
    return (
      <Navigate
        to="/login"
        state={{ desde: rutasCitaDueno.confirmacion }}
        replace
      />
    )
  }

  if (!solicitud) {
    return <Navigate to={rutasCitaDueno.formulario} replace />
  }

  const confirmar = () => {
    if (enviando) {
      return
    }

    setEnviando(true)

    const payload = {
      ...solicitud,
      correo: usuario.correo,
      nombreDueno: usuario.nombre || solicitud.nombreDueno,
    }

    const resultado = solicitar(payload)

    if (resultado.ok) {
      navigate(rutasCitaDueno.exito, {
        state: { cita: resultado.cita },
      })
      return
    }

    setEnviando(false)
    navigate(rutasCitaDueno.error)
  }

  return (
    <PlantillaAdmin
      titulo="Resumen de la solicitud"
      enlaces={enlacesPanelDueno}
    >
      <ResumenConfirmacionSolicitud
        solicitud={solicitud}
        enviando={enviando}
        onConfirmar={confirmar}
        rutaEditar={rutasCitaDueno.formulario}
      />
    </PlantillaAdmin>
  )
}
