import axios from 'axios';

// Obter URL da API de forma genérica
const getApiUrl = (): string => {
  // 1. Verificar configuração em runtime (pode ser modificada sem rebuild)
  const runtimeConfig = (window as any).APP_CONFIG?.API_URL;
  if (runtimeConfig) {
    return runtimeConfig;
  }
  
  // 2. Usar variável de ambiente do build
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 3. Fallback: desenvolvimento local
  return 'http://localhost:5000/api';
};

const baseURL = getApiUrl();

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
