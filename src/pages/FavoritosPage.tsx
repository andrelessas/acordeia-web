import { useState, useEffect } from 'react';
import { favoritosService } from '../services/favoritosService';
import { Musica } from '../types/musica';
import { CardMusica } from '../components/musica/CardMusica';
import { Loading } from '../components/comum/Loading';
import './FavoritosPage.css';

export function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string>('');

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    setCarregando(true);
    setErro('');
    try {
      const data = await favoritosService.listar();
      setFavoritos(data);
    } catch (error: any) {
      console.error('Erro ao carregar favoritos:', error);
      setErro(error.response?.data?.message || 'Erro ao carregar favoritos');
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) return <Loading />;

  return (
    <div className="favoritos-container">
      <div className="favoritos-header">
        <h1>Favoritos</h1>
      </div>

      {erro && (
        <div className="error-message">
          {erro}
          <button onClick={carregarFavoritos} className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
            Tentar novamente
          </button>
        </div>
      )}

      {favoritos.length === 0 && !erro && !carregando ? (
        <div className="empty-state">
          <span className="empty-state-icon">⭐</span>
          <h2 className="empty-state-title">Você ainda não tem músicas favoritas</h2>
          <p className="empty-state-description">
            Favorite suas músicas preferidas para acesso rápido
          </p>
        </div>
      ) : (
        <div className="musicas-grid">
          {favoritos.map((musica) => (
            <CardMusica key={musica.id} musica={musica} />
          ))}
        </div>
      )}
    </div>
  );
}
