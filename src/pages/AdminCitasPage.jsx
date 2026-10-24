import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TablaCitas from '../components/organisms/TablaCitas'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

const enlaces = [
  { to: '/admin', texto: 'Dashboard' },
  { to: '/admin/servicios', texto: 'Servicios (CRUD)' },
  { to: '/admin/citas', texto: 'Citas' },
]

export default function AdminCitasPage() {
  useTituloPagina('Admin citas')
  const { citas, cambiarEstado, proponerHorario, eliminar } = useCitas()

  return (
    <PlantillaAdmin titulo="Gestión de citas" enlaces={enlaces}>
      <TablaCitas
        citas={citas}
        modo="admin"
        onConfirmar={(id) => cambiarEstado(id, 'Confirmada')}
        onProponer={(id, fecha, hora) => proponerHorario(id, fecha, hora)}
        onEliminar={eliminar}
      />
    </PlantillaAdmin>
  )
}
