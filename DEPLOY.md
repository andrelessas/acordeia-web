# 🚀 GUIA DE DEPLOY - RENDER

## 📦 Configurações Necessárias

### **1. Criar Static Site no Render**
1. Acesse: https://render.com
2. Clique em "New +" → "Static Site"
3. Conecte seu repositório GitHub
4. Selecione o repositório `acordeia-web`

### **2. Configurar o Static Site**

**Build Command:**
```
npm install && npm run build
```

**Publish Directory:**
```
dist
```

**Branch:**
```
main
```

### **3. Configurar Variável de Ambiente**

No painel do Render, vá em **Environment** e adicione:

| Key | Value | Exemplo |
|-----|-------|---------|
| `VITE_API_URL` | URL completa da API backend | `https://sua-api.onrender.com/api` |

⚠️ **IMPORTANTE:**
- A URL da API deve ser a URL COMPLETA (incluindo https://)
- Não use `localhost` ou proxy
- Exemplo correto: `https://api-acordeia.onrender.com/api`
- Exemplo errado: `/api` ou `localhost:5000`

### **4. Deploy**

Clique em **"Create Static Site"** - o deploy começará automaticamente.

---

## ✅ Checklist Pré-Deploy

Antes de fazer o deploy, verifique:

- [ ] Build local funciona: `npm run build`
- [ ] Pasta `dist` é criada corretamente
- [ ] Arquivo `_redirects` existe em `public/`
- [ ] Backend está no ar e acessível
- [ ] URL do backend está correta

**Teste local do build:**
```bash
npm run build
npm run preview
```
Acesse: http://localhost:4173

---

## 🔧 Configuração de CORS no Backend

O backend (.NET) precisa aceitar requisições do domínio do Render.

**Exemplo de configuração (Program.cs):**
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",           // Dev
            "https://acordeia-web.onrender.com" // Produção
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

app.UseCors("AllowFrontend");
```

---

## 🐛 Troubleshooting

### **Página em branco após deploy**
1. Abra DevTools (F12) → Console
2. Verifique erros de CORS
3. Confirme se `VITE_API_URL` está configurada
4. Teste a URL da API no navegador

### **Build falha no Render**
```bash
# Verifique localmente:
npm install
npm run build

# Se funcionar local mas não no Render:
# - Verifique se package-lock.json está no Git
# - Confirme Node.js version (use .nvmrc se necessário)
```

### **Rotas retornam 404**
- Confirme que `_redirects` está em `public/`
- Verifique se o arquivo foi incluído no build (deve estar em `dist/`)

### **Variável de ambiente não carrega**
- Variáveis no Render devem começar com `VITE_`
- Após alterar variável, faça **"Manual Deploy"**
- Limpe cache: Settings → Clear build cache → Deploy

---

## 📝 Comandos Úteis

**Build local:**
```bash
npm run build
```

**Preview do build:**
```bash
npm run preview
```

**Verificar arquivos do build:**
```bash
# Windows (PowerShell)
Get-ChildItem -Recurse dist

# Linux/Mac
ls -R dist
```

---

## 🔗 URLs Importantes

**Frontend (após deploy):**
- URL será algo como: `https://acordeia-web.onrender.com`

**Backend (configure esta URL):**
- Sua API .NET deve estar em: `https://sua-api.onrender.com`

**Configuração final da variável:**
```
VITE_API_URL=https://sua-api.onrender.com/api
```

---

## ⚡ Deploy Automático

Com o `render.yaml` no repositório, todo push para `main` fará deploy automático.

**Desabilitar deploy automático:**
1. Painel do Render → Settings
2. Build & Deploy → Auto-Deploy
3. Desmarque "Auto-Deploy"

---

## 📊 Monitoramento

Após deploy, teste:
- ✅ Login/Registro
- ✅ Listagem de músicas
- ✅ Visualização de cifra
- ✅ Favoritos
- ✅ Modo palco
- ✅ Exclusão (admin)

**Logs:**
- Painel do Render → Logs
- DevTools do navegador → Network

---

## 🎯 Resumo

1. Push para GitHub
2. Conectar no Render
3. Configurar `VITE_API_URL`
4. Deploy automático
5. Testar funcionalidades

**Tempo estimado:** 5-10 minutos

**Custo:** $0 (Free Tier)
