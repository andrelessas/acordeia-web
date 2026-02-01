# ✅ CHECKLIST DE DEPLOY - RENDER

## Pré-requisitos
- [ ] Código no GitHub (repositório público ou privado)
- [ ] Backend API funcionando e acessível
- [ ] Conta no Render (render.com)

---

## 📋 Passos para Deploy

### 1️⃣ Preparar Projeto
- [x] Arquivo `_redirects` criado em `public/`
- [x] Arquivo `render.yaml` criado na raiz
- [x] Arquivo `.nvmrc` com Node.js 18
- [x] Build testado localmente: `npm run build`
- [x] Pasta `dist` gerada com sucesso

### 2️⃣ Configurar no Render

**Criar novo Static Site:**
1. [ ] Acessar https://dashboard.render.com
2. [ ] Clicar em **"New +"** → **"Static Site"**
3. [ ] Conectar ao repositório GitHub
4. [ ] Selecionar branch: `main`

**Configurações:**
```
Name: acordeia-web
Build Command: npm install && npm run build
Publish Directory: dist
```

### 3️⃣ Variável de Ambiente

**No painel Environment, adicionar:**
```
Key: VITE_API_URL
Value: https://sua-api-backend.onrender.com/api
```

⚠️ **IMPORTANTE:** Use a URL completa do seu backend!

### 4️⃣ Deploy
- [ ] Clicar em **"Create Static Site"**
- [ ] Aguardar build (2-5 minutos)
- [ ] Verificar logs em caso de erro

---

## 🧪 Testes Pós-Deploy

Após deploy bem-sucedido, testar:

**Funcionalidades básicas:**
- [ ] Página inicial carrega
- [ ] Login funciona
- [ ] Registro de usuário funciona
- [ ] Listagem de músicas carrega
- [ ] Busca funciona
- [ ] Visualização de cifra funciona
- [ ] Favoritos funciona
- [ ] Modo palco funciona
- [ ] Admin pode excluir músicas

**Rotas SPA:**
- [ ] Navegar entre páginas funciona
- [ ] Recarregar página (F5) não dá 404
- [ ] Compartilhar link direto funciona

**DevTools (F12):**
- [ ] Sem erros no Console
- [ ] Requisições para API funcionam (Network)
- [ ] Sem erros CORS

---

## 🐛 Problemas Comuns

### Build falha no Render
```bash
# Teste local:
npm install
npm run build

# Se funcionar, verifique:
- package-lock.json está commitado?
- Todas as dependências estão em package.json?
```

### Página em branco
- Abrir DevTools (F12) → Console
- Verificar se há erro de CORS
- Confirmar variável VITE_API_URL no Render

### Rotas retornam 404
- Confirmar que `_redirects` está em `dist/`
- Comando para verificar:
  ```bash
  Get-ChildItem -Path dist -Recurse
  ```

### API não responde
- Backend está no ar?
- URL da API está correta?
- CORS configurado no backend?

---

## 📌 URLs de Referência

**Documentação Render:**
- https://docs.render.com/static-sites
- https://docs.render.com/deploy-vite

**Seu deploy:**
- Frontend: `https://acordeia-web.onrender.com`
- Backend: `https://sua-api.onrender.com`

---

## 🔄 Próximos Deploys

Após o primeiro deploy, todo push para `main` fará deploy automático.

**Deploy manual:**
1. Render Dashboard → Seu Static Site
2. Botão **"Manual Deploy"** → **"Deploy latest commit"**

**Limpar cache:**
1. Settings → Build & Deploy
2. **"Clear build cache"**
3. Fazer novo deploy

---

## ⏱️ Tempo Estimado

- Configuração inicial: **5-10 minutos**
- Build no Render: **2-5 minutos**
- Testes: **5-10 minutos**

**Total:** ~20 minutos

---

## 💰 Custos

**Render Free Tier:**
- ✅ Static Sites: Ilimitados
- ✅ Bandwidth: 100 GB/mês
- ✅ Build minutes: Ilimitados
- ⚠️ Sleeping após inatividade (pode configurar Keep Alive)

**Custo:** $0.00/mês

---

## 🎯 Status Final

Após completar todos os checkboxes:

- ✅ Projeto buildado localmente
- ✅ Deploy no Render configurado
- ✅ Variáveis de ambiente definidas
- ✅ Todas as funcionalidades testadas
- ✅ Pronto para MVP

**Parabéns! 🎉 Seu WebApp está no ar!**
