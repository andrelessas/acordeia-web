import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { repertoriosService } from '../services/repertoriosService';
import { musicasService } from '../services/musicasService';
import { RepertorioComMusicas } from '../types/repertorio';
import { MusicaDetalhada } from '../types/musica';
import { CifraViewer } from '../components/cifra/CifraViewer';
import { ModalTransposicao } from '../components/cifra/ModalTransposicao';
import { Loading } from '../components/comum/Loading';
import { useWakeLock } from '../hooks/useWakeLock';
import './VisualizarRepertorioPage.css';

export function VisualizarRepertorioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [repertorio, setRepertorio] = useState<RepertorioComMusicas | null>(null);
  const [musicaAtual, setMusicaAtual] = useState<MusicaDetalhada | null>(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);

  // Ativar Wake Lock para manter tela ativa
  useWakeLock(true);

  useEffect(() => {
    carregarRepertorio();
  }, [id]);

  useEffect(() => {
    if (repertorio && repertorio.musicas.length > 0) {
      carregarMusica(indiceAtual);
    }
  }, [repertorio, indiceAtual]);

  const carregarRepertorio = async () => {
    if (!id) return;
    
    setCarregando(true);
    try {
      const data = await repertoriosService.obterRepertorio(id);
      setRepertorio(data);
    } catch (error) {
      console.error('Erro ao carregar repertório:', error);
    } finally {
      setCarregando(false);
    }
  };

  const carregarMusica = async (indice: number, tomSelecionado?: string) => {
    if (!repertorio || !repertorio.musicas[indice]) return;
    
    const musicaRepertorio = repertorio.musicas[indice];
    const musicaId = musicaRepertorio.id;
    
    try {
      // Se não foi passado um tom, usar o tom transposto salvo no repertório
      const tom = tomSelecionado || musicaRepertorio.tomTransposto;
      const data = await musicasService.buscarPorId(musicaId, tom);
      setMusicaAtual(data);
    } catch (error) {
      console.error('Erro ao carregar música:', error);
    }
  };

  const handleSelecionarTom = async (tom: string) => {
    if (!repertorio || !musicaAtual || !id) return;
    
    setModalAberto(false);
    
    // Atualizar tom transposto no estado local do repertório IMEDIATAMENTE
    const musicasAtualizadas = [...repertorio.musicas];
    musicasAtualizadas[indiceAtual] = {
      ...musicasAtualizadas[indiceAtual],
      tomTransposto: tom,
    };
    
    setRepertorio({
      ...repertorio,
      musicas: musicasAtualizadas,
    });
    
    // Recarregar música com novo tom
    carregarMusica(indiceAtual, tom);
    
    // Atualizar tom na API em background
    try {
      await repertoriosService.atualizarTomMusica(id, musicaAtual.id, tom);
    } catch (error) {
      console.error('Erro ao atualizar tom na API:', error);
    }
  };

  const proximaMusica = () => {
    if (!repertorio) return;
    if (indiceAtual < repertorio.musicas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    }
  };

  const musicaAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1);
    }
  };

  const handleFechar = () => {
    navigate('/repertorios');
  };

  if (carregando) return <Loading />;
  if (!repertorio) return <div>Repertório não encontrado</div>;
  if (!musicaAtual) return <Loading />;

  const temMusicaAnterior = indiceAtual > 0;
  const temProximaMusica = indiceAtual < repertorio.musicas.length - 1;

  return (
    <div className="visualizar-repertorio">
      {/* Header */}
      <header className="repertorio-header">
        <button onClick={handleFechar} className="btn-fechar">
          ← {repertorio.nome}
        </button>
        <button onClick={handleFechar} className="btn-fechar-icon">
          ✕
        </button>
      </header>

      {/* Contador de música */}
      <div className="musica-contador">
        Música {indiceAtual + 1} de {repertorio.musicas.length}
      </div>

      {/* Informações da música */}
      <div className="musica-info-box">
        <h1>{musicaAtual.titulo}</h1>
        <p>{musicaAtual.artista}</p>
        
        <button 
          onClick={() => setModalAberto(true)} 
          className="btn-tom-repertorio"
        >
          Tom: <strong>{repertorio.musicas[indiceAtual].tomTransposto}</strong>
        </button>
      </div>

      {/* Cifra */}
      <div className="cifra-container">
        <CifraViewer linhas={musicaAtual.linhas} />
      </div>

      {/* Navegação */}
      {repertorio.musicas.length > 1 && (
        <nav className="nav-musicas">
          <button
            onClick={musicaAnterior}
            disabled={!temMusicaAnterior}
            className="btn-nav"
          >
            ◀ Anterior
          </button>
          <button
            onClick={proximaMusica}
            disabled={!temProximaMusica}
            className="btn-nav"
          >
            Próxima ▶
          </button>
        </nav>
      )}

      {/* Modal de transposição */}
      {modalAberto && (
        <ModalTransposicao
          tomAtual={repertorio.musicas[indiceAtual].tomTransposto}
          tomOriginal={repertorio.musicas[indiceAtual].tomOriginal}
          onSelecionar={handleSelecionarTom}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
