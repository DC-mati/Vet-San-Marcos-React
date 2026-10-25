import { useMemo } from 'react'
import Table from 'react-bootstrap/Table'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import { enlacesAdmin } from '../constants/navegacionPaneles'
import { useCitas } from '../context/CitasContext'
import { useServicios } from '../context/ServiciosContext'
import { useInventario } from '../context/InventarioContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function AdminReportesPage() {
  useTituloPagina('Reportes')
  const { citas } = useCitas()
  const { servicios } = useServicios()
  const { productos } = useInventario()

  const porEstado = useMemo(() => {
    const conteo = {}
    citas.forEach((c) => {
      conteo[c.estado] = (conteo[c.estado] || 0) + 1
    })
    return Object.entries(conteo).sort((a, b) => b[1] - a[1])
  }, [citas])

  const serviciosPorCategoria = useMemo(() => {
    const conteo = {}
    servicios.forEach((s) => {
      conteo[s.categoria] = (conteo[s.categoria] || 0) + 1
    })
    return Object.entries(conteo).sort((a, b) => a[0].localeCompare(b[0]))
  }, [servicios])

  const inventarioPorCategoria = useMemo(() => {
    const conteo = {}
    productos.forEach((p) => {
      conteo[p.categoria] = (conteo[p.categoria] || 0) + 1
    })
    return Object.entries(conteo).sort((a, b) => a[0].localeCompare(b[0]))
  }, [productos])

  return (
    <PlantillaAdmin
      titulo="Reportes sencillos"
      descripcion="Resumen de citas, servicios e inventario según los datos actuales."
      enlaces={enlacesAdmin}
    >
      <h2 className="h5">Citas por estado</h2>
      <Table striped size="sm" className="mb-4">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {porEstado.map(([estado, cantidad]) => (
            <tr key={estado}>
              <td>{estado}</td>
              <td>{cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="h5">Servicios por categoría</h2>
      <Table striped size="sm" className="mb-4">
        <tbody>
          {serviciosPorCategoria.map(([cat, cantidad]) => (
            <tr key={cat}>
              <td>{cat}</td>
              <td>{cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="h5">Inventario por categoría</h2>
      <Table striped size="sm">
        <tbody>
          {inventarioPorCategoria.map(([cat, cantidad]) => (
            <tr key={cat}>
              <td>{cat}</td>
              <td>{cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </PlantillaAdmin>
  )
}
