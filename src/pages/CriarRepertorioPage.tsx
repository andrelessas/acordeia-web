import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { repertoriosService } from '../services/repertoriosService';
import { musicasService } from '../services/musicasService';
import { Musica } from '../types/musica';
import { Loading } from '../components/comum/Loading';
import { ErrorMessage } from '../components/comum/ErrorMessage';
import { Modal } from '../components/comum/Modal';
import './CriarRepertorioPage.css';

export function CriarRepertorioPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [publicado, setPublicado] = useState(false);
  const [musicasSelecionadas, setMusicasSelecionadas] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  
  // Modal de seleção de músicas
  const [modalAberto, setModalAberto] = useState(false);
  const [todasMusicas, setTodasMusicas] = useState<Musica[]>([]);
  const [carregandoMusicas, setCarregandoMusicas] = useState(false);

  useEffect(() => {
    if (modalAberto) {
      carregarMusicas();
    }
  }, [modalAberto]);

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
    setErro('');

    if (musicasSelecionadas.length === 0) {
      setErro('Selecione pelo menos uma música');
      return;
    }

    setCarregando(true);
    try {
      await repertoriosService.criarRepertorio({
        nome,
        musicasIds: musicasSelecionadas,
      });
      navigate('/repertorios');
    } catch (error: any) {
      const mensagem = error.response?.data?.mensagem || 'Erro ao criar repertório';
      setErro(mensagem);
    } finally {
      setCarregando(false);
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

  const musicasNoRepertorio = todasMusicas.filter(m => 
    musicasSelecionadas.includes(m.id)
  );

  return (
    <div className="criar-repertorio-container">
      <header className="page-header">
        <button onClick={() => navigate('/repertorios')} className="btn-back">
          ← Voltar
        </button>
        <h1>Novo Repertório</h1>
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
            disabled={carregando || musicasSelecionadas.length === 0}
          >
            {carregando ? 'Criando...' : 'Criar Repertório'}
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
