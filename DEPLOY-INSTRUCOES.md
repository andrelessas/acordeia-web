# 🚀 Deploy Acordeia - Instruções Completas

## ✅ Correções Aplicadas

### 1. **Detecção Automática da API em Produção**
O código agora detecta automaticamente a URL da API baseado no hostname:
- Se estiver em `acordeia-web.onrender.com` → usa `https://acordeia-api.onrender.com/api`
- Se tiver `VITE_API_URL` configurada → usa ela
- Caso contrário → usa `http://localhost:5000/api` (desenvolvimento)

### 2. **Redirecionamento de Rotas (SPA)**
O arquivo `_redirects` garante que ao pressionar F5, o servidor retorna o `index.html` ao invés de 404.

---

## 🎯 Como Fazer Deploy

### **Opção 1: Deploy via Git (Recomendado)**

```bash
# 1. Adicionar alterações
git add .

# 2. Commit
git commit -m "fix: configurar detecção automática de API em produção"

# 3. Push para o repositório
git push origin main
```

✅ O Render detectará o push e fará deploy automático

---

### **Opção 2: Deploy Manual no Dashboard**

1. Acesse: https://dashboard.render.com
2. Selecione: `acordeia-web`
3. Clique em: **"Manual Deploy"**
4. Selecione: **"Deploy latest commit"**
5. Aguarde o build finalizar

---

## 🔍 Como Verificar se Funcionou

### **1. Abra o DevTools (F12)**
- Pressione `F12` no navegador
- Vá na aba **Console**

### **2. Verifique a URL da API**
Você deve ver no console:
```
🔌 API URL: https://acordeia-api.onrender.com/api
```

✅ **Se aparecer essa mensagem:** A API foi detectada corretamente!

---

### **3. Teste a Navegação**

**Teste 1 - Clique normal:**
1. Acesse: `https://acordeia-web.onrender.com/`
2. Clique em uma música
3. Deve carregar normalmente

**Teste 2 - Acesso direto + F5:**
1. Acesse diretamente: `https://acordeia-web.onrender.com/musica/algum-id`
2. Pressione **F5** (atualizar página)
3. ✅ **Deve carregar** ao invés de dar 404

**Teste 3 - Verificar requisições:**
1. Abra DevTools (F12) → Network → XHR/Fetch
2. Acesse uma música
3. Deve aparecer:
   ```
   GET https://acordeia-api.onrender.com/api/Musicas/...
   Status: 200 OK
   ```

---

## ⚙️ Configuração no Render (Opcional)

Se quiser **forçar** uma URL específica ao invés da detecção automática:

1. Dashboard do Render → `acordeia-web`
2. Environment → Add Environment Variable
3. Adicione:
   ```
   VITE_API_URL = https://acordeia-api.onrender.com/api
   ```
4. Save Changes
5. O Render fará rebuild automático

> ⚠️ **Nota:** Com a detecção automática, isso NÃO é mais necessário!

---

## 🐛 Troubleshooting

### Problema: Ainda dá 404 ao atualizar

**Solução 1: Verificar se `_redirects` está no build**
```bash
# No seu computador local
Test-Path dist\_redirects

# Deve retornar: True
```

Se retornar `False`:
```bash
# Fazer build novamente
npm run build

# Verificar novamente
Test-Path dist\_redirects
```

**Solução 2: Clear Build Cache no Render**
1. Dashboard do Render
2. Settings → Clear Build Cache & Deploy

---

### Problema: API URL incorreta no console

**Verifique no console do navegador:**
```
🔌 API URL: https://... 
```

**URLs esperadas:**

| Ambiente | URL Esperada |
|----------|-------------|
| **Produção Render** | `https://acordeia-api.onrender.com/api` |
| **Localhost** | `http://localhost:5000/api` |
| **Variável configurada** | Valor de `VITE_API_URL` |

Se a URL estiver errada:
1. Verifique o nome do serviço backend no Render
2. Se não for `acordeia-api`, configure `VITE_API_URL` manualmente

---

### Problema: CORS Error

**Erro no console:**
```
Access to XMLHttpRequest at 'https://acordeia-api.onrender.com/...' 
from origin 'https://acordeia-web.onrender.com' has been blocked by CORS
```

**Solução:** Configurar CORS no backend para aceitar:
```
https://acordeia-web.onrender.com
```

---

## 📋 Checklist Final

Antes de dar como concluído, verifique:

- [ ] Build executado localmente (`npm run build`)
- [ ] Arquivo `dist/_redirects` existe
- [ ] Commit e push feitos para o Git
- [ ] Deploy realizado no Render
- [ ] Console mostra `🔌 API URL: https://acordeia-api.onrender.com/api`
- [ ] Acesso direto à rota funciona (sem 404)
- [ ] Pressionar F5 na música funciona
- [ ] DevTools → Network mostra requisições para a API
- [ ] Status das requisições é 200 OK
- [ ] ✅ Músicas carregam corretamente

---

## 🎉 Pronto!

Se todos os itens do checklist estão marcados, o deploy está completo e funcionando!

**Próximos passos:**
- Testar cadastro de novas músicas
- Testar sistema de favoritos
- Testar transposição de tom
- Testar modo palco
