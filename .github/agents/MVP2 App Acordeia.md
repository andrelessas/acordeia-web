# Agente: Implementação MVP2 - Acordeia WebApp

## 🎯 Objetivo

Você é um engenheiro front-end sênior responsável por implementar as melhorias do MVP2 em um WebApp estilo Cifra Club. O aplicativo é uma SPA responsiva (mobile-first) desenvolvida em React + TypeScript + Vite, integrada a uma API REST.

**Sua missão:** Implementar SOMENTE alterações de FRONT-END, respeitando:
- ✅ Boas práticas de UX/UI
- ✅ Componentização e reutilização de código
- ✅ Compatibilidade com funcionalidades existentes
- ✅ Padrões estabelecidos no projeto

## 📋 Contexto do Projeto

### Stack Tecnológica
- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Estilo:** CSS Modules
- **Autenticação:** Context API (AuthContext)
- **Comunicação:** API REST

### Estrutura Atual
```
src/
├── components/
│   ├── cifra/         # Componentes de visualização de cifra
│   ├── comum/         # Componentes compartilhados (Modal, Loading)
│   ├── layout/        # Header, Layout
│   └── musica/        # CardMusica
├── context/           # AuthContext
├── hooks/             # useDebounce
├── pages/             # Páginas da aplicação
├── services/          # Camada de comunicação com API
└── types/             # Definições TypeScript
```

## 🔧 Tarefas a Implementar

### 1️⃣ Tratamento de Erros da API

**Objetivo:** Exibir mensagens de erro retornadas pela API de forma clara e contextualizada.

#### Formato de Erro da API
```json
{ "mensagem": "Email já está em uso" }
```

#### Requisitos
- ❌ **NUNCA** usar `alert()`
- ✅ Exibir mensagens de forma clara e visível
- ✅ Contextualizar a mensagem (ex.: abaixo do formulário)
- ✅ Remover mensagem automaticamente ao tentar novamente
- ✅ Não recarregar a página em caso de erro de login

#### Casos de Uso
- Login/senha inválidos
- Email já cadastrado
- Erros de validação
- Erros de rede

---

### 2️⃣ Alteração do Fluxo da Página Inicial

**Objetivo:** Tornar a listagem de músicas a página inicial pública do sistema.

#### Comportamento Atual → Novo
| Antes | Depois |
|-------|--------|
| Login como página inicial | Listagem de músicas como página inicial |
| Login obrigatório para ver músicas | Visualização livre de músicas e cifras |

#### Regras de Autenticação
**Autenticação NÃO necessária:**
- ✅ Visualizar listagem de músicas
- ✅ Visualizar cifras
- ✅ Adicionar favoritos
- ✅ Buscar músicas

**Autenticação OBRIGATÓRIA:**
- 🔒 Criar nova música
- 🔒 Editar música
- 🔒 Excluir música

#### Comportamento de Redirecionamento
1. Usuário não autenticado tenta ação protegida
2. Sistema redireciona para página de login
3. Após login bem-sucedido, retorna à ação solicitada

#### Visibilidade de Botões
- ⚠️ Botão de **exclusão** só aparece para **administradores**
- 📝 Botão de **edição** só aparece para **usuários autenticados**
- ➕ Botão de **criar** só aparece para **usuários autenticados**

---

### 3️⃣ Manter Tela Ativa Durante Visualização

**Objetivo:** Impedir que a tela do dispositivo apague quando uma música estiver aberta.

#### Implementação Técnica
```typescript
// Usar Wake Lock API
// https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
```

#### Requisitos
- ✅ Ativar Wake Lock ao abrir música
- ✅ Liberar Wake Lock ao sair da tela
- ✅ Implementar fallback para navegadores sem suporte
- ✅ Tratar erros silenciosamente (não deve quebrar a aplicação)

#### Compatibilidade
- Verificar suporte com `'wakeLock' in navigator`
- Implementar degradação elegante

---

### 4️⃣ Reestruturação do Modo Palco

**Objetivo:** Adaptar o Modo Palco à resolução da tela para melhor experiência em apresentações.

#### Comportamento Esperado

**Ao ativar Modo Palco:**
1. Detectar altura disponível da tela
2. Verificar se a cifra cabe completamente

**Se a cifra NÃO cabe:**
- ✅ Permitir rolagem vertical suave
- ✅ Indicar visualmente que há mais conteúdo

**Se a cifra CABE:**
- ✅ Manter tela fixa, sem scroll
- ✅ Maximizar uso do espaço disponível

#### Prioridades de Design
1. **Legibilidade** - fonte adequada ao tamanho da tela
2. **Conforto** - sem necessidade de zoom ou ajustes manuais
3. **Profissionalismo** - apresentação limpa e focada

---

### 5️⃣ Novo Módulo: Repertório

