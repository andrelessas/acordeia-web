import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { repertoriosService } from '../services/repertoriosService';
import { musicasService } from '../services/musicasService';
import { RepertorioComMusicas } from '../types/repertorio';
import { Musica } from '../types/musica';
import { Loading } from '../components/comum/Loading';
import { ErrorMessage } from '../components/comum/ErrorMessage';
import { Modal } from '../components/comum/Modal';
import '../pages/CriarRepertorioPage.css';

export function EditarRepertorioPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [repertorio, setRepertorio] = useState<RepertorioComMusicas | null>(null);
  const [nome, setNome] = useState('');
  const [publicado, setPublicado] = useState(false);
  const [musicasSelecionadas, setMusicasSelecionadas] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  
  // Modal de seleção de músicas
  const [modalAberto, setModalAberto] = useState(false);
  const [todasMusicas, setTodasMusicas] = useState<Musica[]>([]);
  const [carregandoMusicas, setCarregandoMusicas] = useState(false);

  useEffect(() => {
    carregarRepertorio();
  }, [id]);

  useEffect(() => {
    if (modalAberto) {
      carregarMusicas();
    }
  }, [modalAberto]);

  const carregarRepertorio = async () => {
    if (!id) return;
    
    setCarregando(true);
    try {
      const data = await repertoriosService.obterRepertorio(id);
      setRepertorio(data);
      setNome(data.nome);
      setPublicado(data.publicado);
      setMusicasSelecionadas(data.musicas.map(m => m.id));
    } catch (error: any) {
      const mensagem = error.response?.data?.mensagem || 'Erro ao carregar repertório';
      setErro(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  const carregarMusicas = async () => {
    setCarregandoMusicas(true);
    try {
      const data = await musicasService.listar();
      setTodasMusicas(data);
    } catch (error) {
      console.error('Erro ao carregar músicas:', error);
    } finally {
      setCarregandoMusicas(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setErro('');

    if (musicasSelecionadas.length === 0) {
      setErro('Selecione pelo menos uma música');
      return;
    }

    setSalvando(true);
    try {
      await repertoriosService.atualizarRepertorio(id, {
        nome,
        musicasIds: musicasSelecionadas,
        publicado,
      });
      navigate('/repertorios');
    } catch (error: any) {
      const mensagem = error.response?.data?.mensagem || 'Erro ao atualizar repertório';
      setErro(mensagem);
    } finally {
      setSalvando(false);
    }
  };

  const toggleMusica = (musicaId: string) => {
    setMusicasSelecionadas(prev =>
      prev.includes(musicaId)
        ? prev.filter(id => id !== musicaId)
        : [...prev, musicaId]
    );
  };

  const removerMusica = (musicaId: string) => {
    setMusicasSelecionadas(prev => prev.filter(id => id !== musicaId));
  };

  const musicasNoRepertorio = todasMusicas
    .filter(m => musicasSelecionadas.includes(m.id))
    .sort((a, b) => {
      const indexA = musicasSelecionadas.indexOf(a.id);
      const indexB = musicasSelecionadas.indexOf(b.id);
      return indexA - indexB;
    });

  if (carregando) return <Loading />;
  if (!repertorio) return <div>Repertório não encontrado</div>;

  return (
    <div className="criar-repertorio-container">
      <header className="page-header">
        <button onClick={() => navigate('/repertorios')} className="btn-back">
          ← Voltar
        </button>
        <h1>Editar Repertório</h1>
      </header>

      {erro && <ErrorMessage mensagem={erro} onDismiss={() => setErro('')} />}

      <form onSubmit={handleSubmit} className="repertorio-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do Repertório *</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setErro('');
            }}
            placeholder="Ex: Show Acústico, Louvores..."
            required
          />
        </div>

        <div className="form-group-checkbox">
          <input
            id="publicado"
            type="checkbox"
            checked={publicado}
            onChange={(e) => setPublicado(e.target.checked)}
          />
          <label htmlFor="publicado">
            Publicar repertório
            <span className="label-description">
              Outros usuários poderão visualizar e editar
            </span>
          </label>
        </div>

        <div className="musicas-section">
          <div className="musicas-header">
            <h3>Músicas ({musicasSelecionadas.length})</h3>
            <button
              type="button"
              onClick={() => setModalAberto(true)}
              className="btn btn-secondary"
            >
              + Adicionar Músicas
            </button>
          </div>

          {musicasNoRepertorio.length === 0 ? (
            <div className="empty-musicas">
              <p>Nenhuma música adicionada ainda</p>
            </div>
          ) : (
            <div className="musicas-lista">
              {musicasNoRepertorio.map((musica, index) => (
                <div key={musica.id} className="musica-item">
                  <span className="musica-ordem">{index + 1}.</span>
                  <div className="musica-info">
                    <span className="musica-titulo">{musica.titulo}</span>
                    <span className="musica-artista">{musica.artista}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removerMusica(musica.id)}
                    className="btn-remove"
                    aria-label="Remover música"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/repertorios')}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={salvando || musicasSelecionadas.length === 0}
          >
            {salvando ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>

      {/* Modal de seleção de músicas */}
      {modalAberto && (
        <Modal
          onFechar={() => setModalAberto(false)}
          titulo="Selecionar Músicas"
        >
        {carregandoMusicas ? (
          <Loading />
        ) : (
          <div className="modal-musicas-lista">
            {todasMusicas.map((musica) => (
              <div
                key={musica.id}
                className={`modal-musica-item ${
                  musicasSelecionadas.includes(musica.id) ? 'selected' : ''
                }`}
                onClick={() => toggleMusica(musica.id)}
              >
                <input
                  type="checkbox"
                  checked={musicasSelecionadas.includes(musica.id)}
                  onChange={() => {}}
                />
                <div className="musica-info">
                  <span className="musica-titulo">{musica.titulo}</span>
                  <span className="musica-artista">{musica.artista}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        </Modal>
      )}
    </div>
  );
}
