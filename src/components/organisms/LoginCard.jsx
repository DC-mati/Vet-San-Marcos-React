import Card from 'react-bootstrap/Card'
import logo from '../../assets/logo-san-marcos.png'
import FormularioLogin from './FormularioLogin'

function LoginCard() {
  return (
    <Card className="login-card mx-auto">
      <Card.Body>
        <div className="text-center mb-3">
          <img src={logo} alt="Logo veterinaria" width={150} height="auto" />
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
