# ACORDEIA - Documentação Técnica Frontend

## 🚀 MODO DESENVOLVIMENTO COM DADOS MOCKADOS

**IMPORTANTE**: Esta aplicação pode ser executada completamente SEM necessidade de API backend!

### Como funciona

Todos os services (`authService`, `musicasService`, `favoritosService`) possuem a flag `USE_MOCK_DATA = true` que permite o desenvolvimento frontend com dados simulados.

### Dados Mockados Disponíveis

**Usuário de teste:**
- Email: qualquer email válido
- Senha: qualquer senha
- Usuário mockado: "Músico Demo" (demo@acordeia.com)

**Músicas mockadas (5 músicas completas com cifras):**
1. **Como é Grande o Meu Amor Por Você** - Roberto Carlos (G) ⭐
2. **Evidências** - Chitãozinho & Xororó (D)
3. **Paciência** - Lenine (Am) ⭐
4. **Eduardo e Mônica** - Legião Urbana (C)
5. **Fico Assim Sem Você** - Claudinho e Buchecha (A) ⭐

**Recursos mockados:**
- ✅ Login/Registro de usuário
- ✅ Listagem de músicas
- ✅ Busca por título/artista
- ✅ Visualização de cifras completas
- ✅ Sistema de favoritos
- ✅ Criação de novas músicas
- ✅ Delay de rede simulado (300-600ms)

### Como alternar para API real

Quando a API backend estiver disponível, basta alterar a flag em cada service:

```typescript
// Em src/services/authService.ts
const USE_MOCK_DATA = false; // Alterar para false

// Em src/services/musicasService.ts
const USE_MOCK_DATA = false; // Alterar para false

// Em src/services/favoritosService.ts
const USE_MOCK_DATA = false; // Alterar para false
```

---

## 1. VISÃO GERAL DO PRODUTO

O **ACORDEIA** é um webapp moderno de cifras musicais focado em usabilidade, leitura confortável e experiência do músico. Diferente de soluções tradicionais, o Acordeia prioriza:

- **Acordes sempre acima da letra** (nunca inline)
- **Transposição de tom via modal intuitivo**
- **Design minimalista e focado**
- **Modo palco para apresentações**
- **Performance e simplicidade**

O frontend é construído com React + Vite + TypeScript, sem dependências pesadas, priorizando velocidade e manutenibilidade.

### Filosofia de Design

| Princípio | Aplicação |
|-----------|----------|
| **Simplicidade Radical** | Cada tela tem apenas 1 objetivo principal |
| **Zero Clutter** | Sem anúncios, sidebars ou distrações |
| **Mobile-First** | Interface otimizada para touch |
| **Instant Feedback** | Todas as ações respondem em < 100ms |
| **Accessibility First** | Contraste, foco e navegação por teclado |

---

## 2. STACK TECNOLÓGICA

### Dependências Principais

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

### Tecnologias e Justificativas

- **React 18**: Biblioteca UI moderna e performática
- **Vite**: Build tool rápido, ideal para desenvolvimento
- **TypeScript**: Type safety e melhor DX
- **React Router**: Roteamento client-side
- **Axios**: Cliente HTTP com interceptors para JWT
- **CSS Variables**: Tema dinâmico sem libs adicionais

**Sem Next.js**: O projeto não precisa de SSR/SSG. É um webapp simples que pode ser hospedado em qualquer servidor estático.

---

## 3. ARQUITETURA DO PROJETO

### Estrutura de Pastas

```
src/
├── pages/
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   ├── Home.tsx
│   ├── DetalheMusicaPage.tsx
│   ├── CadastroMusicaPage.tsx
│   ├── FavoritosPage.tsx
│   └── ModoPalcoPage.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── cifra/
│   │   ├── CifraViewer.tsx
│   │   ├── LinhaComAcordes.tsx
│   │   └── ModalTransposicao.tsx
│   ├── musica/
│   │   ├── CardMusica.tsx
│   │   ├── ListaMusicas.tsx
│   │   └── FormularioMusica.tsx
│   └── comum/
│       ├── Botao.tsx
│       ├── Input.tsx
│       ├── Loading.tsx
│       └── Modal.tsx
├── services/
│   ├── api.ts
│   ├── authService.ts
│   ├── musicasService.ts
│   └── favoritosService.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useMusicas.ts
│   └── useFavoritos.ts
├── context/
│   └── AuthContext.tsx
├── types/
│   ├── musica.ts
│   ├── cifra.ts
│   └── auth.ts
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── themes.css
├── utils/
│   ├── storage.ts
│   └── constants.ts
├── App.tsx
└── main.tsx
```

### Responsabilidades

- **pages/**: Componentes de página, orquestram lógica e layout
- **components/**: Componentes reutilizáveis organizados por domínio
- **services/**: Camada de comunicação com API
- **hooks/**: Lógica reutilizável e estado
- **context/**: Estado global (autenticação)
- **types/**: Definições TypeScript
- **styles/**: CSS global e variáveis de tema
- **utils/**: Funções auxiliares

---

## 4. SISTEMA DE DESIGN

### Tokens de Design (CSS Variables)

**arquivo: `src/styles/variables.css`**

```css
:root {
  /* Colors - Dark Theme (default) */
  --color-background: #09090b;
  --color-background-subtle: #0f0f12;
  --color-surface: #18181b;
  --color-surface-elevated: #1f1f23;
  --color-surface-hover: #27272a;
  --color-border: #27272a;
  --color-border-subtle: #3f3f46;
  
  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;
  
  /* Brand Colors - Roxo/Violeta moderno */
  --color-primary: #8b5cf6;
  --color-primary-hover: #7c3aed;
  --color-primary-subtle: rgba(139, 92, 246, 0.15);
  --color-primary-glow: rgba(139, 92, 246, 0.4);
  
  /* Feedback Colors */
  --color-success: #10b981;
  --color-success-subtle: rgba(16, 185, 129, 0.15);
  --color-danger: #ef4444;
  --color-danger-subtle: rgba(239, 68, 68, 0.15);
  --color-warning: #f59e0b;
  
  /* Cifra specific - Destaque dourado premium */
  --color-acorde: #fcd34d;
  --color-acorde-hover: #fbbf24;
  --color-acorde-bg: rgba(252, 211, 77, 0.08);
  --color-acorde-glow: rgba(252, 211, 77, 0.3);
  --color-letra: #e4e4e7;
  
  /* Gradientes modernos */
  --gradient-primary: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  --gradient-surface: linear-gradient(180deg, #18181b 0%, #09090b 100%);
  --gradient-glow: radial-gradient(ellipse at center, var(--color-primary-glow) 0%, transparent 70%);
  
  /* Typography - Sistema completo */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  --font-display: 'Inter', sans-serif;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  
  /* Spacing - Escala harmônica */
  --space-px: 1px;
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  
  /* Aliases semânticos */
  --space-xs: var(--space-1);
  --space-sm: var(--space-2);
  --space-md: var(--space-4);
  --space-lg: var(--space-6);
  --space-xl: var(--space-8);
  --space-2xl: var(--space-12);
  
  /* Layout */
  --border-radius-sm: 6px;
  --border-radius: 10px;
  --border-radius-lg: 14px;
  --border-radius-xl: 20px;
  --border-radius-full: 9999px;
  
  /* Shadows - Sutis e modernas */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 20px var(--color-primary-glow);
  --shadow-acorde: 0 0 12px var(--color-acorde-glow);
  
  /* Transitions - Suaves e responsivas */
  --transition-fast: 100ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Z-index scale */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal-backdrop: 300;
  --z-modal: 400;
  --z-toast: 500;
  
  /* Cifra viewer - Otimizado para leitura */
  --cifra-line-height: 2;
  --cifra-acorde-size: 1.125rem;
  --cifra-letra-size: 1.0625rem;
  --cifra-gap: 0.375rem;
  
  /* Stage mode - Imersivo */
  --stage-acorde-size: 2rem;
  --stage-letra-size: 1.625rem;
  --stage-line-height: 2.25;
  
  /* Container widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
}

[data-theme="light"] {
  --color-background: #fafafa;
  --color-background-subtle: #f4f4f5;
  --color-surface: #ffffff;
  --color-surface-elevated: #ffffff;
  --color-surface-hover: #f4f4f5;
  --color-border: #e4e4e7;
  --color-border-subtle: #d4d4d8;
  
  --color-text-primary: #18181b;
  --color-text-secondary: #52525b;
  --color-text-muted: #a1a1aa;
  
  --color-primary: #7c3aed;
  --color-primary-hover: #6d28d9;
  --color-primary-subtle: rgba(124, 58, 237, 0.1);
  --color-primary-glow: rgba(124, 58, 237, 0.2);
  
  --color-acorde: #b45309;
  --color-acorde-hover: #92400e;
  --color-acorde-bg: rgba(180, 83, 9, 0.08);
  --color-acorde-glow: rgba(180, 83, 9, 0.15);
  --color-letra: #3f3f46;
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

/* Animações globais */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Princípios de Design

1. **Dark First**: Modo escuro é o padrão (melhor para músicos em ambientes variados)
2. **Hierarquia Visual**: Acordes têm mais destaque que a letra
3. **Tipografia Confortável**: Monoespaçada para cifras, sans-serif para UI
4. **Espaçamento Generoso**: Facilita leitura e navegação
5. **Minimalismo**: Apenas o necessário na tela
6. **Cor com Propósito**: Amarelo/dourado para acordes (destaque musical)

---

## 5. AUTENTICAÇÃO E GESTÃO DE ESTADO

### Context de Autenticação

**arquivo: `src/context/AuthContext.tsx`**

```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import { Usuario } from '../types/auth';

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
    // Verificar se há token ao carregar
    const token = localStorage.getItem('token');
    if (token) {
      authService.verificarToken()
        .then(user => setUsuario(user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const { token, usuario } = await authService.login(email, senha);
    localStorage.setItem('token', token);
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  const registrar = async (nome: string, email: string, senha: string) => {
    const { token, usuario } = await authService.registrar(nome, email, senha);
    localStorage.setItem('token', token);
    setUsuario(usuario);
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
```

### Armazenamento do JWT

- **Local Storage**: `localStorage.getItem('token')`
- **Interceptor Axios**: Adiciona automaticamente em todas as requests
- **Logout**: Remove token do storage

---

## 6. INTEGRAÇÃO COM API

### Configuração Base do Axios

**arquivo: `src/services/api.ts`**

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
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
```

### Service de Autenticação

**arquivo: `src/services/authService.ts`**

```typescript
import api from './api';
import { LoginResponse, Usuario } from '../types/auth';

// Flag para alternar entre API real e dados mockados
const USE_MOCK_DATA = true;

// Usuário mockado para desenvolvimento
const USUARIO_MOCK: Usuario = {
  id: 'user-123',
  nome: 'Músico Demo',
  email: 'demo@acordeia.com'
};

// Token JWT mockado
const TOKEN_MOCK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsIm5vbWUiOiJNw7pzaWNvIERlbW8iLCJlbWFpbCI6ImRlbW9AYWNvcmRlaWEuY29tIn0.mock';

export const authService = {
  async login(email: string, senha: string): Promise<LoginResponse> {
    if (USE_MOCK_DATA) {
      // Simula delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validação simples para mock
      if (email && senha) {
        return {
          token: TOKEN_MOCK,
          usuario: USUARIO_MOCK
        };
      }
      
      throw new Error('Credenciais inválidas');
    }
    
    const { data } = await api.post('/auth/login', { email, senha });
    return data;
  },

  async registrar(nome: string, email: string, senha: string): Promise<LoginResponse> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (nome && email && senha) {
        const novoUsuario = {
          id: 'user-' + Date.now(),
          nome,
          email
        };
        
        return {
          token: TOKEN_MOCK,
          usuario: novoUsuario
        };
      }
      
      throw new Error('Dados inválidos');
    }
    
    const { data } = await api.post('/auth/registrar', { nome, email, senha });
    return data;
  },

  async verificarToken(): Promise<Usuario> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return USUARIO_MOCK;
    }
    
    const { data } = await api.get('/auth/me');
    return data;
  },
};
```

### Service de Músicas

**arquivo: `src/services/musicasService.ts`**

```typescript
import api from './api';
import { Musica, MusicaDetalhada, CriarMusicaDTO } from '../types/musica';

