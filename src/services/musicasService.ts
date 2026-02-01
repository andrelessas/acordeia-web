import api from './api';
import { Musica, MusicaDetalhada, CriarMusicaDTO, AtualizarMusicaDTO, RespostaPaginada } from '../types/musica';

export const musicasService = {
  async listar(): Promise<Musica[]> {
    const { data } = await api.get<RespostaPaginada<Musica>>('/Musicas');
    return data.itens;
  },

  async buscarPorId(id: string, tom?: string): Promise<MusicaDetalhada> {
    const params = tom ? { tom } : undefined;
    const { data } = await api.get(`/Musicas/${id}`, params ? { params } : {});
    return data;
  },

  async criar(musica: CriarMusicaDTO): Promise<Musica> {
    const { data } = await api.post('/Musicas', musica);
    return data;
  },

  async buscar(termo: string): Promise<Musica[]> {
    const { data } = await api.get<RespostaPaginada<Musica>>('/Musicas/buscar', { params: { q: termo } });
    return data.itens || [];
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`/Musicas/${id}`);
  },

  async atualizar(id: string, musica: AtualizarMusicaDTO): Promise<Musica> {
    const { data } = await api.put(`/Musicas/${id}`, musica);
    return data;
  },
};
