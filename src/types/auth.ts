export interface Usuario {
  id: string;
  nome: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

// Helper para decodificar JWT e extrair informações
export function decodificarToken(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}