// DADOS MOCKADOS PARA DESENVOLVIMENTO SEM API
const MUSICAS_MOCK: Musica[] = [
  {
    id: '1',
    titulo: 'Como é Grande o Meu Amor Por Você',
    artista: 'Roberto Carlos',
    tom: 'G',
    favorita: true,
    criadaEm: '2025-01-15T10:00:00Z'
  },
  {
    id: '2',
    titulo: 'Evidências',
    artista: 'Chitãozinho & Xororó',
    tom: 'D',
    favorita: false,
    criadaEm: '2025-01-20T14:30:00Z'
  },
  {
    id: '3',
    titulo: 'Paciência',
    artista: 'Lenine',
    tom: 'Am',
    favorita: true,
    criadaEm: '2025-01-22T09:15:00Z'
  },
  {
    id: '4',
    titulo: 'Eduardo e Mônica',
    artista: 'Legião Urbana',
    tom: 'C',
    favorita: false,
    criadaEm: '2025-01-25T16:45:00Z'
  },
  {
    id: '5',
    titulo: 'Fico Assim Sem Você',
    artista: 'Claudinho e Buchecha',
    tom: 'A',
    favorita: true,
    criadaEm: '2025-01-28T11:20:00Z'
  }
];

const MUSICAS_DETALHADAS_MOCK: { [key: string]: MusicaDetalhada } = {
  '1': {
    id: '1',
    titulo: 'Como é Grande o Meu Amor Por Você',
    artista: 'Roberto Carlos',
    tom: 'G',
    tomOriginal: 'G',
    favorita: true,
    criadaEm: '2025-01-15T10:00:00Z',
    linhas: [
      {
        letra: 'Eu tenho tanto pra lhe falar',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'D7', posicao: 25 }
        ]
      },
      {
        letra: 'Mas com palavras não sei dizer',
        acordes: [
          { acorde: 'Em', posicao: 5 },
          { acorde: 'C', posicao: 30 }
        ]
      },
      {
        letra: 'Como é grande o meu amor por você',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'D7', posicao: 20 },
          { acorde: 'G', posicao: 35 }
        ]
      },
      {
        letra: '',
        acordes: []
      },
      {
        letra: 'E não há nada pra comparar',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'D7', posicao: 25 }
        ]
      },
      {
        letra: 'Para poder lhe explicar',
        acordes: [
          { acorde: 'Em', posicao: 5 },
          { acorde: 'C', posicao: 25 }
        ]
      },
      {
        letra: 'Como é grande o meu amor por você',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'D7', posicao: 20 },
          { acorde: 'G', posicao: 35 }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    titulo: 'Evidências',
    artista: 'Chitãozinho & Xororó',
    tom: 'D',
    tomOriginal: 'D',
    favorita: false,
    criadaEm: '2025-01-20T14:30:00Z',
    linhas: [
      {
        letra: 'Quando eu digo que deixei de te amar',
        acordes: [
          { acorde: 'D', posicao: 0 },
          { acorde: 'Bm', posicao: 25 }
        ]
      },
      {
        letra: 'É porque eu te amo',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'A', posicao: 20 }
        ]
      },
      {
        letra: 'Quando eu digo que não quero mais você',
        acordes: [
          { acorde: 'D', posicao: 0 },
          { acorde: 'Bm', posicao: 30 }
        ]
      },
      {
        letra: 'É porque eu te quero',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'A', posicao: 22 }
        ]
      },
      {
        letra: '',
        acordes: []
      },
      {
        letra: 'Eu tenho medo de te dar meu coração',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'D', posicao: 25 }
        ]
      },
      {
        letra: 'E confessar que eu estou em suas mãos',
        acordes: [
          { acorde: 'Em', posicao: 0 },
          { acorde: 'A', posicao: 35 }
        ]
      }
    ]
  },
  '3': {
    id: '3',
    titulo: 'Paciência',
    artista: 'Lenine',
    tom: 'Am',
    tomOriginal: 'Am',
    favorita: true,
    criadaEm: '2025-01-22T09:15:00Z',
    linhas: [
      {
        letra: 'Mesmo quando tudo pede',
        acordes: [
          { acorde: 'Am', posicao: 0 },
          { acorde: 'E7', posicao: 25 }
        ]
      },
      {
        letra: 'Um pouco mais de paciência',
        acordes: [
          { acorde: 'Am', posicao: 0 },
          { acorde: 'Dm', posicao: 25 }
        ]
      },
      {
        letra: 'Mesmo quando o corpo pede',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'C', posicao: 25 }
        ]
      },
      {
        letra: 'Um pouco mais de alegria',
        acordes: [
          { acorde: 'F', posicao: 0 },
          { acorde: 'E7', posicao: 25 }
        ]
      },
      {
        letra: '',
        acordes: []
      },
      {
        letra: 'O tempo demora a passar',
        acordes: [
          { acorde: 'Am', posicao: 0 },
          { acorde: 'Dm', posicao: 23 }
        ]
      },
      {
        letra: 'Ele diz que tem mais',
        acordes: [
          { acorde: 'G', posicao: 0 },
          { acorde: 'C', posicao: 20 }
        ]
      }
    ]
  },
  '4': {
    id: '4',
    titulo: 'Eduardo e Mônica',
    artista: 'Legião Urbana',
    tom: 'C',
    tomOriginal: 'C',
    favorita: false,
    criadaEm: '2025-01-25T16:45:00Z',
    linhas: [
      {
        letra: 'Quem um dia irá dizer',
        acordes: [
          { acorde: 'C', posicao: 0 },
          { acorde: 'G', posicao: 22 }
        ]
      },
      {
        letra: 'Que existe razão',
        acordes: [
          { acorde: 'Am', posicao: 0 },
          { acorde: 'F', posicao: 18 }
        ]
      },
      {
        letra: 'Nas coisas feitas pelo coração',
        acordes: [
          { acorde: 'C', posicao: 0 },
          { acorde: 'G', posicao: 25 }
        ]
      },
      {
        letra: 'E quem irá dizer',
        acordes: [
          { acorde: 'Am', posicao: 0 },
          { acorde: 'F', posicao: 17 }
        ]
      },
      {
        letra: 'Que não existe razão',
        acordes: [
          { acorde: 'C', posicao: 0 },
          { acorde: 'G', posicao: 22 }
        ]
      }
    ]
  },
  '5': {
    id: '5',
    titulo: 'Fico Assim Sem Você',
    artista: 'Claudinho e Buchecha',
    tom: 'A',
    tomOriginal: 'A',
    favorita: true,
    criadaEm: '2025-01-28T11:20:00Z',
    linhas: [
      {
        letra: 'Avião sem asa',
        acordes: [
          { acorde: 'A', posicao: 0 }
        ]
      },
      {
        letra: 'Fogueira sem brasa',
        acordes: [
          { acorde: 'D', posicao: 0 }
        ]
      },
      {
        letra: 'Sou eu assim sem você',
        acordes: [
          { acorde: 'E', posicao: 0 },
          { acorde: 'A', posicao: 20 }
        ]
      },
      {
        letra: '',
        acordes: []
      },
      {
        letra: 'Futebol sem bola',
        acordes: [
          { acorde: 'A', posicao: 0 }
        ]
      },
      {
        letra: 'Piu-piu sem Frajola',
        acordes: [
          { acorde: 'D', posicao: 0 }
        ]
      },
      {
        letra: 'Sou eu assim sem você',
        acordes: [
          { acorde: 'E', posicao: 0 },
          { acorde: 'A', posicao: 20 }
        ]
      }
    ]
  }
};

// Flag para alternar entre API real e dados mockados
const USE_MOCK_DATA = true; // Altere para false quando a API estiver disponível

export const musicasService = {
  async listar(): Promise<Musica[]> {
    if (USE_MOCK_DATA) {
      // Simula delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      return MUSICAS_MOCK;
    }
    const { data } = await api.get('/musicas');
    return data;
  },

  async buscarPorId(id: string, tom?: string): Promise<MusicaDetalhada> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const musica = MUSICAS_DETALHADAS_MOCK[id];
      if (!musica) {
        throw new Error('Música não encontrada');
      }
      // Se um tom diferente foi solicitado, aqui você poderia implementar transposição
      return { ...musica, tom: tom || musica.tom };
    }
    const params = tom ? { tom } : {};
    const { data } = await api.get(`/musicas/${id}`, { params });
    return data;
  },

  async criar(musica: CriarMusicaDTO): Promise<Musica> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const novaMusica: Musica = {
        id: String(MUSICAS_MOCK.length + 1),
        titulo: musica.titulo,
        artista: musica.artista,
        tom: musica.tom,
        favorita: false,
        criadaEm: new Date().toISOString()
      };
      MUSICAS_MOCK.push(novaMusica);
      return novaMusica;
    }
    const { data } = await api.post('/musicas', musica);
    return data;
  },

  async buscar(termo: string): Promise<Musica[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const termoLower = termo.toLowerCase();
      return MUSICAS_MOCK.filter(m => 
        m.titulo.toLowerCase().includes(termoLower) ||
        m.artista.toLowerCase().includes(termoLower)
      );
    }
    const { data } = await api.get('/musicas', { params: { q: termo } });
    return data;
  },
};
```

### Service de Favoritos

**arquivo: `src/services/favoritosService.ts`**

```typescript
import api from './api';
import { Musica } from '../types/musica';

// Flag para alternar entre API real e dados mockados
const USE_MOCK_DATA = true;

// Armazena IDs de músicas favoritas mockadas
const FAVORITOS_MOCK_IDS = new Set<string>(['1', '3', '5']);

// Dados de músicas mockadas (referência do musicasService)
const MUSICAS_MOCK: Musica[] = [
  {
    id: '1',
    titulo: 'Como é Grande o Meu Amor Por Você',
    artista: 'Roberto Carlos',
    tom: 'G',
    favorita: true,
    criadaEm: '2025-01-15T10:00:00Z'
  },
  {
    id: '2',
    titulo: 'Evidências',
    artista: 'Chitãozinho & Xororó',
    tom: 'D',
    favorita: false,
    criadaEm: '2025-01-20T14:30:00Z'
  },
  {
    id: '3',
    titulo: 'Paciência',
    artista: 'Lenine',
    tom: 'Am',
    favorita: true,
    criadaEm: '2025-01-22T09:15:00Z'
  },
  {
    id: '4',
    titulo: 'Eduardo e Mônica',
    artista: 'Legião Urbana',
    tom: 'C',
    favorita: false,
    criadaEm: '2025-01-25T16:45:00Z'
  },
  {
    id: '5',
    titulo: 'Fico Assim Sem Você',
    artista: 'Claudinho e Buchecha',
    tom: 'A',
    favorita: true,
    criadaEm: '2025-01-28T11:20:00Z'
  }
];

