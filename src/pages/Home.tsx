import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { Musica } from '../types/musica';
import { CardMusica } from '../components/musica/CardMusica';
import { Loading } from '../components/comum/Loading';
import { useDebounce } from '../hooks/useDebounce';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export function Home() {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');
  const { usuario } = useAuth();
  
  const termoBuscaDebounced = useDebounce(termoBusca, 300);

  useEffect(() => {
    carregarMusicas();
  }, []);

  useEffect(() => {
    if (termoBuscaDebounced) {
      buscar(termoBuscaDebounced);
    } else {
      carregarMusicas();
    }
  }, [termoBuscaDebounced]);

  const carregarMusicas = async () => {
    setCarregando(true);
    try {
      const data = await musicasService.listar();
      setMusicas(data);
    } catch (error) {
      console.error('Erro ao carregar músicas:', error);
    } finally {
      setCarregando(false);
    }
  };

  const buscar = async (termo: string) => {
    setCarregando(true);
    try {
      const resultados = await musicasService.buscar(termo);
      setMusicas(resultados);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) return <Loading />;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Músicas</h1>
        {usuario && (
          <Link to="/cadastrar-musica" className="btn btn-primary">
            + Nova Música
          </Link>
        )}
      </header>

      <div className="search-container">
        <input
          type="search"
          placeholder="Buscar por título ou artista..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="search-input"
          aria-label="Buscar músicas"
        />
      </div>

      {musicas.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">🎵</span>
          <h2 className="empty-state-title">
            {termoBusca ? 'Nenhum resultado' : 'Nenhuma música ainda'}
          </h2>
          <p className="empty-state-description">
            {termoBusca 
              ? 'Tente buscar por outro termo'
              : usuario 
                ? 'Comece adicionando sua primeira cifra' 
                : 'Ainda não há músicas cadastradas'
            }
          </p>
          {!termoBusca && usuario && (
            <Link to="/cadastrar-musica" className="btn btn-primary">
              Cadastrar música
            </Link>
          )}
        </div>
      ) : (
        <div className="musicas-grid">
          {musicas.map((musica) => (
            <CardMusica key={musica.id} musica={musica} />
          ))}
        </div>
      )}
    </div>
  );
}
