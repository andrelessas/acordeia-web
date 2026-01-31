import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { Usuario, decodificarToken } from '../types/auth';

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  registrar: (nome: string, email: string, senha: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarSessao = () => {
      const token = localStorage.getItem('token');
      const usuarioSalvo = localStorage.getItem('usuario');
      
      if (token && usuarioSalvo) {
        try {
          // Usa o usuário salvo localmente
          setUsuario(JSON.parse(usuarioSalvo));
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          setUsuario(null);
        }
      }
      
      setLoading(false);
    };
    
    verificarSessao();
  }, []);

  const login = async (email: string, senha: string) => {
    const { token, usuario } = await authService.login(email, senha);
    
    // Extrair isAdmin do token se não vier no usuario
    let usuarioCompleto = usuario;
    if (usuario.isAdmin === undefined) {
      const tokenPayload = decodificarToken(token);
      usuarioCompleto = {
        ...usuario,
        isAdmin: tokenPayload?.isAdmin || tokenPayload?.role === 'Admin' || false
      };
    }
    
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuarioCompleto));
    setUsuario(usuarioCompleto);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  const registrar = async (nome: string, email: string, senha: string) => {
    const { token, usuario } = await authService.registrar(nome, email, senha);
    
    // Extrair isAdmin do token se não vier no usuario
    let usuarioCompleto = usuario;
    if (usuario.isAdmin === undefined) {
      const tokenPayload = decodificarToken(token);
      usuarioCompleto = {
        ...usuario,
        isAdmin: tokenPayload?.isAdmin || tokenPayload?.role === 'Admin' || false
      };
    }
    
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuarioCompleto));
    setUsuario(usuarioCompleto);
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, login, logout, registrar }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
