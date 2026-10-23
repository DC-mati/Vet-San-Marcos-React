import { Navigate, Route, Routes, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

function ModuloPendiente({ titulo }) {
  return (
    <main className="container py-5">
      <h1>{titulo}</h1>
      <p>Esta sección está pendiente de migración a React.</p>

      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />

      <Route
        path="/servicios"
        element={<ModuloPendiente titulo="Catálogo de servicios" />}
      />

      <Route
        path="/recepcion"
        element={<ModuloPendiente titulo="Panel de recepción" />}
      />

      <Route
        path="/veterinario"
        element={<ModuloPendiente titulo="Panel veterinario" />}
      />

      <Route
        path="/tecnico"
        element={<ModuloPendiente titulo="Panel técnico" />}
      />

      <Route
        path="/cliente"
        element={<ModuloPendiente titulo="Panel del cliente" />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}