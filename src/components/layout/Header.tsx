import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export function Header() {
  const { usuario, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">ACORDEIA</Link>

        <nav className="nav">
          <Link to="/">Músicas</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>

        <div className="header-user">
          <span>{usuario?.nome}</span>
          <button onClick={logout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