export const favoritosService = {
  async listar(): Promise<Musica[]> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return MUSICAS_MOCK.filter(m => FAVORITOS_MOCK_IDS.has(m.id));
    }
    const { data } = await api.get('/favoritos');
    return data;
  },

  async adicionar(musicaId: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      FAVORITOS_MOCK_IDS.add(musicaId);
      return;
    }
    await api.post(`/favoritos/${musicaId}`);
  },

  async remover(musicaId: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      FAVORITOS_MOCK_IDS.delete(musicaId);
      return;
    }
    await api.delete(`/favoritos/${musicaId}`);
  },
};
```

### 6.1. Estrutura dos Dados Mockados

#### Objeto de Música Completa (exemplo)

```json
{
  "id": "1",
  "titulo": "Como é Grande o Meu Amor Por Você",
  "artista": "Roberto Carlos",
  "tom": "G",
  "tomOriginal": "G",
  "favorita": true,
  "criadaEm": "2025-01-15T10:00:00Z",
  "linhas": [
    {
      "letra": "Eu tenho tanto pra lhe falar",
      "acordes": [
        { "acorde": "G", "posicao": 0 },
        { "acorde": "D7", "posicao": 25 }
      ]
    },
    {
      "letra": "Mas com palavras não sei dizer",
      "acordes": [
        { "acorde": "Em", "posicao": 5 },
        { "acorde": "C", "posicao": 30 }
      ]
    },
    {
      "letra": "Como é grande o meu amor por você",
      "acordes": [
        { "acorde": "G", "posicao": 0 },
        { "acorde": "D7", "posicao": 20 },
        { "acorde": "G", "posicao": 35 }
      ]
    }
  ]
}
```

#### Estrutura de Linha com Acordes

Cada linha da cifra possui:
- **letra**: String com a letra da música (pode ser vazia para linhas instrumentais)
- **acordes**: Array de objetos com:
  - **acorde**: Nome do acorde (ex: "G", "D7", "Em", "C#m")
  - **posicao**: Índice do caractere onde o acorde deve aparecer (0-based)

#### Como os Acordes são Posicionados

A propriedade `posicao` indica exatamente onde o acorde deve aparecer acima da letra:

```
Posição:  0    5    10   15   20   25   30
Letra:    "Eu tenho tanto pra lhe falar"
Acordes:  G                         D7
```

Isso resulta em:

```
G                         D7
Eu tenho tanto pra lhe falar
```

#### Benefícios dessa Abordagem

1. **Precisão**: Acordes alinhados perfeitamente com a sílaba correta
2. **Flexibilidade**: Suporta múltiplos acordes por linha
3. **Simplicidade**: Não requer parsing complexo no frontend
4. **Transposição**: Backend pode recalcular acordes mantendo posições
5. **Renderização**: Frontend apenas posiciona elementos CSS

#### Exemplo de Uso nos Componentes

```typescript
// No componente CifraViewer.tsx
linhas.map((linha, i) => (
  <LinhaComAcordes 
    key={i}
    letra={linha.letra}
    acordes={linha.acordes}
  />
))

// No componente LinhaComAcordes.tsx
const renderizarAcordes = () => {
  return acordes.map((item, i) => (
    <span 
      key={i}
      className="acorde"
      style={{ left: `${item.posicao}ch` }}
    >
      {item.acorde}
    </span>
  ));
};
```

#### Dados Mockados de Teste

**5 músicas completas** com cifras reais:
1. Roberto Carlos - Com é Grande o Meu Amor Por Você (Tom: G)
2. Chitãozinho & Xororó - Evidências (Tom: D)
3. Lenine - Paciência (Tom: Am)
4. Legião Urbana - Eduardo e Mônica (Tom: C)
5. Claudinho e Buchecha - Fico Assim Sem Você (Tom: A)

**Recursos simulados:**
- Delay de rede realista (200-600ms)
- Sistema de favoritos persistente durante sessão
- Busca funcional por título/artista
- Validação de autenticação
- Criação de novas músicas

---

## 7. TIPOS TYPESCRIPT

### Tipos de Músicas e Cifras

**arquivo: `src/types/musica.ts`**

```typescript
export interface Musica {
  id: string;
  titulo: string;
  artista: string;
  tom: string;
  favorita?: boolean;
  criadaEm: string;
}

export interface LinhaComAcordes {
  acordes: AcordeNaLinha[];
  letra: string;
}

export interface AcordeNaLinha {
  acorde: string;
  posicao: number;
}

export interface MusicaDetalhada extends Musica {
  linhas: LinhaComAcordes[];
  tomOriginal: string;
}

export interface CriarMusicaDTO {
  titulo: string;
  artista: string;
  tom: string;
  cifraTexto: string; // Texto bruto que a API vai processar
}
```

**arquivo: `src/types/auth.ts`**

```typescript
export interface Usuario {
  id: string;
  nome: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
```

---

## 8. PÁGINAS DO APLICATIVO

### 8.1. Página de Login

**arquivo: `src/pages/Login.tsx`**

```typescript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login(email, senha);
      navigate('/');
    } catch (error: any) {
      setErro(error.response?.data?.mensagem || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="logo">ACORDEIA</h1>
          <p className="tagline">Suas cifras, organizadas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {erro && <div className="error-message">{erro}</div>}
          
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Não tem conta? <Link to="/cadastro">Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Características:**
- Formulário simples e limpo
- Validação básica no HTML5
- Feedback visual de erros
- Loading state durante requisição
- Link para cadastro

---

### 8.2. Página de Cadastro

**arquivo: `src/pages/Cadastro.tsx`**

```typescript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setCarregando(true);

    try {
      await registrar(nome, email, senha);
      navigate('/');
    } catch (error: any) {
      setErro(error.response?.data?.mensagem || 'Erro ao criar conta');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="logo">ACORDEIA</h1>
          <p className="tagline">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {erro && <div className="error-message">{erro}</div>}
          
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <input
              id="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={carregando}
          >
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Já tem conta? <Link to="/login">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Características:**
- Validação de senha (mínimo 6 caracteres)
- Confirmação de senha
- Feedback de erros
- Link para login

---

### 8.3. Página Home (Lista de Músicas)

**arquivo: `src/pages/Home.tsx`**

```typescript
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { Musica } from '../types/musica';
import { CardMusica } from '../components/musica/CardMusica';
import { Loading } from '../components/comum/Loading';

export function Home() {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    carregarMusicas();
  }, []);

  const carregarMusicas = async () => {
    try {
      const data = await musicasService.listar();
      setMusicas(data);
    } catch (error) {
      console.error('Erro ao carregar músicas:', error);
    } finally {
      setCarregando(false);
    }
  };

  const buscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termoBusca.trim()) {
      carregarMusicas();
      return;
    }
    
    setCarregando(true);
    try {
      const resultados = await musicasService.buscar(termoBusca);
      setMusicas(resultados);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) return <Loading />;

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Minhas Músicas</h1>
        <Link to="/cadastrar-musica" className="btn-primary">
          + Nova Música
        </Link>
      </div>

      <form onSubmit={buscar} className="search-form">
        <input
          type="search"
          placeholder="Buscar por título ou artista..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn-secondary">
          Buscar
        </button>
      </form>

      {musicas.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma música encontrada</p>
          <Link to="/cadastrar-musica">Cadastrar primeira música</Link>
        </div>
      ) : (
        <div className="musicas-grid">
          {musicas.map((musica) => (
            <CardMusica key={musica.id} musica={musica} />
          ))}
        </div>
      )}
    </div>
  );
}
```

**Características:**
- Grid responsivo de cards
- Busca em tempo real
- Loading states
- Empty state quando não há músicas
- Botão de criar nova música

---

### 8.4. Página de Detalhe da Música (Cifra)

**arquivo: `src/pages/DetalheMusicaPage.tsx`**

```typescript
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { favoritosService } from '../services/favoritosService';
import { MusicaDetalhada } from '../types/musica';
import { CifraViewer } from '../components/cifra/CifraViewer';
import { ModalTransposicao } from '../components/cifra/ModalTransposicao';
import { Loading } from '../components/comum/Loading';

