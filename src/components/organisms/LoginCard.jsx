import Card from 'react-bootstrap/Card';
import logo from '../../assets/logo-san-marcos.png';

import LoginForm from '../molecules/LoginForm';

function LoginCard() {
  return (
    <Card>
      <Card.Body>

        <div className="p-4">
          <img
            src={logo}
            alt="Logo veterinaria"
            width="150"
          />
        </div>

        <Card.Title className="text-center mb-4">
          Iniciar sesión
        </Card.Title>

        <LoginForm />

      </Card.Body>
    </Card>
  );
}

export default LoginCard;
