import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { MusicaDetalhada } from '../types/musica';
import { CifraViewer } from '../components/cifra/CifraViewer';
import { Loading } from '../components/comum/Loading';
import './ModoPalcoPage.css';

export function ModoPalcoPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [musica, setMusica] = useState<MusicaDetalhada | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarMusica();
  }, [id]);

  const carregarMusica = async () => {
    if (!id) return;
    
    const tom = searchParams.get('tom');
    
    try {
      const data = await musicasService.buscarPorId(id, tom || undefined);
      setMusica(data);
    } catch (error) {
      console.error('Erro ao carregar música:', error);
    } finally {
      setCarregando(false);
    }
  };

  const sair = () => {
    navigate(`/musica/${id}`);
  };

  if (carregando) return <Loading />;
  if (!musica) return <div>Música não encontrada</div>;

  return (
    <div className="modo-palco">
      {/* Header fixo com botão de voltar */}
      <header className="modo-palco-header-fixed">
        <button 
          onClick={sair} 
          className="btn-voltar-fixo"
          aria-label="Voltar"
        >
          ← Voltar
        </button>
        
        <div className="musica-info-header">
          <h1>{musica.titulo}</h1>
          <p>{musica.artista} • Tom: {musica.tomOriginal}</p>
        </div>
      </header>

      {/* Body com cifra */}
      <div className="cifra-palco">
        <CifraViewer linhas={musica.linhas} modoPalco={true} />
      </div>
    </div>
  );
}
