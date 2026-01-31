import { useState, useEffect } from 'react';
import { favoritosService } from '../services/favoritosService';
import { Musica } from '../types/musica';
import { CardMusica } from '../components/musica/CardMusica';
import { Loading } from '../components/comum/Loading';
import './FavoritosPage.css';

export function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      const data = await favoritosService.listar();
      setFavoritos(data);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
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

      {favoritos.length === 0 ? (
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
