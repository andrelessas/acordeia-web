import { LinhaComAcordes } from '../../types/musica';
import { LinhaComAcordesComponent } from './LinhaComAcordes';
import './CifraViewer.css';

interface CifraViewerProps {
  linhas: LinhaComAcordes[];
  modoPalco?: boolean;
  exibirNumeroLinha?: boolean;
}

export function CifraViewer({ linhas, modoPalco = false, exibirNumeroLinha = false }: CifraViewerProps) {
  return (
    <div className={`cifra-viewer ${modoPalco ? 'modo-palco' : ''}`}>
      {linhas.map((linha, index) => (
        <LinhaComAcordesComponent 
          key={index} 
          linha={linha}
          exibirNumeroLinha={exibirNumeroLinha}
        />
      ))}
    </div>
  );
}
