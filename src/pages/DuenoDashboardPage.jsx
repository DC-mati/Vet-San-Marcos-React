import { useEffect, useMemo } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import PlantillaAdmin from '../components/templates/PlantillaAdmin'
import TarjetaResumenDueno from '../components/molecules/TarjetaResumenDueno'
import SeccionProximasCitasDueno from '../components/organisms/SeccionProximasCitasDueno'
import { enlacesPanelDueno } from '../constants/enlacesDueno'
import { rutasCitaDueno } from '../constants/rutasDuenoCita'
import { useAuth } from '../context/AuthContext'
import { useCitas } from '../context/CitasContext'
import { useMascotas } from '../context/MascotasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'
import {
  filtrarCitasPorCorreo,
  listarProximasCitas,
  resumenCitasDueno,
} from '../utils/citasDueno'

export default function DuenoDashboardPage() {
  useTituloPagina('Mi panel')
  const { usuario } = useAuth()
  const { citas } = useCitas()
  const { mascotas, recargar } = useMascotas()

  useEffect(() => {
    if (usuario?.correo) {
      recargar(usuario.correo)
    }
  }, [usuario?.correo, recargar])

  const citasDelDueno = useMemo(
    () => filtrarCitasPorCorreo(citas, usuario?.correo),
    [citas, usuario?.correo],
  )

  const resumen = useMemo(
    () => resumenCitasDueno(citasDelDueno),
    [citasDelDueno],
  )

  const proximasCitas = useMemo(
    () => listarProximasCitas(citasDelDueno),
    [citasDelDueno],
  )

  const nombre = usuario?.nombre || 'dueño de mascota'

  return (
    <PlantillaAdmin enlaces={enlacesPanelDueno}>
      <header className="mb-4">
        <h1 className="h3 mb-1">Hola, {nombre}</h1>
        <p className="text-secondary mb-0">
          Bienvenido a tu espacio de Veterinaria San Marcos
        </p>
      </header>

      <Row className="g-3 mb-4">
        <Col sm={6} lg={3}>
          <TarjetaResumenDueno
            titulo="Mis mascotas"
            valor={mascotas.length}
            descripcion="Registradas en tu cuenta"
          />
        </Col>
        <Col sm={6} lg={3}>
          <TarjetaResumenDueno
            titulo="Próximas citas"
            valor={resumen.proximas}
            descripcion="Con fecha hoy o posterior"
          />
        </Col>
        <Col sm={6} lg={3}>
          <TarjetaResumenDueno
            titulo="Citas pendientes"
            valor={resumen.pendientes}
            descripcion="Esperando confirmación de recepción"
          />
        </Col>
        <Col sm={12} lg={3}>
          <TarjetaResumenDueno
            titulo="Citas confirmadas"
            valor={resumen.confirmadas}
            descripcion="Horario validado por la clínica"
          />
        </Col>
      </Row>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <Button as={Link} to={rutasCitaDueno.formulario} variant="primary">
          Solicitar una cita
        </Button>
        <Button as={Link} to="/dueno/mis-mascotas" variant="outline-primary">
          Mis mascotas
        </Button>
        <Button as={Link} to="/dueno/mis-citas" variant="outline-primary">
          Ver mis citas
        </Button>
        <Button as={Link} to="/dueno/catalogo" variant="outline-secondary">
          Consultar catálogo
        </Button>
      </div>

      <SeccionProximasCitasDueno proximasCitas={proximasCitas} />
    </PlantillaAdmin>
  )
}
