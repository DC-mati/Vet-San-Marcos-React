import { useMemo } from 'react'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { useAuth } from '../context/AuthContext'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'
import { filtrarCitasPorCorreo } from '../utils/citasDueno'

export default function MisCitasPage() {
  useTituloPagina('Mis citas')
  const { usuario } = useAuth()
  const { citas } = useCitas()

  const misCitas = useMemo(
    () => filtrarCitasPorCorreo(citas, usuario?.correo),
    [citas, usuario?.correo],
  )

  return (
    <PlantillaAdmin titulo="Mis citas" enlaces={enlacesPanelDueno}>
      <p className="text-secondary">
        Aquí ves el estado de tus solicitudes. Si recepción confirma o propone
        otro horario, los cambios se reflejan al recargar la página.
      </p>

      {misCitas.length === 0 && (
        <Alert variant="info">
          Todavía no tienes solicitudes registradas con tu cuenta.
        </Alert>
      )}

      <TablaCitas citas={misCitas} modo="lectura" />
    </PlantillaAdmin>
  )
}
