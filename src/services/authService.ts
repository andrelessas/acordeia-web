import api from './api';
import { LoginResponse } from '../types/auth';

export const authService = {
  async login(email: string, senha: string): Promise<LoginResponse> {
    const { data } = await api.post('/Autenticacao/login', { email, senha });
    return data;
  },

  async registrar(nome: string, email: string, senha: string): Promise<LoginResponse> {
    const { data } = await api.post('/Autenticacao/registrar', { nome, email, senha });
    return data;
  },
};
