import { memo, useMemo } from 'react';
import { LinhaComAcordes } from '../../types/musica';
import './LinhaComAcordes.css';

interface Props {
  linha: LinhaComAcordes;
}

export const LinhaComAcordesComponent = memo(function LinhaComAcordesComponent({ linha }: Props) {
  const { acordes, letra } = linha;

  const linhaAcordesRenderizada = useMemo(() => {
    if (acordes.length === 0) return null;

    const chars = Array(Math.max(letra.length, 1)).fill('\u00A0');
    acordes.forEach(({ acorde, posicao }) => {
      acorde.split('').forEach((char, i) => {
        if (posicao + i < chars.length) {
          chars[posicao + i] = char;
        }
      });
    });

    return chars.join('');
  }, [acordes, letra.length]);

  return (
    <div className="linha-cifra">
      <div className="linha-acordes" aria-label="acordes">
        {linhaAcordesRenderizada || '\u00A0'}
      </div>
      <div className="linha-letra">
        {letra || '\u00A0'}
      </div>
    </div>
  );
});
