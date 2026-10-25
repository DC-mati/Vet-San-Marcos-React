import { useMemo } from 'react'
import Table from 'react-bootstrap/Table'

import { leerLista, CLAVES } from '../../utils/storage'

/** Listado de mascotas activas para recepción y administración. */
export default function RecepcionPacientesContenido() {
  const mascotas = useMemo(
    () => leerLista(CLAVES.mascotas, []).filter((m) => m.activo !== false),
    [],
  )

  if (!mascotas.length) {
    return <p className="text-secondary">No hay mascotas registradas todavía.</p>
  }

  return (
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
  )
}
