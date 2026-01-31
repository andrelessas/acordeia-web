# Acordeia - Frontend

Webapp moderno de cifras musicais com React + TypeScript + Vite.

## 🚀 Quick Start - Desenvolvimento com Dados Mockados

**IMPORTANTE**: Esta aplicação funciona completamente SEM necessidade de API backend!

### 1. Instalação

```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

### 3. Acessar aplicação

Abra [http://localhost:5173](http://localhost:5173)

### 4. Login com dados mockados

- **Email**: qualquer email válido (ex: demo@acordeia.com)
- **Senha**: qualquer senha (ex: 123456)

## ✨ Recursos Disponíveis

- ✅ 5 músicas completas com cifras reais
- ✅ Sistema de autenticação mockado
- ✅ Busca por título/artista
- ✅ Visualização de cifras com acordes acima da letra
- ✅ Transposição de tom via modal
- ✅ Sistema de favoritos
- ✅ Modo palco (fullscreen)
- ✅ Cadastro de novas músicas
- ✅ Design responsivo e acessível

## 📦 Músicas Mockadas

1. **Como é Grande o Meu Amor Por Você** - Roberto Carlos (G) ⭐
2. **Evidências** - Chitãozinho & Xororó (D)
3. **Paciência** - Lenine (Am) ⭐
4. **Eduardo e Mônica** - Legião Urbana (C)
5. **Fico Assim Sem Você** - Claudinho e Buchecha (A) ⭐

## 🔄 Migrar para API Real

Quando a API backend estiver disponível:

1. Configure a URL da API no `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

2. Desative o modo mock nos services:
```typescript
// src/services/authService.ts
const USE_MOCK_DATA = false;

// src/services/musicasService.ts
const USE_MOCK_DATA = false;

// src/services/favoritosService.ts
const USE_MOCK_DATA = false;
```

3. Reinicie o servidor:
```bash
npm run dev
```

## 🏗️ Stack Tecnológica

- **React 18** - Biblioteca UI
- **TypeScript 5** - Type safety
- **Vite 5** - Build tool ultrarrápido
- **React Router 6** - Roteamento
- **Axios** - Cliente HTTP
- **CSS Variables** - Sistema de design

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── cifra/       # CifraViewer, LinhaComAcordes, ModalTransposicao
│   ├── comum/       # Loading, Modal
│   ├── layout/      # Header, Layout
│   └── musica/      # CardMusica
├── context/         # AuthContext
├── hooks/           # useDebounce
├── pages/           # Páginas da aplicação
├── services/        # Integração com API
├── styles/          # CSS global e variáveis
└── types/           # Tipos TypeScript
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Lint do código
```

## 🎨 Features de Design

- **Dark Theme First** - Tema escuro padrão
- **Acordes Acima da Letra** - Leitura natural
- **Micro-interações** - Animações suaves
- **Mobile-First** - Responsivo desde o início
- **Acessibilidade** - WCAG AA compatível

## 📱 Modo Palco

Acesse uma música e clique em "Modo Palco" para:
- Visualização fullscreen
- Fontes maiores para melhor leitura
- UI que esconde automaticamente
- Ideal para apresentações ao vivo

## 🎯 Performance

- Code splitting por rotas
- Lazy loading de componentes
- Memoização estratégica
- Bundle otimizado < 150KB
- CSS modular

## 🔐 Autenticação

Sistema de autenticação mockado com JWT simulado. Todos os dados são temporários e resetam ao recarregar a página.

Para persistência real, conecte à API backend ou implemente localStorage.

## 📝 Notas Importantes

**Os dados mockados são temporários!** Eles resetam quando você:
- Recarrega a página (F5)
- Reinicia o servidor

## 🚀 Deploy

Para build de produção:

```bash
npm run build
```

A pasta `dist/` estará pronta para deploy em:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Qualquer servidor de arquivos estáticos

## 📄 Licença

Este projeto foi criado como protótipo educacional.
