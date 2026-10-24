import { useMemo } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TarjetaMetricaPanel from '../components/molecules/TarjetaMetricaPanel'
import TablaCitas from '../components/organisms/TablaCitas'
import { enlacesTecnico } from '../constants/navegacionPaneles'
import { useCitas } from '../context/CitasContext'
import { useInventario } from '../context/InventarioContext'
import { UMBRAL_STOCK_DEMO } from '../services/inventarioService'
import { useTituloPagina } from '../hooks/useTitulodePagina'
import { listarProximasCitas } from '../utils/citasDueno'

export default function TecnicoDashboardPage() {
  useTituloPagina('Panel técnico')
  const { citas } = useCitas()
  const { stockBajo } = useInventario()
  const alertasStock = stockBajo()

  const hoy = useMemo(() => new Date(), [])

  const proximas = useMemo(
    () => listarProximasCitas(citas, hoy, 10),
    [citas, hoy],
  )

  const confirmadas = useMemo(
    () => citas.filter((c) => c.estado === 'Confirmada').length,
    [citas],
  )

  return (
    <PlantillaAdmin
      titulo="Panel técnico"
      descripcion="Apoyo operativo con la agenda compartida de citas."
      enlaces={enlacesTecnico}
    >
      <Alert variant="secondary" className="small">
        Solo consulta: sin acceso a administración ni eliminación de citas.
      </Alert>

      <Row className="g-3 mb-4">
        <Col sm={6}>
          <TarjetaMetricaPanel
            titulo="Próximas atenciones"
            valor={proximas.length}
            descripcion="Citas futuras en el sistema"
          />
        </Col>
        <Col sm={6}>
          <TarjetaMetricaPanel
            titulo="Citas confirmadas"
            valor={confirmadas}
            descripcion="Referencia operativa del sistema"
          />
        </Col>
      </Row>

      {alertasStock.length > 0 && (
        <Alert variant="warning">
          {alertasStock.length} productos con stock bajo (umbral de alerta:{' '}
          {UMBRAL_STOCK_DEMO} unidades).
        </Alert>
      )}

      <h2 className="h5 mb-3">Agenda próxima</h2>
      <TablaCitas
        citas={proximas}
        modo="lectura"
        mensajeVacio="No hay citas próximas para preparar."
      />
    </PlantillaAdmin>
  )
}
