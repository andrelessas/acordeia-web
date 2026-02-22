import { useMemo } from 'react';
import { LinhaComAcordes } from '../../types/musica';
import './LinhaComAcordes.css';

interface Props {
  linha: LinhaComAcordes;
  exibirNumeroLinha?: boolean;
}

// Token: representa uma palavra (ou espaço) com seus acordes
interface Token {
  type: 'word' | 'space';
  text: string;
  acordes: Array<{ acorde: string; offset: number }>; // offset relativo ao token
}

export function LinhaComAcordesComponent({ linha, exibirNumeroLinha = false }: Props) {
  const { acordes, letra, numeroLinha } = linha;

  // Verificar se é uma linha completamente vazia (quebra de linha)
  const isLinhaVazia = acordes.length === 0 && (!letra || letra.trim() === '');

  // Verificar se é um solo (apenas acordes, sem letra)
  const isSolo = acordes.length > 0 && (!letra || letra.trim() === '');

  /**
   * ESTRATÉGIA: Tokenização por palavra
   * Divide a linha em tokens (palavras + espaços), associando acordes a cada token.
   * Isso garante que a quebra de linha aconteça ENTRE palavras, nunca dentro delas.
   */
  const tokens = useMemo((): Token[] => {
    if (!letra || isSolo) return [];

    const result: Token[] = [];
    
    // Regex para capturar palavras e espaços separadamente
    const regex = /(\S+)|(\s+)/g;
    let match;

    while ((match = regex.exec(letra)) !== null) {
      const text = match[0];
      const startPos = match.index;
      const endPos = startPos + text.length;
      
      // Determinar tipo do token
      const type = match[1] ? 'word' : 'space';
      
      // Encontrar acordes que pertencem a este token
      const tokenAcordes = acordes
        .filter(a => a.posicao >= startPos && a.posicao < endPos)
        .map(a => ({
          acorde: a.acorde,
          offset: a.posicao - startPos // posição relativa dentro do token
        }));

      result.push({ type, text, acordes: tokenAcordes });
    }

    return result;
  }, [acordes, letra, isSolo]);

  // Processar letra para destacar acordes entre colchetes, parênteses e texto em caixa alta
  const renderizarLetra = useMemo(() => {
    if (!letra) return '\u00A0';

    // Verificar se é uma linha de seção com acordes (ex: "INTRO: C#m B/D# A F#m")
    // Essas linhas NÃO devem quebrar - scroll horizontal se necessário
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

  // Detectar se é uma linha de seção (INTRO, REFRÃO, etc)
  const isLinhaSecao = useMemo(() => {
    if (!letra) return false;
    const linhaSecaoComAcordes = /^([A-ZÁÀÂÃÉÊÍÓÔÕÚÇÜ\s]+):\s*(.+)$/;
    const isSecaoComAcordes = linhaSecaoComAcordes.test(letra.trim());
    const isSecaoSimples = /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇÜ\s:]+$/.test(letra.trim()) && 
                           letra.trim() === letra.trim().toUpperCase();
    return isSecaoComAcordes || isSecaoSimples;
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
          <div className="linha-wrapper">&nbsp;</div>
        </div>
      </div>
    );
  }

  // Renderizar linha de seção (INTRO, REFRÃO) - NÃO quebra
  if (isLinhaSecao && acordes.length === 0) {
    return (
      <div className={`linha-cifra linha-secao ${exibirNumeroLinha ? 'com-numero' : ''}`}>
        {exibirNumeroLinha && (
          <div className="numero-linha" aria-label={`Linha ${numeroLinha}`}>
            {numeroLinha}
          </div>
        )}
        <div className="linha-conteudo">
          <div className="linha-secao-wrapper">
            {renderizarLetra}
          </div>
        </div>
      </div>
    );
  }

  // Renderizar linha sem acordes (apenas letra comum)
  if (acordes.length === 0 && letra) {
    return (
      <div className={`linha-cifra ${exibirNumeroLinha ? 'com-numero' : ''}`}>
        {exibirNumeroLinha && (
          <div className="numero-linha" aria-label={`Linha ${numeroLinha}`}>
            {numeroLinha}
          </div>
        )}
        <div className="linha-conteudo">
          <div className="linha-letra-sem-acorde">
            {renderizarLetra}
          </div>
        </div>
      </div>
    );
  }

  // Renderizar solo (apenas acordes, sem letra)
  if (isSolo) {
    return (
      <div className={`linha-cifra linha-solo ${exibirNumeroLinha ? 'com-numero' : ''}`}>
        {exibirNumeroLinha && (
          <div className="numero-linha" aria-label={`Linha ${numeroLinha}`}>
            {numeroLinha}
          </div>
        )}
        <div className="linha-conteudo">
          <div className="linha-solo-wrapper">
            {acordes.map((a, i) => (
              <span key={i} className="acorde-solo">
                {a.acorde}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /**
   * RENDERIZAÇÃO PRINCIPAL: Linha com acordes + letra
   * Usa tokens para garantir quebra sincronizada entre acordes e letras
   */
  return (
    <div className={`linha-cifra ${exibirNumeroLinha ? 'com-numero' : ''}`}>
      {exibirNumeroLinha && (
        <div className="numero-linha" aria-label={`Linha ${numeroLinha}`}>
          {numeroLinha}
        </div>
      )}
      <div className="linha-conteudo">
        {/* Container flex que permite wrap entre tokens (palavras) */}
        <div className="linha-tokens-wrapper">
          {/* Renderizar cada token (palavra ou espaço) */}
          {tokens.map((token, index) => {
            if (token.type === 'space') {
              // Token de espaço: renderizar com estrutura de duas linhas (acordes + letra)
              // para garantir que acordes posicionados sobre espaços apareçam
              return (
                <span key={index} className="token-space">
                  {/* Linha de acordes (em cima) */}
                  <span className="token-acordes">
                    {token.acordes.length > 0 ? (
                      // Renderizar acordes sobre espaços
                      (() => {
                        const maxLength = Math.max(
                          token.text.length,
                          ...token.acordes.map(a => a.offset + a.acorde.length)
                        );
                        const chars = Array(maxLength).fill('\u00A0');
                        token.acordes.forEach(({ acorde, offset }) => {
                          acorde.split('').forEach((char, i) => {
                            chars[offset + i] = char;
                          });
                        });
                        return chars.join('');
                      })()
                    ) : (
                      '\u00A0'.repeat(token.text.length)
                    )}
                  </span>
                  {/* Linha de letra (embaixo) */}
                  <span className="token-letra">
                    {(() => {
                      if (token.acordes.length > 0) {
                        const maxLength = Math.max(
                          token.text.length,
                          ...token.acordes.map(a => a.offset + a.acorde.length)
                        );
                        return token.text.replace(/ /g, '\u00A0').padEnd(maxLength, '\u00A0');
                      }
                      return token.text.replace(/ /g, '\u00A0');
                    })()}
                  </span>
                </span>
              );
            }

            // Token palavra: renderizar acordes em cima e palavra embaixo
            return (
              <span key={index} className="token-word">
                {/* Linha de acordes (em cima) */}
                <span className="token-acordes">
                  {token.acordes.length > 0 ? (
                    // Criar string de acordes com posicionamento
                    // Calcular largura máxima: maior valor entre comprimento da palavra
                    // e o final do último acorde (offset + comprimento)
                    (() => {
                      const maxLength = Math.max(
                        token.text.length,
                        ...token.acordes.map(a => a.offset + a.acorde.length)
                      );
                      const chars = Array(maxLength).fill('\u00A0');
                      token.acordes.forEach(({ acorde, offset }) => {
                        acorde.split('').forEach((char, i) => {
                          chars[offset + i] = char;
                        });
                      });
                      return chars.join('');
                    })()
                  ) : (
                    '\u00A0' // Espaço vazio se não há acorde
                  )}
                </span>
                
                {/* Linha de letra (embaixo) */}
                {/* Deve ter mesma largura que acordes para manter alinhamento monoespaçado */}
                <span className="token-letra">
                  {(() => {
                    if (token.acordes.length > 0) {
                      const maxLength = Math.max(
                        token.text.length,
                        ...token.acordes.map(a => a.offset + a.acorde.length)
                      );
                      return token.text.padEnd(maxLength, '\u00A0');
                    }
                    return token.text;
                  })()}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