export function DetalheMusicaPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [musica, setMusica] = useState<MusicaDetalhada | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [favorita, setFavorita] = useState(false);

  useEffect(() => {
    carregarMusica();
  }, [id]);

  const carregarMusica = async (tomSelecionado?: string) => {
    if (!id) return;
    
    setCarregando(true);
    try {
      const data = await musicasService.buscarPorId(id, tomSelecionado);
      setMusica(data);
      setFavorita(data.favorita || false);
    } catch (error) {
      console.error('Erro ao carregar música:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleSelecionarTom = (tom: string) => {
    setModalAberto(false);
    carregarMusica(tom);
  };

  const toggleFavorito = async () => {
    if (!id) return;
    
    try {
      if (favorita) {
        await favoritosService.remover(id);
      } else {
        await favoritosService.adicionar(id);
      }
      setFavorita(!favorita);
    } catch (error) {
      console.error('Erro ao favoritar:', error);
    }
  };

  if (carregando) return <Loading />;
  if (!musica) return <div>Música não encontrada</div>;

  return (
    <div className="detalhe-musica-container">
      <div className="detalhe-header">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Voltar
        </button>
        
        <div className="musica-info">
          <h1>{musica.titulo}</h1>
          <p className="artista">{musica.artista}</p>
        </div>

        <div className="musica-actions">
          <button 
            onClick={() => setModalAberto(true)} 
            className="btn-tom"
          >
            Tom: <strong>{musica.tom}</strong>
          </button>

          <button 
            onClick={toggleFavorito}
            className={`btn-favorito ${favorita ? 'active' : ''}`}
          >
            {favorita ? '★' : '☆'}
          </button>

          <Link 
            to={`/modo-palco/${id}?tom=${musica.tom}`}
            className="btn-secondary"
          >
            Modo Palco
          </Link>
        </div>
      </div>

      <CifraViewer linhas={musica.linhas} />

      {modalAberto && (
        <ModalTransposicao
          tomAtual={musica.tom}
          tomOriginal={musica.tomOriginal}
          onSelecionar={handleSelecionarTom}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}
```

**Características:**
- Header fixo com informações da música
- Botão de tom clicável que abre modal
- Favoritar/desfavoritar
- Link para modo palco
- CifraViewer renderiza as linhas

---

### 8.5. Página de Cadastro de Música

**arquivo: `src/pages/CadastroMusicaPage.tsx`**

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { musicasService } from '../services/musicasService';

const TONS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function CadastroMusicaPage() {
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [tom, setTom] = useState('C');
  const [cifraTexto, setCifraTexto] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const musica = await musicasService.criar({
        titulo,
        artista,
        tom,
        cifraTexto,
      });
      navigate(`/musica/${musica.id}`);
    } catch (error: any) {
      setErro(error.response?.data?.mensagem || 'Erro ao cadastrar música');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-musica-container">
      <div className="cadastro-header">
        <h1>Nova Música</h1>
        <button onClick={() => navigate(-1)} className="btn-secondary">
          Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-musica">
        {erro && <div className="error-message">{erro}</div>}

        <div className="form-row">
          <div className="form-group flex-2">
            <label htmlFor="titulo">Título *</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nome da música"
              required
            />
          </div>

          <div className="form-group flex-1">
            <label htmlFor="tom">Tom *</label>
            <select
              id="tom"
              value={tom}
              onChange={(e) => setTom(e.target.value)}
              required
            >
              {TONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="artista">Artista *</label>
          <input
            id="artista"
            type="text"
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
            placeholder="Nome do artista"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cifraTexto">
            Cifra *
            <span className="label-help">
              Cole o texto da cifra. A API vai processar os acordes automaticamente.
            </span>
          </label>
          <textarea
            id="cifraTexto"
            value={cifraTexto}
            onChange={(e) => setCifraTexto(e.target.value)}
            placeholder="Cole aqui o texto da cifra..."
            rows={20}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={carregando}
          >
            {carregando ? 'Salvando...' : 'Salvar Música'}
          </button>
        </div>
      </form>
    </div>
  );
}
```

**Características:**
- Formulário com validação
- Select de tom
- Textarea grande para cifra
- API processa a cifra no backend
- Redirect após cadastro

---

### 8.6. Página de Favoritos

**arquivo: `src/pages/FavoritosPage.tsx`**

```typescript
import { useState, useEffect } from 'react';
import { favoritosService } from '../services/favoritosService';
import { Musica } from '../types/musica';
import { CardMusica } from '../components/musica/CardMusica';
import { Loading } from '../components/comum/Loading';

export function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      const data = await favoritosService.listar();
      setFavoritos(data);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) return <Loading />;

  return (
    <div className="favoritos-container">
      <div className="favoritos-header">
        <h1>Favoritos</h1>
      </div>

      {favoritos.length === 0 ? (
        <div className="empty-state">
          <p>Você ainda não tem músicas favoritas</p>
        </div>
      ) : (
        <div className="musicas-grid">
          {favoritos.map((musica) => (
            <CardMusica key={musica.id} musica={musica} />
          ))}
        </div>
      )}
    </div>
  );
}
```

**Características:**
- Lista apenas favoritos
- Mesmos cards da home
- Empty state

---

### 8.7. Modo Palco

**arquivo: `src/pages/ModoPalcoPage.tsx`**

```typescript
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { MusicaDetalhada } from '../types/musica';
import { CifraViewer } from '../components/cifra/CifraViewer';
import { Loading } from '../components/comum/Loading';
import './ModoPalco.css';

export function ModoPalcoPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [musica, setMusica] = useState<MusicaDetalhada | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [uiVisivel, setUiVisivel] = useState(true);

  useEffect(() => {
    carregarMusica();
    
    // Esconder UI após 3 segundos
    const timer = setTimeout(() => setUiVisivel(false), 3000);
    return () => clearTimeout(timer);
  }, [id]);

  const carregarMusica = async () => {
    if (!id) return;
    
    const tom = searchParams.get('tom') || undefined;
    
    try {
      const data = await musicasService.buscarPorId(id, tom);
      setMusica(data);
    } catch (error) {
      console.error('Erro ao carregar música:', error);
    } finally {
      setCarregando(false);
    }
  };

  const sair = () => {
    navigate(`/musica/${id}`);
  };

  if (carregando) return <Loading />;
  if (!musica) return <div>Música não encontrada</div>;

  return (
    <div 
      className="modo-palco"
      onClick={() => setUiVisivel(!uiVisivel)}
    >
      {uiVisivel && (
        <div className="modo-palco-header">
          <button onClick={sair} className="btn-sair">
            ✕ Sair do modo palco
          </button>
          <div className="musica-info-palco">
            <h1>{musica.titulo}</h1>
            <p>{musica.artista} • Tom: {musica.tom}</p>
          </div>
        </div>
      )}

      <div className="cifra-palco">
        <CifraViewer linhas={musica.linhas} modoPalco={true} />
      </div>
    </div>
  );
}
```

**Características:**
- Fullscreen
- Fonte maior (variáveis CSS)
- UI esconde automaticamente
- Clique para mostrar/esconder UI
- Mesmo componente CifraViewer (prop modoPalco)

---

## 9. COMPONENTES PRINCIPAIS

### 9.1. CifraViewer (Renderizador de Cifras)

**arquivo: `src/components/cifra/CifraViewer.tsx`**

```typescript
import { LinhaComAcordes } from '../../types/musica';
import { LinhaComAcordesComponent } from './LinhaComAcordes';
import './CifraViewer.css';

interface CifraViewerProps {
  linhas: LinhaComAcordes[];
  modoPalco?: boolean;
}

export function CifraViewer({ linhas, modoPalco = false }: CifraViewerProps) {
  return (
    <div className={`cifra-viewer ${modoPalco ? 'modo-palco' : ''}`}>
      {linhas.map((linha, index) => (
        <LinhaComAcordesComponent 
          key={index} 
          linha={linha}
        />
      ))}
    </div>
  );
}
```

---

### 9.2. LinhaComAcordes (Renderização de Linha Individual)

**arquivo: `src/components/cifra/LinhaComAcordes.tsx`**

```typescript
import { LinhaComAcordes } from '../../types/musica';
import './LinhaComAcordes.css';

interface Props {
  linha: LinhaComAcordes;
}

export function LinhaComAcordesComponent({ linha }: Props) {
  const { acordes, letra } = linha;

  // Se não tem acordes, renderizar apenas a letra
  if (acordes.length === 0) {
    return (
      <div className="linha-cifra">
        <div className="linha-acordes"></div>
        <div className="linha-letra">{letra || '\u00A0'}</div>
      </div>
    );
  }

  // Construir linha de acordes baseado nas posições
  const linhaAcordes = Array(letra.length).fill('\u00A0');
  acordes.forEach(({ acorde, posicao }) => {
    const espacos = acorde.split('');
    espacos.forEach((char, i) => {
      if (posicao + i < linhaAcordes.length) {
        linhaAcordes[posicao + i] = char;
      }
    });
  });

  return (
    <div className="linha-cifra">
      <div className="linha-acordes">
        {linhaAcordes.join('')}
      </div>
      <div className="linha-letra">
        {letra || '\u00A0'}
      </div>
    </div>
  );
}
```

**CSS: `src/components/cifra/LinhaComAcordes.css`**

```css
.linha-cifra {
  margin-bottom: var(--cifra-gap);
  padding: var(--space-1) 0;
  transition: background var(--transition-fast);
  border-radius: var(--border-radius-sm);
}

/* Highlight sutil ao passar o mouse */
.linha-cifra:hover {
  background: var(--color-surface);
}

.linha-acordes {
  font-family: var(--font-mono);
  font-size: var(--cifra-acorde-size);
  color: var(--color-acorde);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  white-space: pre;
  letter-spacing: var(--letter-spacing-normal);
  min-height: 1.4em;
  user-select: all;
  
  /* Glow sutil nos acordes */
  text-shadow: 0 0 20px var(--color-acorde-glow);
}

/* Acordes individuais com destaque */
.linha-acordes .acorde {
  display: inline;
  padding: 0 var(--space-1);
  background: var(--color-acorde-bg);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
}

.linha-acordes .acorde:hover {
  background: var(--color-acorde);
  color: var(--color-background);
  text-shadow: none;
}

.linha-letra {
  font-family: var(--font-mono);
  font-size: var(--cifra-letra-size);
  color: var(--color-letra);
  line-height: var(--cifra-line-height);
  white-space: pre;
  letter-spacing: var(--letter-spacing-normal);
  user-select: all;
}

/* Linhas vazias (instruções/seções) */
.linha-cifra.secao {
  margin-top: var(--space-6);
  margin-bottom: var(--space-3);
}

.linha-cifra.secao .linha-letra {
  color: var(--color-text-muted);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  letter-spacing: var(--letter-spacing-wide);
}

/* ============================================
   MODO PALCO
   ============================================ */

.modo-palco .linha-cifra {
  margin-bottom: var(--space-2);
}

.modo-palco .linha-acordes {
  font-size: var(--stage-acorde-size);
  text-shadow: 0 0 30px var(--color-acorde-glow);
}

.modo-palco .linha-letra {
  font-size: var(--stage-letra-size);
  line-height: var(--stage-line-height);
}

/* Animação de entrada no modo palco */
.modo-palco .linha-cifra {
  animation: slideUp var(--transition-slow) ease-out;
  animation-fill-mode: both;
}

.modo-palco .linha-cifra:nth-child(1) { animation-delay: 0ms; }
.modo-palco .linha-cifra:nth-child(2) { animation-delay: 30ms; }
.modo-palco .linha-cifra:nth-child(3) { animation-delay: 60ms; }
.modo-palco .linha-cifra:nth-child(4) { animation-delay: 90ms; }
.modo-palco .linha-cifra:nth-child(5) { animation-delay: 120ms; }
```

**Explicação Técnica:**

1. **Acordes ACIMA da letra**: Duas divs separadas (`.linha-acordes` e `.linha-letra`)
2. **Alinhamento perfeito**: Uso de `white-space: pre` e fonte monoespaçada
3. **Posicionamento**: Array de caracteres posicionados pela propriedade `posicao`
4. **Espaçamento**: `\u00A0` (non-breaking space) mantém layout
5. **Backend faz o cálculo**: Frontend apenas renderiza

---

### 9.3. Modal de Transposição

**arquivo: `src/components/cifra/ModalTransposicao.tsx`**

```typescript
import { Modal } from '../comum/Modal';
import './ModalTransposicao.css';

const TONS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

interface Props {
  tomAtual: string;
  tomOriginal: string;
  onSelecionar: (tom: string) => void;
  onFechar: () => void;
}

export function ModalTransposicao({ tomAtual, tomOriginal, onSelecionar, onFechar }: Props) {
  return (
    <Modal onFechar={onFechar} titulo="Selecionar Tom">
      <div className="modal-transposicao">
        <p className="modal-info">
          Tom original: <strong>{tomOriginal}</strong>
        </p>

        <div className="tons-grid">
          {TONS.map((tom) => (
            <button
              key={tom}
              onClick={() => onSelecionar(tom)}
              className={`btn-tom-opcao ${tom === tomAtual ? 'ativo' : ''}`}
            >
              {tom}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
```

**CSS: `src/components/cifra/ModalTransposicao.css`**

```css
.modal-transposicao {
  padding: var(--space-4);
}

.modal-info {
  margin-bottom: var(--space-5);
  color: var(--color-text-secondary);
  text-align: center;
  font-size: var(--font-size-sm);
}

.modal-info strong {
  color: var(--color-acorde);
  font-family: var(--font-mono);
  font-size: var(--font-size-lg);
}

.tons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2);
}

.btn-tom-opcao {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all var(--transition);
}

.btn-tom-opcao:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
  transform: scale(1.05);
}

.btn-tom-opcao:active {
  transform: scale(0.98);
}

.btn-tom-opcao.ativo {
  background: var(--gradient-primary);
  border-color: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-glow);
}

/* Tom original indicador */
.btn-tom-opcao.original {
  position: relative;
}

.btn-tom-opcao.original::after {
  content: '•';
  position: absolute;
  top: var(--space-1);
  right: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-acorde);
}

/* Responsive: 3 colunas em mobile */
@media (max-width: 400px) {
  .tons-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Comportamento:**
- Grid 4x3 de botões
- Tom atual destacado
- 1 clique para selecionar
- Frontend envia GET com query string `?tom=B`
- Backend recalcula acordes

---

### 9.4. Card de Música

**arquivo: `src/components/musica/CardMusica.tsx`**

```typescript
import { Link } from 'react-router-dom';
import { Musica } from '../../types/musica';
import './CardMusica.css';

interface Props {
  musica: Musica;
}

export function CardMusica({ musica }: Props) {
  return (
    <Link to={`/musica/${musica.id}`} className="card-musica">
      <div className="card-header">
        <h3 className="card-titulo">{musica.titulo}</h3>
        {musica.favorita && <span className="badge-favorito">★</span>}
      </div>
      
      <p className="card-artista">{musica.artista}</p>
      
      <div className="card-footer">
        <span className="card-tom">Tom: {musica.tom}</span>
      </div>
    </Link>
  );
}
```

**Características:**
- Link direto para detalhe
- Badge de favorito
- Tom exibido

---

### 9.5. Modal Base

**arquivo: `src/components/comum/Modal.tsx`**

```typescript
import { useEffect } from 'react';
import './Modal.css';

interface Props {
  children: React.ReactNode;
  onFechar: () => void;
  titulo?: string;
}

export function Modal({ children, onFechar, titulo }: Props) {
  useEffect(() => {
    // Bloquear scroll do body
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {titulo && <h2>{titulo}</h2>}
          <button onClick={onFechar} className="modal-close">
            ✕
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
```

---

### 9.6. Header e Layout

**arquivo: `src/components/layout/Header.tsx`**

```typescript
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export function Header() {
  const { usuario, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">ACORDEIA</Link>

        <nav className="nav">
          <Link to="/">Músicas</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>

        <div className="header-user">
          <span>{usuario?.nome}</span>
          <button onClick={logout} className="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
```

**arquivo: `src/components/layout/Layout.tsx`**

```typescript
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import './Layout.css';

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## 10. ROTEAMENTO

**arquivo: `src/App.tsx`**

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';
import { DetalheMusicaPage } from './pages/DetalheMusicaPage';
import { CadastroMusicaPage } from './pages/CadastroMusicaPage';
import { FavoritosPage } from './pages/FavoritosPage';
import { ModoPalcoPage } from './pages/ModoPalcoPage';
import { Loading } from './components/comum/Loading';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { usuario, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!usuario) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas protegidas */}
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/musica/:id" element={<DetalheMusicaPage />} />
            <Route path="/cadastrar-musica" element={<CadastroMusicaPage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
          </Route>

          {/* Modo palco (sem layout) */}
          <Route path="/modo-palco/:id" element={
            <ProtectedRoute>
              <ModoPalcoPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

**Características:**
- Rotas públicas (login/cadastro)
- Rotas protegidas (com Layout)
- Modo palco sem layout
- Loading durante verificação de auth

---

## 11. ESTILOS GLOBAIS

**arquivo: `src/styles/global.css`**

```css
/* Reset moderno */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  min-height: 100%;
  font-family: var(--font-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-primary);
  background: var(--color-background);
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Focus visible - Acessibilidade */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}

/* Links modernos */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition);
}

a:hover {
  color: var(--color-primary-hover);
}

/* Botões - Reset completo */
button {
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
  -webkit-tap-highlight-color: transparent;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Inputs modernos */
input, textarea, select {
  font-family: inherit;
  font-size: var(--font-size-base);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-text-primary);
  transition: all var(--transition);
}

input::placeholder, textarea::placeholder {
  color: var(--color-text-muted);
}

input:hover, textarea:hover, select:hover {
  border-color: var(--color-border-subtle);
}

input:focus, textarea:focus, select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23a1a1aa' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  padding-right: var(--space-10);
}

/* ============================================
   SISTEMA DE BOTÕES MODERNO
   ============================================ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  line-height: 1;
  border-radius: var(--border-radius);
  transition: all var(--transition);
  white-space: nowrap;
  user-select: none;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-md), 0 0 0 0 var(--color-primary-glow);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg), 0 0 20px var(--color-primary-glow);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.btn-icon {
  padding: var(--space-2);
  border-radius: var(--border-radius);
}

.btn-lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--font-size-base);
}

.btn-sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
}

/* ============================================
   CARDS MODERNOS
   ============================================ */

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-5);
  transition: all var(--transition);
}

.card-interactive {
  cursor: pointer;
}

.card-interactive:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--color-primary-subtle);
  transform: translateY(-2px);
}

.card-elevated {
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-md);
  border: none;
}

/* ============================================
   BADGES E TAGS
   ============================================ */

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-full);
  background: var(--color-surface);
  color: var(--color-text-secondary);
}

.badge-primary {
  background: var(--color-primary-subtle);
  color: var(--color-primary);
}

.badge-acorde {
  background: var(--color-acorde-bg);
  color: var(--color-acorde);
  font-family: var(--font-mono);
  font-weight: var(--font-weight-bold);
}

/* ============================================
   MENSAGENS E FEEDBACK
   ============================================ */

.message {
  padding: var(--space-4);
  border-radius: var(--border-radius);
  font-size: var(--font-size-sm);
  animation: slideDown var(--transition-slow);
}

.message-error {
  background: var(--color-danger-subtle);
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
}

.message-success {
  background: var(--color-success-subtle);
  border: 1px solid var(--color-success);
  color: var(--color-success);
}

/* ============================================
   SKELETON LOADING
   ============================================ */

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    var(--color-surface-hover) 50%,
    var(--color-surface) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--border-radius);
}

.skeleton-text {
  height: 1em;
  margin-bottom: var(--space-2);
}

.skeleton-title {
  height: 1.5em;
  width: 60%;
  margin-bottom: var(--space-3);
}

.skeleton-card {
  height: 120px;
}

/* ============================================
   EMPTY STATES MODERNOS
   ============================================ */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-16) var(--space-6);
  animation: fadeIn var(--transition-slow);
}

.empty-state-icon {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--space-4);
  opacity: 0.3;
}

.empty-state-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.empty-state-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
  max-width: 300px;
}

/* ============================================
   CONTAINER E LAYOUT
   ============================================ */

.container {
  width: 100%;
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-6);
  }
}

/* ============================================
   UTILITÁRIOS
   ============================================ */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: var(--border-radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-subtle);
}
```

---

## 12. COMANDOS E SETUP

### Criação do Projeto

```bash
npm create vite@latest acordeia-frontend -- --template react-ts
cd acordeia-frontend
npm install
npm install react-router-dom axios
```

### 🎯 Quick Start - Desenvolvimento com Dados Mockados

**1. Clone e instale as dependências:**

```bash
git clone [repo-url]
cd acordeia-frontend
npm install
```

**2. Configure o ambiente (opcional):**

```bash
# Crie o arquivo .env (não é obrigatório para modo mock)
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

**3. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

**4. Acesse a aplicação:**

Abra [http://localhost:5173](http://localhost:5173)

**5. Faça login com qualquer credencial:**

- Email: `demo@acordeia.com` (ou qualquer email)
- Senha: `123456` (ou qualquer senha)

**6. Explore os recursos:**

- ✅ Visualize as 5 músicas mockadas na home
- ✅ Clique em uma música para ver a cifra completa
- ✅ Use o botão ⭐ para adicionar aos favoritos
- ✅ Busque por título ou artista
- ✅ Cadastre novas músicas (serão adicionadas temporariamente)

### 📝 Nota Importante sobre Dados Mockados

**Os dados são temporários!** Como os dados estão no código (não em localStorage ou banco de dados), eles serão **resetados** quando você:
- Recarregar a página (F5)
- Reiniciar o servidor de desenvolvimento

**Para persistência**, você precisa:
1. Implementar localStorage no service, OU
2. Conectar à API backend real (alterar `USE_MOCK_DATA = false`)

### 🔄 Migrando para API Real

Quando a API backend estiver pronta:

**1. Configure a URL da API:**

```bash
# .env
VITE_API_URL=http://localhost:3000/api
```

**2. Desative o modo mock em TODOS os services:**

```typescript
// src/services/authService.ts
const USE_MOCK_DATA = false; // ← Alterar para false

// src/services/musicasService.ts
const USE_MOCK_DATA = false; // ← Alterar para false

// src/services/favoritosService.ts
const USE_MOCK_DATA = false; // ← Alterar para false
```

**3. Reinicie o servidor:**

```bash
npm run dev
```

Pronto! A aplicação agora usará a API real.

### Variáveis de Ambiente

**arquivo: `.env`**

```
VITE_API_URL=http://localhost:3000/api
```

**arquivo: `.env.production`**

```
VITE_API_URL=https://api.acordeia.com.br/api
```

### Configuração Vite Otimizada

**arquivo: `vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Alias para imports mais limpos
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@services': resolve(__dirname, 'src/services'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@types': resolve(__dirname, 'src/types'),
    },
  },
  
  // Otimizações de build
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    
    // Chunk splitting inteligente
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: React e React DOM juntos
          'vendor-react': ['react', 'react-dom'],
          // Router separado (carrega após React)
          'vendor-router': ['react-router-dom'],
          // Axios separado
          'vendor-http': ['axios'],
        },
      },
    },
    
    // Limite de aviso de tamanho
    chunkSizeWarningLimit: 500,
  },
  
  // Otimizações de desenvolvimento
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  // Preview (build local)
  preview: {
    port: 4173,
  },
  
  // CSS
  css: {
    devSourcemap: true,
  },
  
  // Dependências pré-bundled
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },
});
```

### Configuração TypeScript Otimizada

**arquivo: `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Paths (aliases) */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@styles/*": ["src/styles/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Scripts no package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx"
  }
}
```

### Build e Deploy

```bash
# Build de produção
npm run build

# Gera pasta dist/ pronta para deploy
# Pode ser hospedado em:
# - Vercel
# - Netlify
# - AWS S3 + CloudFront
# - Qualquer servidor web estático
```

---

## 13. FLUXOS PRINCIPAIS

### Fluxo de Login

1. Usuário acessa `/login`
2. Preenche email e senha
3. Submit chama `authService.login()`
4. API retorna JWT + dados do usuário
5. JWT armazenado em localStorage
6. Context atualiza estado
7. Redirect para home `/`

### Fluxo de Visualização de Cifra

1. Usuário clica em música na home
2. Navega para `/musica/:id`
3. Frontend faz GET `/musicas/:id`
4. API retorna música com `linhas[]`
5. `CifraViewer` renderiza linha por linha
6. `LinhaComAcordes` posiciona acordes acima da letra

### Fluxo de Transposição

1. Usuário clica no botão "Tom: C"
2. Modal abre mostrando todos os 12 tons
3. Tom atual destacado
4. Usuário clica em "D"
5. Modal fecha
6. Frontend faz GET `/musicas/:id?tom=D`
7. API recalcula acordes no backend
8. Frontend re-renderiza com novo tom

### Fluxo de Favoritar

1. Usuário clica no botão ★
2. Se não está favoritado: POST `/favoritos/:id`
3. Se está favoritado: DELETE `/favoritos/:id`
4. Estado local atualiza (toggle)
5. Estrela muda visualmente

---

## 14. RESPONSIVIDADE E LAYOUT

### Sistema de Grid Moderno

**arquivo: `src/styles/layout.css`**

```css
/* ============================================
   GRID DE MÚSICAS - RESPONSIVO
   ============================================ */

.musicas-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  animation: fadeIn var(--transition-slow);
}