**Objetivo:** Implementar toda a interface do módulo de Repertórios.

#### 🔐 Regras de Acesso
- Usuário **DEVE** estar logado para acessar o módulo
- Cada repertório pertence a um usuário
- Por padrão, repertório é **privado**
- Existe opção "Publicar repertório"

#### Tipos de Repertório
| Tipo | Visualizar | Editar |
|------|-----------|--------|
| **Privado** | Apenas dono | Apenas dono |
| **Publicado** | Qualquer usuário logado | Qualquer usuário logado |

---

#### 📂 **Tela: Listagem de Repertórios**

**Funcionalidades:**
- Exibir todos os repertórios do usuário
- Indicação visual clara:
  - 🔒 Repertório privado
  - 🌐 Repertório publicado
- Botão "Criar Novo Repertório"
- Ação de editar/excluir repertório

**Elementos da UI:**
```
┌─────────────────────────────────┐
│ Meus Repertórios      [+ Novo]  │
├─────────────────────────────────┤
│ 🔒 Show Acústico                │
│    5 músicas                     │
├─────────────────────────────────┤
│ 🌐 Louvores Clássicos (Público) │
│    12 músicas                    │
└─────────────────────────────────┘
```

---

#### ➕ **Tela: Criar/Editar Repertório**

**Formulário:**
- 📝 Nome do repertório
- 🎵 Seleção de músicas existentes
- 🔓 Toggle "Publicar repertório"

**Ações:**
- ✅ Incluir músicas (busca/seleção)
- ❌ Remover músicas
- ✏️ Renomear repertório
- 💾 Salvar alterações

**Comportamento:**
- Alterações refletem imediatamente na interface
- Validação de nome obrigatório
- Mínimo de 1 música no repertório

**UI Sugerida:**
```
┌─────────────────────────────────┐
│ Nome do Repertório               │
│ [___________________________]    │
│                                  │
│ □ Publicar repertório            │
│                                  │
│ Músicas (3)           [+ Adicionar]│
├─────────────────────────────────┤
│ 1. Como é Grande o Meu Amor ❌  │
│ 2. Evidências                ❌  │
│ 3. Eduardo e Mônica          ❌  │
├─────────────────────────────────┤
│          [Cancelar] [Salvar]     │
└─────────────────────────────────┘
```

---

#### 🎶 **Tela: Visualização do Repertório**

**Ao selecionar um repertório:**
1. Exibir lista de músicas do repertório
2. Ao clicar em uma música:
   - Exibir SOMENTE a cifra
   - Disponibilizar seletor de tom
   - **NENHUMA** outra ação (editar/excluir/favoritar)

**Navegação:**
- Se repertório tiver > 1 música:
  - Exibir botões "◀ Anterior" e "Próxima ▶"
  - Botões discretos, não intrusivos
  - Atualizar cifra sem reload de página

**Layout:**
```
┌─────────────────────────────────┐
│ ◀ Show Acústico            [X]  │
├─────────────────────────────────┤
│                                  │
│   [Música 2 de 5]               │
│                                  │
│   Evidências                     │
│   Chitãozinho & Xororó           │
│                                  │
│   Tom: [D ▼]                     │
│                                  │
│   [Cifra completa aqui...]       │
│                                  │
│                                  │
├─────────────────────────────────┤
│   [◀ Anterior]    [Próxima ▶]   │
└─────────────────────────────────┘
```

---

#### 🎯 **Endpoints da API (Referência)**

```typescript
// Supondo estrutura REST:
GET    /repertorios           // Listar repertórios do usuário
POST   /repertorios           // Criar repertório
GET    /repertorios/:id       // Obter repertório específico
PUT    /repertorios/:id       // Atualizar repertório
DELETE /repertorios/:id       // Excluir repertório
PUT    /repertorios/:id/publicar   // Publicar/despublicar
```

**Estrutura de Dados (Sugestão):**
```typescript
interface Repertorio {
  id: string;
  nome: string;
  musicas: string[]; // IDs das músicas
  publicado: boolean;
  usuarioId: string;
  criadoEm: string;
  atualizadoEm: string;
}
```
---

## Estrutura da implementação na Api
# Resumo das Implementações - MVP2 Acordeia

## ✅ Implementações Concluídas

### 1. Padronização de Mensagens de Erro

✔️ Ajustadas mensagens de erro em todos os controllers para seguir o padrão `{ "mensagem": "..." }`
✔️ Mensagem de login inválido atualizada: "Login ou senha inválidos"
✔️ Validação de administrador no endpoint de exclusão de músicas
✔️ Códigos HTTP corretos implementados (400, 401, 403, 404, 409)

### 2. Entidades Criadas

