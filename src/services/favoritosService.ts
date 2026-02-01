import api from './api';
import { Musica, RespostaPaginada } from '../types/musica';

export const favoritosService = {
  async listar(): Promise<Musica[]> {
    const { data } = await api.get('/Favoritos');
    
    // Verificar se a resposta é paginada ou uma lista direta
    if (Array.isArray(data)) {
      return data;
    }
    
    // Se for objeto paginado, retornar os itens
    if (data && typeof data === 'object' && 'itens' in data) {
      return (data as RespostaPaginada<Musica>).itens;
    }
    
    // Fallback: retornar array vazio
    return [];
  },

  async adicionar(musicaId: string): Promise<void> {
    await api.post(`/Favoritos/${musicaId}`);
  },

  async remover(musicaId: string): Promise<void> {
    await api.delete(`/Favoritos/${musicaId}`);
  },
};
