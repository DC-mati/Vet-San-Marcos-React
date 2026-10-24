import { useMemo } from 'react'
import Table from 'react-bootstrap/Table'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { enlacesRecepcion } from '../constants/navegacionPaneles'
import { leerLista, CLAVES } from '../utils/storage'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function RecepcionPacientesPage() {
  useTituloPagina('Pacientes')
  const mascotas = useMemo(
    () => leerLista(CLAVES.mascotas, []).filter((m) => m.activo !== false),
    [],
  )

  return (
    <PlantillaAdmin
      titulo="Pacientes registrados"
      descripcion="Consulta básica de mascotas activas en la simulación."
      enlaces={enlacesRecepcion}
    >
      {!mascotas.length && (
        <p className="text-secondary">No hay mascotas registradas todavía.</p>
      )}

      {mascotas.length > 0 && (
        <div className="table-responsive">
          <Table striped hover>
            <thead>
              <tr>
                <th>Mascota</th>
                <th>Especie</th>
                <th>Dueño (correo)</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.map((m) => (
                <tr key={m.id}>
                  <td>{m.nombre}</td>
                  <td>{m.especie}</td>
                  <td>{m.tutorCorreo}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </PlantillaAdmin>
  )
}