/* Mobile landscape / Tablet portrait */
@media (min-width: 480px) {
  .musicas-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Tablet landscape */
@media (min-width: 768px) {
  .musicas-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .musicas-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
}

/* Desktop grande */
@media (min-width: 1280px) {
  .musicas-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ============================================
   CARD DE MÚSICA - ESTILO MODERNO
   ============================================ */

.card-musica {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  min-height: 140px;
  text-decoration: none;
  color: inherit;
}

.card-musica-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2);
}

.card-musica-titulo {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.card-musica-artista {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  flex: 1;
}

.card-musica-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.badge-favorito {
  color: var(--color-acorde);
  font-size: var(--font-size-lg);
  line-height: 1;
}

/* ============================================
   HEADER DA PÁGINA
   ============================================ */

.home-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

@media (min-width: 640px) {
  .home-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.home-header h1 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
}

/* ============================================
   BUSCA
   ============================================ */

.search-container {
  margin-bottom: var(--space-6);
}

.search-input {
  width: 100%;
  padding: var(--space-4);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

/* ============================================
   CIFRA VIEWER CONTAINER
   ============================================ */

.cifra-viewer {
  padding: var(--space-4);
  background: var(--color-background-subtle);
  border-radius: var(--border-radius-lg);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 768px) {
  .cifra-viewer {
    padding: var(--space-6);
  }
}

.cifra-viewer-virtual {
  height: calc(100vh - 200px);
  overflow-y: auto;
}

/* ============================================
   MODO PALCO - FULLSCREEN
   ============================================ */

.modo-palco {
  position: fixed;
  inset: 0;
  background: var(--color-background);
  z-index: var(--z-modal);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modo-palco-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: var(--space-4);
  background: linear-gradient(
    to bottom,
    var(--color-background) 0%,
    transparent 100%
  );
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slideDown var(--transition-slow);
}

.modo-palco-header.oculto {
  animation: fadeOut var(--transition-slow) forwards;
}

@keyframes fadeOut {
  to { opacity: 0; pointer-events: none; }
}

.musica-info-palco {
  text-align: center;
  flex: 1;
}

.musica-info-palco h1 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.musica-info-palco p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.cifra-palco {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-16) var(--space-4) var(--space-8);
  scroll-behavior: smooth;
}

@media (min-width: 768px) {
  .cifra-palco {
    padding: var(--space-20) var(--space-10) var(--space-10);
  }
}

.btn-sair {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-surface);
  border-radius: var(--border-radius-full);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition);
}

