import { useMemo } from 'react';
import { LinhaComAcordes } from '../../types/musica';
import './LinhaComAcordes.css';

interface Props {
  linha: LinhaComAcordes;
  exibirNumeroLinha?: boolean;
}

export function LinhaComAcordesComponent({ linha, exibirNumeroLinha = false }: Props) {
  const { acordes, letra, numeroLinha } = linha;

  // Verificar se é uma linha completamente vazia (quebra de linha)
  const isLinhaVazia = acordes.length === 0 && (!letra || letra.trim() === '');

  // Verificar se é um solo (apenas acordes, sem letra)
  const isSolo = acordes.length > 0 && (!letra || letra.trim() === '');

  const linhaAcordesRenderizada = useMemo(() => {
    if (acordes.length === 0) return null;

    // Calcular o tamanho necessário: máximo entre o tamanho da letra e a última posição de acorde
    const ultimaPosicaoAcorde = acordes.length > 0 
      ? Math.max(...acordes.map(a => a.posicao + a.acorde.length))
      : 0;
    const tamanhoLinha = Math.max(letra?.length || 0, ultimaPosicaoAcorde, 1);

    const chars = Array(tamanhoLinha).fill('\u00A0');
    acordes.forEach(({ acorde, posicao }) => {
      acorde.split('').forEach((char, i) => {
        if (posicao + i < chars.length) {
          chars[posicao + i] = char;
        }
      });
    });

    return chars.join('');
  }, [acordes, letra]);

  // Processar letra para destacar acordes entre colchetes, parênteses e texto em caixa alta
  const renderizarLetra = useMemo(() => {
    if (!letra) return '\u00A0';

    // Verificar se é uma linha de seção com acordes (ex: "INTRO: C#m B/D# A F#m")
    const linhaSecaoComAcordes = /^([A-ZÁÀÂÃÉÊÍÓÔÕÚÇÜ\s]+):\s*(.+)$/;
    const matchSecao = letra.match(linhaSecaoComAcordes);
    
    if (matchSecao) {
      const [, secao, acordesTexto] = matchSecao;
      // Regex para identificar acordes: padrões como C, C#, Cm, C#m, C/G, etc.
      const regexAcordes = /([A-G][#b]?(?:m|maj|dim|aug|sus|add)?(?:\d+)?(?:\/[A-G][#b]?)?)/g;
      const partesAcordes: JSX.Element[] = [];
      let ultimoIndice = 0;
      let match;
      let key = 0;

      // Processar acordes
      while ((match = regexAcordes.exec(acordesTexto)) !== null) {
        // Adicionar espaços antes do acorde
        if (match.index > ultimoIndice) {
          partesAcordes.push(
            <span key={`space-${key++}`}>
              {acordesTexto.substring(ultimoIndice, match.index)}
            </span>
          );
        }

        // Adicionar acorde destacado
        partesAcordes.push(
          <span key={`acorde-${key++}`} className="acorde-inline">
            {match[1]}
          </span>
        );

        ultimoIndice = match.index + match[0].length;
      }

      // Adicionar texto restante após acordes
      if (ultimoIndice < acordesTexto.length) {
        partesAcordes.push(
          <span key={`rest-${key++}`}>
            {acordesTexto.substring(ultimoIndice)}
          </span>
        );
      }

      return (
        <>
          <span className="acorde-inline">{secao}:</span>
          {' '}
          {partesAcordes}
        </>
      );
    }

    // Verificar se a linha inteira é uma seção (ex: "REFRÃO", "SOLO")
    const isLinhaSecao = /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇÜ\s:]+$/.test(letra.trim());
    
    if (isLinhaSecao && letra.trim() === letra.trim().toUpperCase()) {
      return (
        <span className="acorde-inline">
          {letra}
        </span>
      );
    }

    const partes: JSX.Element[] = [];
    // Regex combinado para detectar APENAS:
    // 1. [acordes] - texto entre colchetes
    // 2. (notas/observações) - texto entre parênteses
    // 3. Palavras em caixa alta (2+ letras maiúsculas consecutivas)
    // Não detecta acordes soltos no meio do texto para evitar falsos positivos (E, A, etc.)
    const regex = /\[([^\]]+)\]|\(([^)]+)\)|([A-ZÁÀÂÃÉÊÍÓÔÕÚÇÜ]{2,}(?:\s+[A-ZÁÀÂÃÉÊÍÓÔÕÚÇÜ]{2,})*)/g;
    let ultimoIndice = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(letra)) !== null) {
      // Adicionar texto antes do acorde/nota
      if (match.index > ultimoIndice) {
        partes.push(
          <span key={`text-${key++}`}>
            {letra.substring(ultimoIndice, match.index)}
          </span>
        );
      }

      // Verificar se é [acorde], (nota) ou TEXTO EM CAIXA ALTA
      if (match[1]) {
        // Acorde entre colchetes (sem os colchetes)
        partes.push(
          <span key={`acorde-${key++}`} className="acorde-inline">
            {match[1]}
          </span>
        );
      } else if (match[2]) {
        // Texto entre parênteses (mantém os parênteses)
        partes.push(
          <span key={`parentese-${key++}`} className="acorde-inline">
            ({match[2]})
          </span>
        );
      } else if (match[3]) {
        // Texto em caixa alta (2+ letras)
        partes.push(
          <span key={`caixa-alta-${key++}`} className="acorde-inline">
            {match[3]}
          </span>
        );
      }

      ultimoIndice = match.index + match[0].length;
    }

    // Adicionar texto restante
    if (ultimoIndice < letra.length) {
      partes.push(
        <span key={`text-${key++}`}>
          {letra.substring(ultimoIndice)}
        </span>
      );
    }

    return partes.length > 0 ? partes : letra;
  }, [letra]);

  // Renderizar linha vazia (quebra de linha)
  if (isLinhaVazia) {
    return (
      <div className={`linha-cifra linha-vazia ${exibirNumeroLinha ? 'com-numero' : ''}`}>
        {exibirNumeroLinha && (
          <div className="numero-linha" aria-label={`Linha ${numeroLinha}`}>
            {numeroLinha}
          </div>
        )}
        <div className="linha-conteudo">
          <div className="linha-acordes">&nbsp;</div>
          <div className="linha-letra">&nbsp;</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`linha-cifra ${isSolo ? 'linha-solo' : ''} ${exibirNumeroLinha ? 'com-numero' : ''}`}>
      {exibirNumeroLinha && (
        <div className="numero-linha" aria-label={`Linha ${numeroLinha}`}>
          {numeroLinha}
        </div>
      )}
      <div className="linha-conteudo">
        <div className="linha-acordes" aria-label="acordes">
          {linhaAcordesRenderizada || '\u00A0'}
        </div>
        {!isSolo && (
          <div className="linha-letra">
            {renderizarLetra}
          </div>
        )}
      </div>
    </div>
  );
}
