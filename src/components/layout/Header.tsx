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
          {usuario && (
            <>
              <Link to="/favoritos">Favoritos</Link>
              <Link to="/repertorios">Repertórios</Link>
            </>
          )}
        </nav>

        <div className="header-user">
          {usuario ? (
            <>
              <span>{usuario.nome}</span>
              <button onClick={logout} className="btn-logout">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
