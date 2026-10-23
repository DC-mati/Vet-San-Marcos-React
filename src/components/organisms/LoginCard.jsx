
import React from 'react';
import Card from 'react-bootstrap/Card';
import logo from '../../assets/logo-san-marcos.png';
import FormularioLogin from './FormularioLogin';

function LoginCard() {
  return (
    <Card className="shadow-sm mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <div className="p-4 text-center">
          <img
            src={logo}
            alt="Logo veterinaria"
            width="150"
          />
        </div>

        <Card.Title className="text-center mb-4 fs-3">
          Iniciar sesión
        </Card.Title>

        <FormularioLogin />
      </Card.Body>
    </Card>
  );
}

export default LoginCard;
