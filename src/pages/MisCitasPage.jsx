import { useMemo, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import TablaCitas from '../components/organisms/TablaCitas'
import { useCitas } from '../context/CitasContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function MisCitasPage() {
  useTituloPagina('Mis citas')
  const { citas } = useCitas()
  const [correo, setCorreo] = useState('')

  const misCitas = useMemo(() => {
    const texto = correo.trim().toLowerCase()
    if (!texto) {
      return []
    }
    return citas.filter(
      (c) => (c.correoDueno || '').toLowerCase() === texto,
    )
  }, [citas, correo])

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <h1 className="mb-3">Mis citas</h1>
        <p className="text-secondary">
          Ingresa el mismo correo que usaste al solicitar la cita para ver el
          estado actualizado (simulación sin backend).
        </p>

        <Form.Group className="mb-4" style={{ maxWidth: 420 }}>
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="camila@correo.cl"
          />
        </Form.Group>

        {correo && misCitas.length === 0 && (
          <Alert variant="info">
            No hay solicitudes para ese correo todavía.
          </Alert>
        )}

        <TablaCitas citas={misCitas} modo="lectura" />
      </Container>
    </PlantillaPublica>
  )
}
