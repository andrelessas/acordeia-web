import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ErrorMessage } from '../components/comum/ErrorMessage';
import './Login.css';

export function Login() {
  const [emailOuNome, setEmailOuNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obter a rota de origem se houver
  const from = (location.state as any)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login(emailOuNome, senha);
      // Redirecionar para a rota original ou home
      navigate(from, { replace: true });
    } catch (error: any) {
      // Extrair mensagem de erro da API no formato { mensagem: "..." }
      const mensagem = error.response?.data?.mensagem || error.message || 'Erro ao fazer login';
      setErro(mensagem);
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
          {erro && <ErrorMessage mensagem={erro} onDismiss={() => setErro('')} />}
          
          <div className="form-group">
            <label htmlFor="emailOuNome">E-mail ou Nome</label>
            <input
              id="emailOuNome"
              type="text"
              value={emailOuNome}
              onChange={(e) => {
                setEmailOuNome(e.target.value);
                setErro(''); // Limpar erro ao digitar
              }}
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
              onChange={(e) => {
                setSenha(e.target.value);
                setErro(''); // Limpar erro ao digitar
              }}
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
