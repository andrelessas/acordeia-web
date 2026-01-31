import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import './CadastroMusicaPage.css';

const TONS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function CadastroMusicaPage() {
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [tom, setTom] = useState('C');
  const [tomOriginal, setTomOriginal] = useState('C');
  const [capotraste, setCapotraste] = useState(0);
  const [cifraTexto, setCifraTexto] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // Processar cifra texto para formato de linhas
      const linhasProcessadas = processarCifra(cifraTexto);
      
      const musica = await musicasService.criar({
        titulo,
        artista,
        tom,
        tomOriginal,
        linhas: linhasProcessadas,
        nomeArtista: artista,
        capotraste,
        conteudoCifra: cifraTexto,
      });
      navigate(`/musica/${musica.id}`);
    } catch (error: any) {
      setErro(error.response?.data?.message || error.message || 'Erro ao cadastrar música');
    } finally {
      setCarregando(false);
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
          letra: proximaLinha,
          acordes
        });
        
        i++; // Pular próxima linha pois já foi processada
      } else if (linhaAtual.trim()) {
        // Linha sem acordes
        resultado.push({
          letra: linhaAtual,
          acordes: []
        });
      }
    }
    
    return resultado;
  };

  return (
    <div className="cadastro-musica-container">
      <div className="cadastro-header">
        <h1>Nova Música</h1>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
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
              placeholder="0"
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
              Cole o texto da cifra com acordes em uma linha e letra na linha seguinte.
              Exemplo: G D (acordes) / Quando eu não sei pra onde ir (letra)
            </span>
          </label>
          <textarea
            id="cifraTexto"
            value={cifraTexto}
            onChange={(e) => setCifraTexto(e.target.value)}
            placeholder="Cole aqui o texto da cifra..."
            rows={20}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={carregando}
          >
            {carregando ? 'Salvando...' : 'Salvar Música'}
          </button>
        </div>
      </form>
    </div>
  );
}
