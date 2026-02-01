# 🔧 Configurar URL da API no Render

## ❌ Problema Atual

O frontend está tentando acessar:
```
https://acordeia-web.onrender.com/musica/6a03fb2d-3acb-4ea5-92c7-d615e5f44cdf
```

**Erro:** 404 Not Found

**Causa:** A variável `VITE_API_URL` não está configurada no Render, então o frontend está tentando buscar dados no próprio domínio ao invés de chamar a API backend.

---

## ✅ Solução

### Passo 1: Identificar a URL da sua API

Primeiro, você precisa saber qual é a URL do seu **backend** no Render.

**Exemplos:**
- `https://acordeia-api.onrender.com`
- `https://acordeia-backend.onrender.com`
- `https://seu-backend-api.onrender.com`

> ⚠️ **Importante:** A URL deve ser do **backend/API**, NÃO do frontend!

---

### Passo 2: Configurar no Painel do Render

1. **Acesse o Dashboard do Render:**
   - URL: https://dashboard.render.com

2. **Selecione o serviço do frontend:**
   - Procure por: `acordeia-web` (ou nome que você deu)

3. **Vá em Environment:**
   - Menu lateral esquerdo → **Environment**

4. **Adicione a variável de ambiente:**
   - Clique em **"Add Environment Variable"**
   - **Key (Nome):** `VITE_API_URL`
   - **Value (Valor):** `https://SEU-BACKEND.onrender.com/api`
   
   **Exemplo real:**
   ```
   VITE_API_URL=https://acordeia-api.onrender.com/api
   ```

5. **Salvar:**
   - Clique em **"Save Changes"**

6. **Deploy automático:**
   - O Render detectará a mudança e fará **rebuild automático**
   - Aguarde o build finalizar (2-5 minutos)

---

### Passo 3: Verificar se funcionou

Após o rebuild:

1. **Abra o DevTools do navegador:**
   - Pressione `F12`

2. **Vá na aba Network:**
   - Network → XHR/Fetch

3. **Acesse uma música:**
   - Vá em: `https://acordeia-web.onrender.com/`
   - Clique em uma música

4. **Verifique a requisição:**
   - Deve aparecer algo como:
   ```
   GET https://acordeia-api.onrender.com/api/Musicas/6a03fb2d-...
   Status: 200 OK
   ```

   ✅ **Se o status for 200:** Funcionou!
   ❌ **Se ainda for 404:** Verifique os passos abaixo

---

## 🔍 Troubleshooting

### Erro: Ainda retorna 404

**Possíveis causas:**

1. **URL da API incorreta:**
   - Verifique se digitou a URL correta
   - Deve terminar com `/api` (minúsculo)
   - Exemplo correto: `https://acordeia-api.onrender.com/api`

2. **Backend não está rodando:**
   - Acesse diretamente a URL da API no navegador
   - Exemplo: `https://acordeia-api.onrender.com/api/Musicas`
   - Deve retornar dados JSON

3. **CORS não configurado no backend:**
   - O backend deve permitir requisições do domínio do frontend
   - Configurar CORS para aceitar: `https://acordeia-web.onrender.com`

4. **Cache do navegador:**
   - Limpe o cache: `Ctrl + Shift + Delete`
   - Ou abra em modo anônimo: `Ctrl + Shift + N`

---

## 📋 Checklist Final

- [ ] Identifiquei a URL do meu backend
- [ ] Acessei o Dashboard do Render
- [ ] Selecionei o serviço `acordeia-web`
- [ ] Adicionei a variável `VITE_API_URL`
- [ ] Valor configurado: `https://MEU-BACKEND.onrender.com/api`
- [ ] Cliquei em "Save Changes"
- [ ] Aguardei o rebuild finalizar
- [ ] Testei acessar uma música
- [ ] Abri o DevTools (F12) → Network
- [ ] Requisição está indo para o backend correto
- [ ] Status da requisição é 200 OK
- [ ] ✅ Músicas carregam corretamente

---

## 💡 Verificação Rápida

**Como saber se está funcionando:**

### Antes da configuração:
```
❌ GET https://acordeia-web.onrender.com/musica/123
   Status: 404 Not Found
```

### Depois da configuração:
```
✅ GET https://acordeia-api.onrender.com/api/Musicas/123
   Status: 200 OK
   Response: { "id": "123", "titulo": "...", ... }
```

---

## 🎯 Resumo

**O que precisa fazer:**

1. Descobrir a URL do seu backend
2. Adicionar `VITE_API_URL` no Render (Environment)
3. Aguardar rebuild
4. Testar

**Tempo estimado:** 5-10 minutos

---

## ❓ Precisa de Ajuda?

Se ainda não funcionar, me envie:
1. URL do seu frontend (acordeia-web)
2. URL do seu backend (API)
3. Screenshot do painel Environment do Render
4. Screenshot do DevTools → Network ao acessar uma música
