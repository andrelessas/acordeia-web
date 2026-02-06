export interface Repertorio {
  id: string;
  nome: string;
  usuarioId: string;
  nomeUsuario: string;
  publicado: boolean;
  criadoEm: string;
  atualizadoEm: string;
  quantidadeMusicas: number;
}

export interface RepertorioComMusicas extends Omit<Repertorio, 'quantidadeMusicas'> {
  musicas: MusicaRepertorio[];
  quantidadeMusicas: number;
}

export interface MusicaRepertorio {
  id: string;
  titulo: string;
  artista: string;
  tomOriginal: string;
  tomTransposto: string;
  ordem: number;
}

export interface CriarRepertorioDto {
  nome: string;
  musicasIds: string[];
}

export interface AtualizarRepertorioDto {
  nome?: string;
  musicasIds?: string[];
  publicado?: boolean;
}

export interface AdicionarMusicaDto {
  musicaId: string;
}

export interface AtualizarTomMusicaDto {
  tom: string;
}