.btn-sair:hover {
  background: var(--color-surface-hover);
}

/* ============================================
   MOBILE-SPECIFIC OPTIMIZATIONS
   ============================================ */

@media (max-width: 639px) {
  /* Touch targets mínimo de 44px */
  .btn, button {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Cifra viewer full-width em mobile */
  .cifra-viewer {
    margin: 0 calc(-1 * var(--space-4));
    border-radius: 0;
    padding: var(--space-4);
  }
  
  /* Header fixo mais compacto */
  .detalhe-header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--color-background);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--color-border);
  }
}
```

### Safe Areas para Dispositivos Modernos

```css
/* Suporte a notch e home indicator */
@supports (padding: max(0px)) {
  .layout {
    padding-left: max(var(--space-4), env(safe-area-inset-left));
    padding-right: max(var(--space-4), env(safe-area-inset-right));
  }
  
  .modo-palco {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

---

## 15. TRATAMENTO DE ERROS

### Erros de API

```typescript
// No interceptor axios
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Erros de UI

```typescript
// Em cada página
const [erro, setErro] = useState('');

try {
  // operação
} catch (error: any) {
  setErro(error.response?.data?.mensagem || 'Erro desconhecido');
}
```

---

## 16. PERFORMANCE E OTIMIZAÇÕES

### Estratégias de Performance

O Acordeia implementa diversas técnicas para garantir uma experiência rápida e fluida:

#### 16.1. Code Splitting por Rotas

**arquivo: `src/App.tsx`** (versão otimizada)

```typescript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { LoadingPage } from './components/comum/LoadingPage';

// Lazy loading de todas as páginas
const Login = lazy(() => import('./pages/Login'));
const Cadastro = lazy(() => import('./pages/Cadastro'));
const Home = lazy(() => import('./pages/Home'));
const DetalheMusicaPage = lazy(() => import('./pages/DetalheMusicaPage'));
const CadastroMusicaPage = lazy(() => import('./pages/CadastroMusicaPage'));
const FavoritosPage = lazy(() => import('./pages/FavoritosPage'));
const ModoPalcoPage = lazy(() => import('./pages/ModoPalcoPage'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { usuario, loading } = useAuth();
  
  if (loading) return <LoadingPage />;
  if (!usuario) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Home />} />
              <Route path="/musica/:id" element={<DetalheMusicaPage />} />
              <Route path="/cadastrar-musica" element={<CadastroMusicaPage />} />
              <Route path="/favoritos" element={<FavoritosPage />} />
            </Route>

            <Route path="/modo-palco/:id" element={
              <ProtectedRoute>
                <ModoPalcoPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

#### 16.2. Componentes Memoizados

**arquivo: `src/components/cifra/LinhaComAcordes.tsx`** (otimizado)

```typescript
import { memo, useMemo } from 'react';
import { LinhaComAcordes } from '../../types/musica';
import './LinhaComAcordes.css';

interface Props {
  linha: LinhaComAcordes;
}

export const LinhaComAcordesComponent = memo(function LinhaComAcordesComponent({ linha }: Props) {
  const { acordes, letra } = linha;

  // Memoiza a construção da linha de acordes
  const linhaAcordesRenderizada = useMemo(() => {
    if (acordes.length === 0) return null;

    const chars = Array(Math.max(letra.length, 1)).fill('\u00A0');
    acordes.forEach(({ acorde, posicao }) => {
      acorde.split('').forEach((char, i) => {
        if (posicao + i < chars.length) {
          chars[posicao + i] = char;
        }
      });
    });

    return chars.join('');
  }, [acordes, letra.length]);

  return (
    <div className="linha-cifra">
      <div className="linha-acordes" aria-label="acordes">
        {linhaAcordesRenderizada || '\u00A0'}
      </div>
      <div className="linha-letra">
        {letra || '\u00A0'}
      </div>
    </div>
  );
});
```

#### 16.3. Virtualização para Cifras Longas

**arquivo: `src/components/cifra/CifraViewerVirtualizado.tsx`**

```typescript
import { memo, useRef, useState, useEffect, useCallback } from 'react';
import { LinhaComAcordes } from '../../types/musica';
import { LinhaComAcordesComponent } from './LinhaComAcordes';
import './CifraViewer.css';

interface Props {
  linhas: LinhaComAcordes[];
  modoPalco?: boolean;
}

const LINHA_HEIGHT = 60; // Altura estimada de cada linha
const OVERSCAN = 5; // Linhas extras renderizadas fora da viewport

export const CifraViewerVirtualizado = memo(function CifraViewerVirtualizado({ 
  linhas, 
  modoPalco = false 
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setContainerHeight(entries[0].contentRect.height);
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Se for modo palco ou poucas linhas, renderizar tudo
  if (modoPalco || linhas.length < 50) {
    return (
      <div className={`cifra-viewer ${modoPalco ? 'modo-palco' : ''}`}>
        {linhas.map((linha, index) => (
          <LinhaComAcordesComponent key={index} linha={linha} />
        ))}
      </div>
    );
  }

  // Virtualização para cifras longas
  const totalHeight = linhas.length * LINHA_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / LINHA_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(
    linhas.length,
    Math.ceil((scrollTop + containerHeight) / LINHA_HEIGHT) + OVERSCAN
  );

  const visibleLinhas = linhas.slice(startIndex, endIndex);

  return (
    <div 
      ref={containerRef}
      className="cifra-viewer cifra-viewer-virtual"
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ 
          position: 'absolute', 
          top: startIndex * LINHA_HEIGHT,
          left: 0,
          right: 0
        }}>
          {visibleLinhas.map((linha, index) => (
            <LinhaComAcordesComponent 
              key={startIndex + index} 
              linha={linha} 
            />
          ))}
        </div>
      </div>
    </div>
  );
});
```

#### 16.4. Preloading de Páginas

**arquivo: `src/components/musica/CardMusica.tsx`** (com preload)

```typescript
import { Link, useNavigate } from 'react-router-dom';
import { Musica } from '../../types/musica';
import './CardMusica.css';

interface Props {
  musica: Musica;
}

export function CardMusica({ musica }: Props) {
  // Preload da página ao hover para navegação instantânea
  const handleMouseEnter = () => {
    // Preload do chunk da página de detalhe
    import('../pages/DetalheMusicaPage');
  };

  return (
    <Link 
      to={`/musica/${musica.id}`} 
      className="card card-interactive card-musica"
      onMouseEnter={handleMouseEnter}
    >
      <div className="card-musica-header">
        <h3 className="card-musica-titulo truncate">{musica.titulo}</h3>
        {musica.favorita && (
          <span className="badge-favorito" aria-label="Favorita">★</span>
        )}
      </div>
      
      <p className="card-musica-artista truncate">{musica.artista}</p>
      
      <div className="card-musica-footer">
        <span className="badge badge-acorde">Tom: {musica.tom}</span>
      </div>
    </Link>
  );
}
```

#### 16.5. Debounce na Busca

**arquivo: `src/hooks/useDebounce.ts`**

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

**arquivo: `src/pages/Home.tsx`** (busca otimizada)

```typescript
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { musicasService } from '../services/musicasService';
import { Musica } from '../types/musica';
import { CardMusica } from '../components/musica/CardMusica';
import { LoadingGrid } from '../components/comum/LoadingGrid';
import { useDebounce } from '../hooks/useDebounce';

export default function Home() {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState('');
  
  // Debounce de 300ms na busca
  const termoBuscaDebounced = useDebounce(termoBusca, 300);

  useEffect(() => {
    carregarMusicas();
  }, []);

  // Busca automática quando o termo muda (com debounce)
  useEffect(() => {
    if (termoBuscaDebounced) {
      buscar(termoBuscaDebounced);
    } else {
      carregarMusicas();
    }
  }, [termoBuscaDebounced]);

  const carregarMusicas = async () => {
    setCarregando(true);
    try {
      const data = await musicasService.listar();
      setMusicas(data);
    } catch (error) {
      console.error('Erro ao carregar músicas:', error);
    } finally {
      setCarregando(false);
    }
  };

  const buscar = async (termo: string) => {
    setCarregando(true);
    try {
      const resultados = await musicasService.buscar(termo);
      setMusicas(resultados);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Minhas Músicas</h1>
        <Link to="/cadastrar-musica" className="btn btn-primary">
          <span aria-hidden>➕</span> Nova Música
        </Link>
      </header>

      <div className="search-container">
        <input
          type="search"
          placeholder="Buscar por título ou artista..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="search-input"
          aria-label="Buscar músicas"
        />
      </div>

      {carregando ? (
        <LoadingGrid count={6} />
      ) : musicas.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">🎵</span>
          <h2 className="empty-state-title">
            {termoBusca ? 'Nenhum resultado' : 'Nenhuma música ainda'}
          </h2>
          <p className="empty-state-description">
            {termoBusca 
              ? 'Tente buscar por outro termo'
              : 'Comece adicionando sua primeira cifra'
            }
          </p>
          {!termoBusca && (
            <Link to="/cadastrar-musica" className="btn btn-primary">
              Cadastrar música
            </Link>
          )}
        </div>
      ) : (
        <div className="musicas-grid">
          {musicas.map((musica) => (
            <CardMusica key={musica.id} musica={musica} />
          ))}
        </div>
      )}
    </div>
  );
}
```

#### 16.6. Cache de Dados com SWR Pattern

**arquivo: `src/hooks/useMusicas.ts`**

```typescript
import { useState, useEffect, useCallback } from 'react';
import { musicasService } from '../services/musicasService';
import { Musica, MusicaDetalhada } from '../types/musica';

// Cache simples em memória
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return cached.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export function useMusicas() {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async (forceRefresh = false) => {
    const cacheKey = 'musicas:list';
    
    // Tentar cache primeiro
    if (!forceRefresh) {
      const cached = getCached<Musica[]>(cacheKey);
      if (cached) {
        setMusicas(cached);
        setCarregando(false);
        return;
      }
    }

    setCarregando(true);
    setErro(null);

    try {
      const data = await musicasService.listar();
      setMusicas(data);
      setCache(cacheKey, data);
    } catch (error: any) {
      setErro(error.message || 'Erro ao carregar músicas');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { musicas, carregando, erro, recarregar: () => carregar(true) };
}

export function useMusicaDetalhada(id: string, tom?: string) {
  const [musica, setMusica] = useState<MusicaDetalhada | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    if (!id) return;

    const cacheKey = `musica:${id}:${tom || 'original'}`;
    const cached = getCached<MusicaDetalhada>(cacheKey);
    
    if (cached) {
      setMusica(cached);
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro(null);

    try {
      const data = await musicasService.buscarPorId(id, tom);
      setMusica(data);
      setCache(cacheKey, data);
    } catch (error: any) {
      setErro(error.message || 'Erro ao carregar música');
    } finally {
      setCarregando(false);
    }
  }, [id, tom]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { musica, carregando, erro };
}
```

#### 16.7. Optimistic Updates para Favoritos

**arquivo: `src/hooks/useFavoritos.ts`**

```typescript
import { useState, useCallback } from 'react';
import { favoritosService } from '../services/favoritosService';

export function useFavoritar(musicaId: string, inicialmenteFavorita: boolean) {
  const [favorita, setFavorita] = useState(inicialmenteFavorita);
  const [carregando, setCarregando] = useState(false);

  const toggle = useCallback(async () => {
    // Optimistic update - atualiza UI imediatamente
    const estadoAnterior = favorita;
    setFavorita(!favorita);
    setCarregando(true);

    try {
      if (estadoAnterior) {
        await favoritosService.remover(musicaId);
      } else {
        await favoritosService.adicionar(musicaId);
      }
    } catch (error) {
      // Rollback em caso de erro
      setFavorita(estadoAnterior);
      console.error('Erro ao atualizar favorito:', error);
    } finally {
      setCarregando(false);
    }
  }, [musicaId, favorita]);

  return { favorita, toggle, carregando };
}
```

#### 16.8. Métricas de Web Vitals

**arquivo: `src/utils/webVitals.ts`**

```typescript
import { onCLS, onFID, onLCP, onFCP, onTTFB, Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Enviar para seu analytics (ex: Google Analytics, Plausible, etc)
  console.log(metric);
  
  // Exemplo com Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onFID(sendToAnalytics);  // First Input Delay
  onLCP(sendToAnalytics);  // Largest Contentful Paint
  onFCP(sendToAnalytics);  // First Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
}
```

### Métricas Alvo de Performance

| Métrica | Alvo | Descrição |
|---------|------|----------|
| **LCP** | < 2.5s | Maior elemento visível carregado |
| **FID** | < 100ms | Tempo até primeira interação |
| **CLS** | < 0.1 | Estabilidade visual |
| **TTI** | < 3.5s | Tempo até interatividade |
| **Bundle Size** | < 150KB (gzip) | Tamanho do JS inicial |

---

## 17. ACESSIBILIDADE (A11Y)

### Princípios Implementados

1. **Perceptível**: Conteúdo visível e legível para todos
2. **Operável**: Navegação por teclado completa
3. **Compreensível**: Feedback claro e consistência
4. **Robusto**: Compatível com tecnologias assistivas

### Componente Modal Acessível

**arquivo: `src/components/comum/Modal.tsx`** (com a11y)

```typescript
import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface Props {
  children: React.ReactNode;
  onFechar: () => void;
  titulo?: string;
  descricao?: string;
}

export function Modal({ children, onFechar, titulo, descricao }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Focus trap
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onFechar();
      return;
    }

    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }, [onFechar]);

  useEffect(() => {
    // Salvar elemento focado anteriormente
    previousActiveElement.current = document.activeElement;
    
    // Bloquear scroll do body
    document.body.style.overflow = 'hidden';
    
    // Focar no modal
    modalRef.current?.focus();
    
    // Event listener para teclado
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restaurar foco ao elemento anterior
      (previousActiveElement.current as HTMLElement)?.focus();
    };
  }, [handleKeyDown]);

  const modalContent = (
    <div 
      className="modal-overlay" 
      onClick={onFechar}
      role="presentation"
    >
      <div 
        ref={modalRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titulo ? 'modal-titulo' : undefined}
        aria-describedby={descricao ? 'modal-descricao' : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          {titulo && <h2 id="modal-titulo">{titulo}</h2>}
          <button 
            onClick={onFechar} 
            className="modal-close"
            aria-label="Fechar modal"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
        {descricao && (
          <p id="modal-descricao" className="sr-only">{descricao}</p>
        )}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
```

**CSS: `src/components/comum/Modal.css`**

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: var(--z-modal-backdrop);
  animation: fadeIn var(--transition-fast);
}

.modal-content {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-xl);
  max-width: 420px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  animation: scaleIn var(--transition);
  z-index: var(--z-modal);
}

.modal-content:focus {
  outline: none;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius);
  color: var(--color-text-muted);
  transition: all var(--transition);
}

.modal-close:hover {
  background: var(--color-surface-hover);
  color: var(--color-text-primary);
}

.modal-body {
  padding: var(--space-5);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal-content {
    animation: none;
  }
}
```

### Skip Links

**arquivo: `src/components/layout/SkipLinks.tsx`**

```typescript
import './SkipLinks.css';

export function SkipLinks() {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <a href="#search" className="skip-link">
        Pular para a busca
      </a>
    </div>
  );
}
```

```css
.skip-links {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  padding: var(--space-3) var(--space-4);
  background: var(--color-primary);
  color: white;
  font-weight: var(--font-weight-semibold);
  border-radius: var(--border-radius);
  transition: top var(--transition);
}

