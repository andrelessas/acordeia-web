import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { MusicaDetalhada } from '../types/musica';
import { CifraViewer } from '../components/cifra/CifraViewer';
import { Loading } from '../components/comum/Loading';
import { useWakeLock } from '../hooks/useWakeLock';
import './ModoPalcoPage.css';

export function ModoPalcoPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cifraRef = useRef<HTMLDivElement>(null);
  
  const [musica, setMusica] = useState<MusicaDetalhada | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // Ativar Wake Lock para manter tela ativa
  useWakeLock(true);

  // Detectar de onde o usuário veio
  const voltarPara = (location.state as any)?.from || '/';

  useEffect(() => {
    carregarMusica();
  }, [id]);

  useEffect(() => {
    // Verificar se a cifra cabe na tela após carregar
    if (musica && cifraRef.current) {
      verificarNecessidadeScroll();
    }
  }, [musica]);

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

  const verificarNecessidadeScroll = () => {
    if (!cifraRef.current) return;

    // Obter altura total do conteúdo
    const contentHeight = cifraRef.current.scrollHeight;
    // Obter altura visível
    const viewportHeight = window.innerHeight;
    
    // Se o conteúdo cabe completamente na viewport, desabilitar scroll
    const needsScroll = contentHeight > viewportHeight;
    setScrollEnabled(needsScroll);
    
    console.log(`Modo Palco: ${needsScroll ? 'Scroll habilitado' : 'Tela fixa'}`);
  };

  const sair = () => {
    // Voltar para a página de origem (home ou favoritos)
    navigate(voltarPara);
  };

  if (carregando) return <Loading />;
  if (!musica) return <div>Música não encontrada</div>;

  return (
    <div className={`modo-palco ${!scrollEnabled ? 'no-scroll' : ''}`}>
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
      <div className="cifra-palco" ref={cifraRef}>
        <CifraViewer linhas={musica.linhas} modoPalco={true} />
      </div>

      {/* Indicador de scroll se necessário */}
      {scrollEnabled && (
        <div className="scroll-indicator">
          <span>↓</span>
        </div>
      )}
    </div>
  );
}
