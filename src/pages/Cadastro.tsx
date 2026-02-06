import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ErrorMessage } from '../components/comum/ErrorMessage';
import './Login.css';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setCarregando(true);

    try {
      await registrar(nome, email, senha);
      navigate('/');
    } catch (error: any) {
      // Extrair mensagem de erro da API no formato { mensagem: "..." }
      const mensagem = error.response?.data?.mensagem || error.message || 'Erro ao criar conta';
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  const handleInputChange = () => {
    setErro(''); // Limpar erro ao digitar
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="logo">ACORDEIA</h1>
          <p className="tagline">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {erro && <ErrorMessage mensagem={erro} onDismiss={() => setErro('')} />}
          
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                handleInputChange();
              }}
              placeholder="Seu nome"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange();
              }}
              placeholder="seu@email.com"
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
                handleInputChange();
              }}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <input
              id="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => {
                setConfirmarSenha(e.target.value);
                handleInputChange();
              }}
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={carregando}
          >
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Já tem conta? <Link to="/login">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
