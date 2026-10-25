import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo-san-marcos.png'
import EnlaceVolverInicio from '../atoms/EnlaceVolverInicio'
import FormularioLogin from './FormularioLogin'

function LoginCard() {
  return (
    <Card className="login-card mx-auto">
      <Card.Body>
        <EnlaceVolverInicio className="d-inline-block mb-3" />

        <div className="text-center mb-3">
          <Link to="/" className="d-inline-block">
            <img src={logo} alt="Logo veterinaria" width={150} height="auto" />
          </Link>
        </div>

        <Card.Title className="text-center mb-4 fs-4">
          Iniciar sesión
        </Card.Title>

        <FormularioLogin />
      </Card.Body>
    </Card>
  )
}

export default LoginCard
