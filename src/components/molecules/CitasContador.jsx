import { useState } from "react";
import Button from "react-bootstrap/Button";

//useState: guarda un dato que cambia (citas pendientes).
export function ContadorCitas({ inicial = 0 }) {
  const [citas, setCitas] = useState(inicial);

  return (
    <div className="d-flex align-items-center gap-3">
      <span>Citas pendientes: <strong>{citas}</strong></span>
      <Button
        variant="outline-secondary"
        size="sm"

        onClick={() => setCitas((actual) => actual + 1)}
      >
        +
      </Button>
      <Button
        variant="outline-secondary"
        size="sm"
        disabled={citas === 0}
        onClick={() => setCitas((actual) => actual - 1)}
      >
        −
      </Button>
    </div>
  );
}
