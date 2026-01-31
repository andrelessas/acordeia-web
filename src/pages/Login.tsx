import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export function Login() {
  const [emailOuNome, setEmailOuNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login(emailOuNome, senha);
      navigate('/');
    } catch (error: any) {
      setErro(error.message || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="logo">ACORDEIA</h1>
          <p className="tagline">Suas cifras, organizadas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {erro && <div className="error-message">{erro}</div>}
          
          <div className="form-group">
            <label htmlFor="emailOuNome">E-mail ou Nome</label>
            <input
              id="emailOuNome"
              type="text"
              value={emailOuNome}
              onChange={(e) => setEmailOuNome(e.target.value)}
              placeholder="seu@email.com ou seu nome"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Não tem conta? <Link to="/cadastro">Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
