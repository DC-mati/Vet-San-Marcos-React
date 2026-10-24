import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useAuth } from '../context/AuthContext'
import { useMascotas } from '../context/MascotasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function DuenoSolicitarCitaPage() {
  useTituloPagina('Solicitar cita')
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { usuario } = useAuth()
  const { mascotas, recargar } = useMascotas()

  const codigo = params.get('codigo') || ''

  useEffect(() => {
    if (usuario?.correo) {
      recargar(usuario.correo)
    }
  }, [usuario?.correo, recargar])

  if (!usuario || usuario.rol !== 'cliente') {
    return <Navigate to="/login" state={{ desde: rutasCitaDueno.formulario }} replace />
  }

  const continuar = (datos) => {
    navigate(rutasCitaDueno.confirmacion, { state: { solicitud: datos } })
  }

  return (
    <PlantillaAdmin
      titulo="Solicitud de cita veterinaria"
      descripcion="Elige una mascota registrada o escribe una nueva. Tu cuenta ya está asociada."
      enlaces={enlacesPanelDueno}
    >
      <div className="mx-auto panel-formulario-cita">
        {!mascotas.length && (
          <p className="text-secondary">
            Tip: puedes{' '}
            <Link to="/dueno/mis-mascotas">registrar mascotas</Link> para
            agilizar futuras solicitudes.
          </p>
        )}
        <FormularioSolicitudCita
          codigoInicial={codigo}
          valoresIniciales={{
            correo: usuario.correo,
            nombreDueno: usuario.nombre || '',
          }}
          bloquearDatosCuenta
          mascotasRegistradas={mascotas}
          onContinuar={continuar}
        />
      </div>
    </PlantillaAdmin>
  )
}
