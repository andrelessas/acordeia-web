# 🔧 Configurar URL da API - Solução Genérica

## ✅ Solução Implementada

O sistema agora usa uma abordagem **genérica** com 3 níveis de configuração:

### **Prioridade (ordem de verificação):**

1. **config.js** (runtime - pode modificar SEM rebuild) 🎯 **Recomendado**
2. **VITE_API_URL** (build time - requer rebuild)
3. **localhost:5000** (fallback desenvolvimento)

---

## 🎯 Opção 1: Configurar config.js (SEM rebuild)

**Vantagem:** Pode modificar a URL da API **sem precisar fazer rebuild**!

### **Após o primeiro deploy:**

1. **Acesse o servidor via SSH/Shell** (no Render, use o Web Shell)
2. **Edite o arquivo:**
   ```bash
   nano dist/config.js
   # ou use o editor que preferir
   ```

3. **Modifique a configuração:**
   ```javascript
   window.APP_CONFIG = {
     API_URL: 'https://acordeia-api.onrender.com/api',
   };
   ```

4. **Salve o arquivo**
5. **Teste imediatamente** (sem rebuild!)

---

## 🎯 Opção 2: Configurar no .env.production (COM rebuild)

**Vantagem:** Fica versionado no Git

### **No arquivo `.env.production`:**

```env
VITE_API_URL=https://acordeia-api.onrender.com/api
```

### **Fazer commit:**
```bash
git add .env.production
git commit -m "config: adicionar URL da API"
git push origin main
```

O Render fará rebuild automático.

---

## 🎯 Opção 3: Configurar no Render (COM rebuild)

**Vantagem:** Não expõe a URL no código

1. **Dashboard do Render** → `acordeia-web`
2. **Environment** → Add Environment Variable
3. **Adicione:**
   ```
   VITE_API_URL = https://acordeia-api.onrender.com/api
   ```
4. **Save Changes**
5. Aguarde rebuild

---

## 🔍 Como Verificar se Está Funcionando

Abra o **Console do navegador** (F12):

```
🔌 API URL: https://acordeia-api.onrender.com/api
```

Se aparecer essa mensagem, está configurado corretamente! ✅

---

## 💡 Qual opção escolher?

| Situação | Recomendação |
|----------|-------------|
| **Desenvolvimento local** | Não precisa configurar (usa localhost:5000) |
| **Primeiro deploy** | Use Opção 2 (.env.production) |
| **Já está no ar e quer mudar API** | Use Opção 1 (config.js sem rebuild) |
| **Quer manter URL secreta** | Use Opção 3 (Render Environment) |

---

## 📝 Resumo

✅ **Genérico**: Funciona em qualquer plataforma (Render, Vercel, Netlify, etc)  
✅ **Flexível**: 3 formas diferentes de configurar  
✅ **Sem hardcode**: Nenhuma validação de domínio específico  
✅ **Runtime config**: Pode mudar sem rebuild (Opção 1)  

---

## 🐛 Troubleshooting

### URL errada no console?

Verifique a ordem de prioridade:
1. Abra `dist/config.js` → se tiver URL, é essa que será usada
2. Se não, verifica `VITE_API_URL` no build
3. Se não, usa `localhost:5000`

### Como resetar para padrão?

**Opção 1:**
```javascript
// dist/config.js
window.APP_CONFIG = {
  API_URL: '', // Vazio = usa VITE_API_URL
};
```

**Opção 2:**
```bash
# Remover variável de ambiente
rm .env.production
```
