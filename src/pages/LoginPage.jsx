import LoginCard from '../components/organisms/LoginCard'
import { useTituloPagina } from '../hooks/useTitulodePagina'
import '../Login.css'

export default function LoginPage() {
  useTituloPagina('Login')

  return (
    <div className="login-page">
      <div className="login-page__scrim" aria-hidden="true" />
      <div className="login-page__inner">
        <LoginCard />
      </div>
    </div>
  )
}
