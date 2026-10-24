import { useMemo, useState } from 'react'
import Form from 'react-bootstrap/Form'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { useAuth } from '../context/AuthContext'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'
import {
  filtrarCitasPorCorreo,
  listarProximasCitas,
} from '../utils/citasDueno'

const OPCIONES_FILTRO = [
  { valor: 'todas', etiqueta: 'Todas mis citas' },
  { valor: 'proximas', etiqueta: 'Próximas' },
  { valor: 'Pendiente', etiqueta: 'Pendientes' },
  { valor: 'Confirmada', etiqueta: 'Confirmadas' },
  { valor: 'historial', etiqueta: 'Historial' },
]

export default function MisCitasPage() {
  useTituloPagina('Mis citas')
  const { usuario } = useAuth()
  const { citas } = useCitas()
  const [filtro, setFiltro] = useState('todas')

  const misCitas = useMemo(
    () => filtrarCitasPorCorreo(citas, usuario?.correo),
    [citas, usuario?.correo],
  )

  const citasFiltradas = useMemo(() => {
    if (filtro === 'proximas') {
      return listarProximasCitas(misCitas, new Date(), 50)
    }
    if (filtro === 'historial') {
      const proximasIds = new Set(
        listarProximasCitas(misCitas, new Date(), 50).map((c) => c.id),
      )
      return misCitas.filter((c) => !proximasIds.has(c.id))
    }
    if (filtro === 'todas') {
      return misCitas
    }
    return misCitas.filter((c) => c.estado === filtro)
  }, [misCitas, filtro])

  return (
    <PlantillaAdmin
      titulo="Mis citas"
      descripcion="Solo ves solicitudes asociadas a tu cuenta en sesión."
      enlaces={enlacesPanelDueno}
    >
      <Form.Group className="mb-3" style={{ maxWidth: 320 }}>
        <Form.Label>Organizar</Form.Label>
        <Form.Select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          {OPCIONES_FILTRO.map((op) => (
            <option key={op.valor} value={op.valor}>
              {op.etiqueta}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <TablaCitas
        citas={citasFiltradas}
        modo="lectura"
        mensajeVacio="Todavía no tienes solicitudes en esta vista."
      />
    </PlantillaAdmin>
  )
}
