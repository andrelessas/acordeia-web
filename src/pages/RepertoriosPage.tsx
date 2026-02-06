import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { repertoriosService } from '../services/repertoriosService';
import { Repertorio } from '../types/repertorio';
import { Loading } from '../components/comum/Loading';
import { ErrorMessage } from '../components/comum/ErrorMessage';
import './RepertoriosPage.css';

export function RepertoriosPage() {
  const [repertorios, setRepertorios] = useState<Repertorio[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarRepertorios();
  }, []);

  const carregarRepertorios = async () => {
    setCarregando(true);
    setErro('');
    try {
      console.log('🎼 Carregando repertórios...');
      const data = await repertoriosService.listarRepertorios();
      console.log('✅ Repertórios carregados:', data);
      setRepertorios(data);
    } catch (error: any) {
      console.error('❌ Erro ao carregar repertórios:', error);
      const mensagem = error.response?.data?.mensagem || error.message || 'Erro ao carregar repertórios';
      setErro(mensagem);
    } finally {
      console.log('✅ Finalizando carregamento');
      setCarregando(false);
    }
  };

  const handleExcluir = async (id: string, nome: string) => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir o repertório "${nome}"?\nEsta ação não pode ser desfeita.`
    );

    if (!confirmacao) return;

    try {
      await repertoriosService.excluirRepertorio(id);
      setRepertorios(repertorios.filter(r => r.id !== id));
    } catch (error: any) {
      const mensagem = error.response?.data?.mensagem || 'Erro ao excluir repertório';
      setErro(mensagem);
    }
  };

  if (carregando) return <Loading />;

  return (
    <div className="repertorios-container">
      <header className="repertorios-header">
        <h1>Meus Repertórios</h1>
        <Link to="/repertorios/novo" className="btn btn-primary">
          + Novo Repertório
        </Link>
      </header>

      {erro && <ErrorMessage mensagem={erro} onDismiss={() => setErro('')} />}

      {repertorios.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">🎼</span>
          <h2 className="empty-state-title">Nenhum repertório ainda</h2>
          <p className="empty-state-description">
            Crie seu primeiro repertório para organizar suas músicas
          </p>
          <Link to="/repertorios/novo" className="btn btn-primary">
            Criar repertório
          </Link>
        </div>
      ) : (
        <div className="repertorios-lista">
          {repertorios.map((repertorio) => (
            <div key={repertorio.id} className="repertorio-card">
              <Link to={`/repertorios/${repertorio.id}`} className="repertorio-link">
                <div className="repertorio-header">
                  <h3 className="repertorio-titulo">
                    {repertorio.publicado ? '🌐' : '🔒'} {repertorio.nome}
                  </h3>
                  {repertorio.publicado && (
                    <span className="badge badge-public">Público</span>
                  )}
                </div>
                <p className="repertorio-info">
                  {repertorio.quantidadeMusicas} {repertorio.quantidadeMusicas === 1 ? 'música' : 'músicas'}
                </p>
              </Link>
              
              <div className="repertorio-actions">
                <Link 
                  to={`/repertorios/${repertorio.id}/editar`}
                  className="btn btn-secondary btn-sm"
                >
                  ✏️ Editar
                </Link>
                <button 
                  onClick={() => handleExcluir(repertorio.id, repertorio.nome)}
                  className="btn btn-danger btn-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
