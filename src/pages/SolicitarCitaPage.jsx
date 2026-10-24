import Container from 'react-bootstrap/Container'
import { useNavigate, useSearchParams } from 'react-router-dom'

import PlantillaPublica from '../components/templates/PlantillaPublica'
import FormularioSolicitudCita from '../components/organisms/FormularioSolicitudCita'
import { useAuth } from '../context/AuthContext'
import { useTituloPagina } from '../hooks/useTitulodePagina'

export default function SolicitarCitaPage() {
  useTituloPagina('Solicitar cita')
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { usuario } = useAuth()

  const codigo = params.get('codigo') || ''

  const continuar = (datos) => {
    navigate('/solicitar-cita/confirmacion', { state: { solicitud: datos } })
  }

  return (
    <PlantillaPublica>
      <Container fluid="xxl" className="px-3 px-lg-4 py-5 page-section">
        <div className="mx-auto" style={{ maxWidth: 720 }}>
        <h1 className="mb-4">Solicitud de cita veterinaria</h1>
        <FormularioSolicitudCita
          codigoInicial={codigo}
          valoresIniciales={{
            correo: usuario?.correo || '',
            nombreDueno: usuario?.nombre || '',
          }}
          onContinuar={continuar}
        />
        </div>
      </Container>
    </PlantillaPublica>
  )
}