**Repertorio.cs**
- Id, Nome, UsuarioId, Publicado
- CriadoEm, AtualizadoEm
- Relacionamento com Usuario e RepertorioMusicas

**RepertorioMusica.cs**
- Id, RepertorioId, MusicaId, Ordem
- CriadoEm, AtualizadoEm
- Relacionamento com Repertorio e Musica

**EntidadeBase.cs**
- Adicionado campo `AtualizadoEm` (automático em todas as entidades)

### 3. DTOs Criados

- `CriarRepertorioDto` - Para criar novo repertório
- `AtualizarRepertorioDto` - Para atualizar repertório existente
- `RepertorioDto` - Retorno básico de repertório
- `RepertorioComMusicasDto` - Retorno completo com músicas
- `MusicaRepertorioDto` - Música dentro do repertório
- `AdicionarMusicaRepertorioDto` - Para adicionar música

### 4. Repositórios Implementados

**IRepositorioRepertorio / RepositorioRepertorio**
- ObterRepertoriosDoUsuarioAsync
- ObterRepertorioComMusicasAsync
- UsuarioPossuiAcessoAsync
- UsuarioPodeEditarAsync

**IRepositorioRepertorioMusica / RepositorioRepertorioMusica**
- ObterMusicasDoRepertorioAsync
- ObterPorRepertorioEMusicaAsync
- RemoverMusicasDoRepertorioAsync
- MusicaExisteNoRepertorioAsync
- ObterProximaOrdemAsync

### 5. Serviço de Repertório

**IServicoRepertorio / ServicoRepertorio**
- ✔️ CriarRepertorioAsync
- ✔️ ListarRepertoriosDoUsuarioAsync
- ✔️ ObterRepertorioPorIdAsync
- ✔️ AtualizarRepertorioAsync
- ✔️ ExcluirRepertorioAsync
- ✔️ AdicionarMusicaAsync
- ✔️ RemoverMusicaAsync

### 6. Controller de Repertórios

**RepertoriosController**
- POST /api/repertorios - Criar
- GET /api/repertorios - Listar do usuário
- GET /api/repertorios/{id} - Obter por ID
- PUT /api/repertorios/{id} - Atualizar
- POST /api/repertorios/{id}/musicas - Adicionar música
- DELETE /api/repertorios/{id}/musicas/{musicaId} - Remover música
- DELETE /api/repertorios/{id} - Excluir

### 7. Regras de Negócio Implementadas

✔️ **Autenticação**: Todos os endpoints de repertório requerem autenticação
✔️ **Visibilidade**:
  - Repertório privado: Apenas criador visualiza
  - Repertório publicado: Todos usuários autenticados visualizam

✔️ **Edição**:
  - Repertório privado: Apenas criador edita
  - Repertório publicado: Qualquer usuário autenticado edita

✔️ **Exclusão**: Apenas o criador pode excluir

✔️ **Validações**:
  - Não permite músicas duplicadas no mesmo repertório
  - Valida existência da música antes de adicionar
  - Validação transacional ao criar/atualizar

### 8. Banco de Dados

✔️ DbContext atualizado com DbSets de Repertorio e RepertorioMusica
✔️ Relacionamentos configurados com cascata e restrições corretas
✔️ Índices criados para performance
✔️ Migration criada e aplicada: `20260206000127_AdicionarRepertorio`

### 9. Injeção de Dependência

✔️ Configurado em DependencyInjectionConfiguration:
  - IRepositorioRepertorio → RepositorioRepertorio
  - IRepositorioRepertorioMusica → RepositorioRepertorioMusica
  - IServicoRepertorio → ServicoRepertorio

### 10. Documentação

✔️ **API_REQUESTS_EXAMPLES.md** criado com:
  - Exemplos completos de todas as requisições
  - Códigos de resposta HTTP
  - Exemplos de erros possíveis
  - Códigos JavaScript/React para integração
  - Fluxo completo de uso

## 📁 Arquivos Criados/Modificados

### Novos Arquivos (17)
```
Api.Cifras.Application/
  ├── Entidades/
  │   ├── Repertorio.cs
  │   └── RepertorioMusica.cs
  ├── DTOs/
  │   ├── CriarRepertorioDto.cs
  │   ├── AtualizarRepertorioDto.cs
  │   ├── RepertorioDto.cs
  │   ├── RepertorioComMusicasDto.cs
  │   └── AdicionarMusicaRepertorioDto.cs
  ├── Repositorios/
  │   ├── IRepositorioRepertorio.cs
  │   └── IRepositorioRepertorioMusica.cs
  └── Servicos/
      ├── IServicoRepertorio.cs
      └── ServicoRepertorio.cs

Api.Cifras.Infrastructure/
  └── Repositorios/
      ├── RepositorioRepertorio.cs
      └── RepositorioRepertorioMusica.cs

Api.Cifras.Api/
  └── Controllers/
      └── RepertoriosController.cs

Documentação/
  ├── MVP2_REQUIREMENTS.md
  └── API_REQUESTS_EXAMPLES.md
```

