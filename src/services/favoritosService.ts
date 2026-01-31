import api from './api';
import { Musica } from '../types/musica';

export const favoritosService = {
  async listar(): Promise<Musica[]> {
    const { data } = await api.get('/Favoritos');
    return data;
  },

  async adicionar(musicaId: string): Promise<void> {
    await api.post(`/Favoritos/${musicaId}`);
  },

  async remover(musicaId: string): Promise<void> {
    await api.delete(`/Favoritos/${musicaId}`);
  },
};
