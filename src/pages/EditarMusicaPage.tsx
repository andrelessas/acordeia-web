import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { Loading } from '../components/comum/Loading';
import './CadastroMusicaPage.css';

const TONS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function EditarMusicaPage() {
  const { id } = useParams<{ id: string }>();
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [tom, setTom] = useState('C');
  const [tomOriginal, setTomOriginal] = useState('C');
  const [capotraste, setCapotraste] = useState(0);
  const [cifraTexto, setCifraTexto] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      
      // Inserir 4 espaços (tabulação)
      const newValue = cifraTexto.substring(0, start) + '    ' + cifraTexto.substring(end);
      setCifraTexto(newValue);
      
      // Reposicionar cursor após os espaços
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  useEffect(() => {
    carregarMusica();
  }, [id]);

  const carregarMusica = async () => {
    if (!id) return;
    
    setCarregando(true);
    try {
      const musica = await musicasService.buscarPorId(id);
      
      // Preencher formulário com dados existentes
      setTitulo(musica.titulo);
      setArtista(musica.artista);
      setTom(musica.tomOriginal);
      setTomOriginal(musica.tomOriginal);
      setCapotraste(musica.capotraste || 0);
      
      // Reconstruir texto da cifra a partir das linhas
      const textoReconstruido = reconstruirCifraTexto(musica.linhas);
      setCifraTexto(textoReconstruido);
    } catch (error: any) {
      setErro(error.response?.data?.message || 'Erro ao carregar música');
    } finally {
      setCarregando(false);
    }
  };

  const reconstruirCifraTexto = (linhas: any[]) => {
    return linhas.map(linha => {
      if (linha.acordes && linha.acordes.length > 0) {
        // Criar linha de acordes posicionados
        const linhaAcordes = Array(Math.max(linha.letra?.length || 0, 80)).fill(' ');
        linha.acordes.forEach((item: any) => {
          const acorde = item.acorde;
          const pos = item.posicao;
          for (let i = 0; i < acorde.length; i++) {
            if (pos + i < linhaAcordes.length) {
              linhaAcordes[pos + i] = acorde[i];
            }
          }
        });
        return linhaAcordes.join('').trimEnd() + '\n' + (linha.letra || '');
      }
      return linha.letra || '';
    }).join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    setErro('');
    setSalvando(true);

    try {
      // Processar cifra texto para formato de linhas
      const linhasProcessadas = processarCifra(cifraTexto);
      
      await musicasService.atualizar(id, {
        titulo,
        artista,
        tom,
        tomOriginal,
        linhas: linhasProcessadas,
        nomeArtista: artista,
        capotraste,
        conteudoCifra: cifraTexto,
      });
      
      navigate(`/musica/${id}`);
    } catch (error: any) {
      setErro(error.response?.data?.message || error.message || 'Erro ao atualizar música');
    } finally {
      setSalvando(false);
    }
  };

  const processarCifra = (texto: string) => {
    const linhas = texto.split('\n');
    const resultado = [];
    
    for (let i = 0; i < linhas.length; i++) {
      const linhaAtual = linhas[i];
      const proximaLinha = linhas[i + 1] || '';
      
      // Verifica se a linha atual parece conter acordes
      const contemAcordes = /^[A-G][#b]?[m]?[0-9]*(\s+[A-G][#b]?[m]?[0-9]*)*\s*$/.test(linhaAtual);
      
      if (contemAcordes) {
        // Extrair acordes e posições
        const acordes = [];
        const partes = linhaAtual.split(/\s+/);
        let posicao = 0;
        
        for (const parte of partes) {
          if (parte.trim()) {
            const indice = linhaAtual.indexOf(parte, posicao);
            acordes.push({
              acorde: parte.trim(),
              posicao: indice
            });
            posicao = indice + parte.length;
          }
        }
        
        // Adicionar linha com acordes e letra (próxima linha)
        resultado.push({
          numeroLinha: resultado.length + 1,
          letra: proximaLinha,
          acordes
        });
        
        i++; // Pular próxima linha pois já foi processada
      } else {
        // Linha sem acordes (pode ser vazia para quebra de linha)
        resultado.push({
          numeroLinha: resultado.length + 1,
          letra: linhaAtual,
          acordes: []
        });
      }
    }
    
    return resultado;
  };

  if (carregando) return <Loading />;

  return (
    <div className="cadastro-musica-container">
      <div className="cadastro-header">
        <h1>Editar Música</h1>
        <button onClick={() => navigate(`/musica/${id}`)} className="btn btn-secondary">
          Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-musica">
        {erro && <div className="error-message">{erro}</div>}

        <div className="form-row">
          <div className="form-group flex-2">
            <label htmlFor="titulo">Título *</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nome da música"
              required
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="tom">Tom Atual *</label>
            <select
              id="tom"
              value={tom}
              onChange={(e) => setTom(e.target.value)}
              required
            >
              {TONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="tomOriginal">Tom Original *</label>
            <select
              id="tomOriginal"
              value={tomOriginal}
              onChange={(e) => setTomOriginal(e.target.value)}
              required
            >
              {TONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group flex-1">
            <label htmlFor="capotraste">Capotraste</label>
            <input
              id="capotraste"
              type="number"
              min="0"
              max="12"
              value={capotraste}
              onChange={(e) => setCapotraste(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="artista">Artista *</label>
          <input
            id="artista"
            type="text"
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
            placeholder="Nome do artista"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cifraTexto">
            Cifra *
            <span className="label-help">
              Edite o texto da cifra. Os acordes serão processados automaticamente.
            </span>
          </label>
          <textarea
            id="cifraTexto"
            value={cifraTexto}
            onChange={(e) => setCifraTexto(e.target.value)}
            onKeyDown={handleTabKey}
            placeholder="Cole ou edite o texto da cifra..."
            rows={20}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}