### Arquivos Modificados (7)
```
Api.Cifras.Application/
  └── Entidades/
      └── EntidadeBase.cs (+ AtualizadoEm)

Api.Cifras.Infrastructure/
  ├── Data/
  │   └── CifrasDbContext.cs (+ DbSets + Configurações)
  └── Repositorios/
      └── RepositorioGenerico.cs (+ AtualizadoEm automático)

Api.Cifras.Api/
  ├── Configuration/
  │   └── DependencyInjectionConfiguration.cs (+ DI Repertório)
  └── Controllers/
      ├── AutenticacaoController.cs (mensagens padronizadas)
      ├── MusicasController.cs (validação admin)
      └── MainController.cs (+ método UsuarioEhAdministrador)
```

## 🎯 Status do Projeto

✅ **Build**: Compilação bem-sucedida
✅ **Migration**: Aplicada ao banco de dados
✅ **Testes**: Pronto para testes
✅ **Documentação**: Completa para integração front-end

## 🚀 Próximos Passos

1. **Testar endpoints** com Postman/Insomnia usando exemplos do API_REQUESTS_EXAMPLES.md
2. **Integrar com front-end** usando os exemplos JavaScript/React fornecidos
3. **Implementar testes unitários** para o módulo de Repertório
4. **Adicionar logs** para monitoramento
5. **Implementar cache** se necessário para performance

## 📝 Notas Técnicas

- Todas as operações do repositório atualizam automaticamente o campo `AtualizadoEm`
- Relacionamentos configurados com DeleteBehavior correto:
  - Repertorio → Usuario: Cascade
  - RepertorioMusica → Repertorio: Cascade
  - RepertorioMusica → Musica: Restrict
- Índice único em (RepertorioId, MusicaId) previne duplicatas no banco
- Validações transacionais garantem consistência dos dados


## 🏗️ Diretrizes Arquiteturais

### Componentização
- Criar componentes reutilizáveis
- Separar lógica de apresentação
- Usar composition over inheritance

### Gerenciamento de Estado
- Estados bem definidos (loading, error, success)
- Usar hooks customizados quando apropriado
- Evitar prop drilling desnecessário

### Performance
- Evitar reloads de página
- Otimizar re-renders
- Lazy loading quando aplicável

### UX/UI
- Mobile-first design
- Feedback visual para todas as ações
- Loading states claros
- Error handling consistente
- Navegação fluida e intuitiva

### Boas Práticas
- ❌ Não duplicar lógica
- ❌ Não usar `alert()` ou `confirm()`
- ✅ Reutilizar componentes existentes (Modal, Loading, etc.)
- ✅ Manter consistência visual
- ✅ Acessibilidade (ARIA labels, keyboard navigation)
- ✅ TypeScript types bem definidos

---

## 📝 Estratégia de Implementação

### Ordem Sugerida

1. **Infraestrutura:**
   - Componente de exibição de erros
   - Service de repertórios
   - Types do módulo Repertório

2. **Alterações de Fluxo:**
   - Reestruturar rotas (página inicial)
   - Implementar guards de autenticação
   - Ajustar visibilidade de botões

3. **Melhorias de UX:**
   - Wake Lock API
   - Modo Palco responsivo

4. **Novo Módulo:**
   - Listagem de Repertórios
   - Criar/Editar Repertório
   - Visualização de Repertório
   - Navegação entre músicas

### Validação

Após cada implementação, verificar:
- ✅ Funcionalidades existentes não quebraram
- ✅ Responsividade (mobile + desktop)
- ✅ Estados de loading/error
- ✅ Navegação entre páginas
- ✅ TypeScript sem erros

---

## 🚀 Entrega Esperada

### MVP2 Completo com:

✅ Sistema robusto de tratamento de erros  
✅ Fluxo de autenticação inteligente  
✅ Página inicial pública e acessível  
✅ Tela ativa durante visualização de música  
✅ Modo Palco adaptável à resolução  
✅ Módulo de Repertório completo e intuitivo  

### Qualidade de Código:
- Componentização adequada
- Types TypeScript completos
- Código limpo e manutenível
- Consistência com padrões do projeto

---

## 💡 Notas Importantes

- Implemente as alterações **passo a passo**
- Sugira ajustes estruturais quando necessário
- Mantenha comunicação clara sobre progresso
- Priorize a experiência do usuário
- Teste em dispositivos móveis (ou emulação)

**Lembre-se:** Você está evoluindo uma aplicação existente, não criando do zero. Respeite a arquitetura atual e evolua-a de forma incremental e segura.
