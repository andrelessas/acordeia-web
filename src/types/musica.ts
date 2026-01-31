export interface Musica {
  id: string;
  titulo: string;
  artista: string;
  tomOriginal: string;
  capotraste?: number;
  favorita?: boolean;
  criadaEm?: string;
}

export interface RespostaPaginada<T> {
  itens: T[];
  paginaAtual: number;
  tamanhoPagina: number;
  totalItens: number;
  totalPaginas: number;
}

export interface AcordeNaLinha {
  acorde: string;
  posicao: number;
}

export interface LinhaComAcordes {
  acordes: AcordeNaLinha[];
  letra: string;
}

export interface MusicaDetalhada extends Musica {
  linhas: LinhaComAcordes[];
  tomOriginal: string;
}

export interface CriarMusicaDTO {
  titulo: string;
  artista: string;
  tom: string;
  tomOriginal: string;
  linhas: LinhaComAcordes[];
  nomeArtista: string;
  capotraste: number;
  conteudoCifra: string;
}