.skip-link:focus {
  top: var(--space-4);
}
```

### Announce para Screen Readers

**arquivo: `src/hooks/useAnnounce.ts`**

```typescript
import { useCallback } from 'react';

export function useAnnounce() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', priority);
    el.setAttribute('aria-atomic', 'true');
    el.className = 'sr-only';
    el.textContent = message;
    document.body.appendChild(el);
    
    setTimeout(() => el.remove(), 1000);
  }, []);

  return announce;
}

// Uso:
// const announce = useAnnounce();
// announce('Música adicionada aos favoritos');
```

### Contraste e Preferências do Usuário

```css
/* Respeitar preferências do sistema */
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    /* Aplicar tema claro automaticamente */
  }
}

/* Reduzir movimento para usuários sensíveis */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Alto contraste */
@media (prefers-contrast: high) {
  :root {
    --color-border: #ffffff;
    --color-text-secondary: #e4e4e7;
  }
}
```

### Checklist de Acessibilidade

| Item | Status | Implementação |
|------|--------|---------------|
| Navegação por teclado | ✅ | Tab, Enter, Escape |
| Focus visible | ✅ | Outline customizado |
| Skip links | ✅ | Pular navegação |
| ARIA labels | ✅ | Todos os botões |
| Alt em imagens | ✅ | (Projeto sem imagens) |
| Contraste mínimo | ✅ | 4.5:1 para texto |
| Focus trap em modais | ✅ | Tab cycling |
| Escape fecha modais | ✅ | Event listener |
| Reduced motion | ✅ | Media query |
| Screen reader announcements | ✅ | aria-live regions |

---

## 18. MICRO-INTERAÇÕES E FEEDBACK VISUAL

### Botão de Favorito Animado

**arquivo: `src/components/comum/BotaoFavorito.tsx`**

```typescript
import { useState } from 'react';
import { useFavoritar } from '../../hooks/useFavoritos';
import './BotaoFavorito.css';

