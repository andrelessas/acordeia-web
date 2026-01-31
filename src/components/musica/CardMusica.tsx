import { Link } from 'react-router-dom';
import { Musica } from '../../types/musica';
import './CardMusica.css';

interface Props {
  musica: Musica;
}

export function CardMusica({ musica }: Props) {
  return (
    <Link to={`/musica/${musica.id}`} className="card card-interactive card-musica">
      <div className="card-musica-header">
        <h3 className="card-musica-titulo truncate">{musica.titulo}</h3>
        {musica.favorita && (
          <span className="badge-favorito" aria-label="Favorita">★</span>
        )}
      </div>
      
      <p className="card-musica-artista truncate">{musica.artista}</p>
      
      <div className="card-musica-footer">
        <span className="badge-tom">Tom: {musica.tomOriginal}</span>
        {musica.capotraste !== undefined && musica.capotraste > 0 && (
          <span className="badge-capotraste">Capo: {musica.capotraste}</span>
        )}
      </div>
    </Link>
  );
}
