import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { enlacesAdmin } from '../constants/navegacionPaneles'
import { listarUsuariosParaAdmin } from '../services/usuariosService'
import { etiquetaRol } from '../constants/navegacionPaneles'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function AdminUsuariosPage() {
  useTituloPagina('Usuarios')
  const usuarios = listarUsuariosParaAdmin()

  return (
    <PlantillaAdmin
      titulo="Usuarios de demostración"
      descripcion="Consulta de cuentas simuladas. Las contraseñas no se muestran."
      enlaces={enlacesAdmin}
    >
      <Alert variant="info" className="small">
        Simulación académica: no es un sistema seguro de gestión de usuarios.
      </Alert>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Origen</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.correo}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{etiquetaRol[u.rol] || u.rol}</td>
                <td>{u.origen}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </PlantillaAdmin>
  )
}
