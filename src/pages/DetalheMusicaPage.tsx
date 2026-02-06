import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { favoritosService } from '../services/favoritosService';
import { MusicaDetalhada } from '../types/musica';
import { CifraViewer } from '../components/cifra/CifraViewer';
import { ModalTransposicao } from '../components/cifra/ModalTransposicao';
import { Loading } from '../components/comum/Loading';
import { useAuth } from '../context/AuthContext';
import { useWakeLock } from '../hooks/useWakeLock';
import './DetalheMusicaPage.css';

export function DetalheMusicaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useAuth();
  
  const [musica, setMusica] = useState<MusicaDetalhada | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [favorita, setFavorita] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  // Ativar Wake Lock para manter tela ativa
  useWakeLock(true);

  // Detectar de onde o usuário veio
  const voltarPara = (location.state as any)?.from || '/';

  useEffect(() => {
    carregarMusica();
  }, [id]);

  const carregarMusica = async (tomSelecionado?: string) => {
    if (!id) return;
    
    setCarregando(true);
    try {
      const data = await musicasService.buscarPorId(id, tomSelecionado);
      setMusica(data);
      setFavorita(data.favorita || false);
    } catch (error) {
      console.error('Erro ao carregar música:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleSelecionarTom = (tom: string) => {
    setModalAberto(false);
    carregarMusica(tom);
  };

  const toggleFavorito = async () => {
    if (!id) return;
    
    const estadoAnterior = favorita;
    
    try {
      // Optimistic update
      setFavorita(!favorita);
      
      if (estadoAnterior) {
        await favoritosService.remover(id);
      } else {
        await favoritosService.adicionar(id);
      }
    } catch (error) {
      console.error('Erro ao favoritar:', error);
      // Reverter em caso de erro
      setFavorita(estadoAnterior);
      alert('Erro ao atualizar favorito. Tente novamente.');
    }
  };

  const handleExcluir = async () => {
    if (!id || !musica) return;
    
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir a música "${musica.titulo}"?\nEsta ação não pode ser desfeita.`
    );
    
    if (!confirmacao) return;
    
    setExcluindo(true);
    try {
      await musicasService.excluir(id);
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error('Erro ao excluir música:', error);
      alert(error.response?.data?.message || 'Erro ao excluir música');
    } finally {
      setExcluindo(false);
    }
  };

  if (carregando) return <Loading />;
  if (!musica) return <div>Música não encontrada</div>;

  return (
    <div className="detalhe-musica-container">
      <div className="detalhe-header">
        <button onClick={() => navigate(voltarPara)} className="btn-back">
          ← Voltar
        </button>
        
        <div className="musica-info">
          <h1>{musica.titulo}</h1>
          <p className="artista">{musica.artista}</p>
        </div>

        <div className="musica-actions">
          <button 
            onClick={() => setModalAberto(true)} 
            className="btn-tom"
          >
            Tom: <strong>{musica.tomOriginal}</strong>
          </button>

          <button 
            onClick={toggleFavorito}
            className={`btn-favorito ${favorita ? 'active' : ''}`}
            aria-label={favorita ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {favorita ? '★' : '☆'}
          </button>

          {/* Botões apenas para usuários autenticados */}
          {usuario && (
            <>
              <Link 
                to={`/editar-musica/${id}`}
                className="btn btn-secondary"
                title="Editar cifra"
              >
                ✏️ Editar
              </Link>

              <Link 
                to={`/modo-palco/${id}`}
                state={{ from: voltarPara }}
                className="btn btn-secondary"
              >
                Modo Palco
              </Link>

              {/* Botão de excluir - apenas para administradores */}
              {usuario.isAdmin && (
                <button 
                  onClick={handleExcluir}
                  disabled={excluindo}
                  className="btn btn-danger"
                  title="Excluir música"
                >
                  {excluindo ? 'Excluindo...' : '🗑️ Excluir'}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <CifraViewer 
        linhas={musica.linhas} 
        exibirNumeroLinha={usuario?.isAdmin || false}
      />

      {modalAberto && (
        <ModalTransposicao
          tomAtual={musica.tomOriginal}
          tomOriginal={musica.tomOriginal}
          onSelecionar={handleSelecionarTom}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