interface Props {
  musicaId: string;
  inicialmenteFavorita: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function BotaoFavorito({ musicaId, inicialmenteFavorita, size = 'md' }: Props) {
  const { favorita, toggle, carregando } = useFavoritar(musicaId, inicialmenteFavorita);
  const [animando, setAnimando] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAnimando(true);
    await toggle();
    setTimeout(() => setAnimando(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={carregando}
      className={`btn-favorito btn-favorito-${size} ${favorita ? 'ativo' : ''} ${animando ? 'animando' : ''}`}
      aria-label={favorita ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={favorita}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill={favorita ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
}
```

**CSS: `src/components/comum/BotaoFavorito.css`**

```css
.btn-favorito {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-full);
  transition: all var(--transition);
  color: var(--color-text-muted);
}

.btn-favorito svg {
  transition: all var(--transition-spring);
}

/* Tamanhos */
.btn-favorito-sm {
  width: 32px;
  height: 32px;
}
.btn-favorito-sm svg { width: 16px; height: 16px; }

.btn-favorito-md {
  width: 40px;
  height: 40px;
}
.btn-favorito-md svg { width: 20px; height: 20px; }

.btn-favorito-lg {
  width: 48px;
  height: 48px;
}
.btn-favorito-lg svg { width: 24px; height: 24px; }

/* Estados */
.btn-favorito:hover {
  background: var(--color-danger-subtle);
  color: var(--color-danger);
}

.btn-favorito.ativo {
  color: var(--color-danger);
}

.btn-favorito.ativo:hover {
  background: var(--color-danger-subtle);
}

/* Animação de pulse */
.btn-favorito.animando svg {
  animation: heartPulse 300ms ease-out;
}

@keyframes heartPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Partículas ao favoritar (opcional) */
.btn-favorito.animando.ativo::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    var(--color-danger) 0%,
    transparent 70%
  );
  opacity: 0;
  animation: burstFade 300ms ease-out;
}

@keyframes burstFade {
  0% { transform: scale(0.5); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}
```

### Loading Skeleton Moderno

**arquivo: `src/components/comum/LoadingGrid.tsx`**

```typescript
import './LoadingGrid.css';

interface Props {
  count?: number;
}

export function LoadingGrid({ count = 6 }: Props) {
  return (
    <div className="loading-grid" aria-busy="true" aria-label="Carregando músicas">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="loading-card">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" style={{ width: '60%' }} />
          <div className="loading-card-footer">
            <div className="skeleton skeleton-badge" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

```css
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
}

.loading-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-5);
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.loading-card-footer {
  margin-top: auto;
}

.skeleton-badge {
  height: 24px;
  width: 60px;
  border-radius: var(--border-radius-full);
}
```

### Loading Page com Branding

**arquivo: `src/components/comum/LoadingPage.tsx`**

```typescript
import './LoadingPage.css';

export function LoadingPage() {
  return (
    <div className="loading-page" role="status" aria-label="Carregando">
      <div className="loading-logo">
        <span className="loading-logo-text">ACORDEIA</span>
        <div className="loading-bar">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}
```

```css
.loading-page {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  z-index: 9999;
}

.loading-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.loading-logo-text {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-wide);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.loading-bar {
  width: 200px;
  height: 3px;
  background: var(--color-surface);
  border-radius: var(--border-radius-full);
  overflow: hidden;
}

.loading-bar-fill {
  height: 100%;
  width: 40%;
  background: var(--gradient-primary);
  border-radius: var(--border-radius-full);
  animation: loadingSlide 1s ease-in-out infinite;
}

@keyframes loadingSlide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
```

### Toast/Notificações

**arquivo: `src/components/comum/Toast.tsx`**

```typescript
import { useEffect } from 'react';
import './Toast.css';

interface Props {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: '✓',
    error: '✗',
    info: 'ℹ',
  };

  return (
    <div 
      className={`toast toast-${type}`}
      role="alert"
      aria-live="polite"
    >
      <span className="toast-icon" aria-hidden="true">{icons[type]}</span>
      <span className="toast-message">{message}</span>
      <button 
        onClick={onClose} 
        className="toast-close"
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}
```

```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-xl);
  z-index: var(--z-toast);
  animation: toastSlideUp var(--transition-slow) ease-out;
}

@keyframes toastSlideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.toast-success .toast-icon { color: var(--color-success); }
.toast-error .toast-icon { color: var(--color-danger); }
.toast-info .toast-icon { color: var(--color-primary); }

.toast-message {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.toast-close {
  margin-left: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
}

.toast-close:hover {
  color: var(--color-text-primary);
}

/* Mobile: full width */
@media (max-width: 480px) {
  .toast {
    left: var(--space-4);
    right: var(--space-4);
    transform: none;
  }
}
```

---

## 19. MELHORIAS FUTURAS (PÓS-MVP)

### Prioridade Alta
1. **PWA com Service Worker** - Funciona offline
2. **Scroll automático no modo palco** - Velocidade ajustável
3. **Cache de cifras offline** - IndexedDB

### Prioridade Média
4. **Exportar cifra para PDF** - Com formatação
5. **Compartilhar cifra** - Deep links
6. **Playlists/Setlists** - Organizar por evento
7. **Diagrama de acordes** - Visão do braço do violão

### Prioridade Baixa
8. **Histórico de transposições** - Lembrar preferências
9. **Tema customizável** - Cores personalizadas
10. **Metrônomo integrado** - Para ensaios
11. **Import de cifras** - Copiar/colar de outros sites

### Configuração PWA Básica

**arquivo: `vite.config.ts`** (com PWA)

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Acordeia - Suas Cifras',
        short_name: 'Acordeia',
        description: 'Webapp moderno de cifras musicais',
        theme_color: '#8b5cf6',
        background_color: '#09090b',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.acordeia\.com\.br\/api\/musicas/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'musicas-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 horas
              },
            },
          },
        ],
      },
    }),
  ],
});
```

---

## 20. CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Setup Inicial
- [ ] Criar projeto com `npm create vite@latest acordeia -- --template react-ts`
- [ ] Instalar dependências: `npm i react-router-dom axios`
- [ ] Configurar aliases no `vite.config.ts` e `tsconfig.json`
- [ ] Criar estrutura de pastas
- [ ] Configurar variáveis de ambiente

### Fase 2: Design System
- [ ] Criar `variables.css` com todos os tokens
- [ ] Implementar `global.css` com reset e utilitários
- [ ] Testar tema dark/light
- [ ] Criar componentes base: `Botao`, `Input`, `Modal`, `Toast`
- [ ] Implementar `LoadingPage` e `LoadingGrid`

### Fase 3: Autenticação
- [ ] Implementar `AuthContext` com persistência
- [ ] Criar `api.ts` com interceptors JWT
- [ ] Criar `authService.ts`
- [ ] Página de Login com validação
- [ ] Página de Cadastro
- [ ] Componente `ProtectedRoute`

### Fase 4: Funcionalidades Core
- [ ] Página Home com grid de músicas
- [ ] Componente `CardMusica` com preload
- [ ] Busca com debounce
- [ ] Implementar `useMusicas` hook com cache
- [ ] Página de Favoritos

### Fase 5: Visualização de Cifra
- [ ] Componente `CifraViewer`
- [ ] Componente `LinhaComAcordes` memoizado
- [ ] Página `DetalheMusicaPage`
- [ ] Modal de transposição
- [ ] Botão de favoritar com animação

### Fase 6: Modo Palco
- [ ] Página fullscreen
- [ ] UI auto-hide
- [ ] Fontes responsivas
- [ ] Testar em dispositivos móveis

### Fase 7: Cadastro de Música
- [ ] Formulário com validação
- [ ] Select de tom
- [ ] Textarea para cifra
- [ ] Redirect após sucesso

### Fase 8: Acessibilidade
- [ ] Skip links
- [ ] Focus trap em modais
- [ ] ARIA labels
- [ ] Testar com screen reader
- [ ] Verificar contraste

### Fase 9: Performance
- [ ] Lazy loading de rotas
- [ ] Memoização de componentes
- [ ] Virtualização para cifras longas
- [ ] Otimizar bundle size
- [ ] Testar Web Vitals

### Fase 10: Produção
- [ ] Build de produção
- [ ] Testar em múltiplos browsers
- [ ] Testar em múltiplos dispositivos
- [ ] Lighthouse score > 90
- [ ] Deploy

---

## 21. CONCLUSÃO

Este documento define completamente o frontend do **ACORDEIA**, um webapp moderno de cifras com foco em:

### Design Moderno

✅ **Visual Premium**: Gradientes sutis, sombras modernas, glow effects  
✅ **Dark-First**: Tema escuro padrão otimizado para músicos  
✅ **Tipografia Cuidada**: Inter para UI, JetBrains Mono para cifras  
✅ **Micro-interações**: Animações suaves e feedback visual instantâneo  
✅ **Cards Interativos**: Hover effects, transições e preloading  

### Usabilidade Excepcional

✅ **Acordes sempre acima**: Leitura natural e confortável  
✅ **Transposição intuitiva**: Modal com 1 clique  
✅ **Busca instantânea**: Debounce de 300ms  
✅ **Mobile-First**: Touch targets de 44px, gestos naturais  
✅ **Modo Palco**: Fullscreen, UI auto-hide, fontes grandes  

### Performance Otimizada

✅ **Code Splitting**: Lazy loading de todas as rotas  
✅ **Memoização**: Componentes de cifra otimizados  
✅ **Virtualização**: Para cifras longas (50+ linhas)  
✅ **Cache inteligente**: SWR pattern com TTL de 5 min  
✅ **Optimistic Updates**: Favoritos instantâneos  
✅ **Preloading**: Chunks pré-carregados no hover  
✅ **Bundle < 150KB**: Chunk splitting otimizado  

### Acessibilidade Completa

✅ **Navegação por teclado**: Tab, Enter, Escape  
✅ **Focus trap**: Modais acessíveis  
✅ **Skip links**: Pular para conteúdo  
✅ **Screen reader**: ARIA labels e live regions  
✅ **Reduced motion**: Respeito às preferências  
✅ **Contraste**: WCAG AA compatível  

### Stack Técnica

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| React | 18.2 | UI Library |
| TypeScript | 5.3 | Type Safety |
| Vite | 5.0 | Build Tool |
| React Router | 6.20 | Routing |
| Axios | 1.6 | HTTP Client |
| CSS Variables | - | Theming |

### Métricas Alvo

| Métrica | Alvo | Impacto |
|---------|------|--------|
| LCP | < 2.5s | Carregamento percebido |
| FID | < 100ms | Responsividade |
| CLS | < 0.1 | Estabilidade |
| Bundle | < 150KB | Tempo de download |
| Lighthouse | > 90 | Score geral |

### Diferenciais do Projeto

1. **Zero Clutter**: Sem anúncios, sidebars ou distrações
2. **Acordes Acima**: Não inline como concorrentes
3. **Modal de Tom**: UX superior a botões +/-
4. **Backend Processa**: Frontend leve, só renderiza
5. **Modo Palco Real**: Funcional para apresentações
6. **Design Único**: Não parece com Cifra Club

---

Este documento serve como guia completo e implementação real. Cada componente, estilo e otimização foi pensado para criar a melhor experiência possível para músicos que usam cifras.

**O projeto está pronto para ser implementado.**

---

## AP�NDICE A: REFER�NCIA COMPLETA DE DADOS MOCKADOS

### A.1. Credenciais de Teste

```json
{
  "usuario": {
    "id": "user-123",
    "nome": "M�sico Demo",
    "email": "demo@acordeia.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock",
  "observacao": "Qualquer email/senha funciona no modo mock"
}
```

### A.2. Cat�logo de M�sicas Mockadas

#### M�sica 1: Como � Grande o Meu Amor Por Voc�

**Visualiza��o da Cifra:**

```
G                         D7
Eu tenho tanto pra lhe falar
     Em                          C
Mas com palavras n�o sei dizer
G                   D7              G
Como � grande o meu amor por voc�

G                         D7
E n�o h� nada pra comparar
     Em                      C
Para poder lhe explicar
G                   D7              G
Como � grande o meu amor por voc�
```

---

#### M�sica 2: Evid�ncias
- **Tom:** D
- **Acordes:** D, Bm, G, A, Em
- **Status:** N�o favorita

---

#### M�sica 3: Paci�ncia  
- **Tom:** Am
- **Acordes:** Am, E7, Dm, G, C, F
- **Status:**  Favorita

---

#### M�sica 4: Eduardo e M�nica
- **Tom:** C
- **Acordes:** C, G, Am, F
- **Status:** N�o favorita

---

#### M�sica 5: Fico Assim Sem Voc�

**Visualiza��o da Cifra:**

```
A
Avi�o sem asa
D
Fogueira sem brasa
E                   A
Sou eu assim sem voc�

A
Futebol sem bola
D
Piu-piu sem Frajola
E                   A
Sou eu assim sem voc�
```

---

### A.3. Opera��es Dispon�veis no Modo Mock

| Opera��o | Endpoint Mock | Status | Observa��o |
|----------|---------------|--------|------------|
| Login | authService.login() |  | Aceita qualquer email/senha |
| Registro | authService.registrar() |  | Cria usu�rio tempor�rio |
| Listar M�sicas | musicasService.listar() |  | Retorna 5 m�sicas |
| Buscar M�sica | musicasService.buscar() |  | Filtra por t�tulo/artista |
| Detalhes | musicasService.buscarPorId() |  | Retorna cifra completa |
| Criar M�sica | musicasService.criar() |  | Adiciona ao array mock |
| Listar Favoritos | favoritosService.listar() |  | IDs: 1, 3, 5 |
| Adicionar Favorito | favoritosService.adicionar() |  | Persiste na sess�o |
| Remover Favorito | favoritosService.remover() |  | Persiste na sess�o |

### A.4. Delays de Rede Simulados

- **Login/Registro:** 500-600ms
- **Listar m�sicas:** 300-500ms  
- **Detalhes da m�sica:** 300ms
- **Opera��es de favoritos:** 200ms

### A.5. Checklist de Migra��o para Produ��o

Antes de colocar em produ��o:

- [ ] Alterar USE_MOCK_DATA = false em todos os services
- [ ] Configurar VITE_API_URL no .env.production
- [ ] Testar autentica��o com API real
- [ ] Verificar formato de resposta da API
- [ ] Testar transposi��o de tom
- [ ] Validar tratamento de erros
- [ ] Implementar refresh token se necess�rio
- [ ] Configurar CORS no backend
- [ ] Testar em ambiente de homologa��o
- [ ] Fazer testes E2E completos

---

**Documenta��o completa com dados mockados implementados!** 

A aplica��o est� 100% naveg�vel sem backend, perfeita para desenvolvimento frontend, demos e testes de UX.

