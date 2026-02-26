# CardMarket 🃏

> Plataforma de troca de cartas colecionáveis — encontre as cartas que faltam na sua coleção e negocie com outros jogadores de forma fácil e segura.

## 🌐 Demo ao vivo

> **[▶ Acesse a demonstração em cards-marketing.vercel.app](https://cards-marketing.vercel.app/)** _(disponível por tempo limitado)_

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Deploy na Vercel](#-deploy-na-vercel)

---

## 📌 Sobre o Projeto

**CardMarket** é uma SPA (Single Page Application) desenvolvida com Vue 3 que permite a usuários autenticados gerenciar sua coleção de cartas e criar/aceitar trocas com outros membros da plataforma.

A aplicação consome a API REST [cards-marketplace-api](https://cards-marketplace-api.onrender.com) e está pronta para deploy na Vercel.

---

## 🛠 Tecnologias

| Camada           | Tecnologia                                                                  |
| ---------------- | --------------------------------------------------------------------------- |
| Framework        | [Vue 3](https://vuejs.org/) com `<script setup>`                            |
| Linguagem        | [TypeScript](https://www.typescriptlang.org/) (strict mode)                 |
| Build            | [Vite 7](https://vitejs.dev/)                                               |
| Estilização      | [Tailwind CSS v4](https://tailwindcss.com/)                                 |
| Roteamento       | [Vue Router 5](https://router.vuejs.org/)                                   |
| Estado global    | [Pinia](https://pinia.vuejs.org/)                                           |
| Requisições HTTP | [Axios](https://axios-http.com/)                                            |
| Cache / fetching | [TanStack Query (Vue Query)](https://tanstack.com/query/latest)             |
| Formulários      | [VeeValidate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/) |
| Ícones           | [Lucide Vue Next](https://lucide.dev/)                                      |

---

## ✨ Funcionalidades

- **Autenticação** — cadastro e login com JWT armazenado em cookie seguro
- **Acervo pessoal** — visualização e gerenciamento das cartas que o usuário possui
- **Biblioteca de cartas** — navegação pelo catálogo completo para adicionar cartas à coleção
- **Marketplace** — listagem pública de todas as trocas abertas na plataforma
- **Minhas trocas** — acompanhamento e exclusão de trocas criadas pelo usuário
- **Criar troca** — interface para oferecer cartas próprias em troca de cartas desejadas
- **Guardas de rota** — rotas privadas redirecionam para `/login` quando não autenticado

---

## 📂 Estrutura do Projeto

```
src/
├── assets/            # Arquivos estáticos (imagens, fontes)
├── components/        # Componentes reutilizáveis globais
│   ├── layout/        # Navbar, Footer, etc.
│   └── ui/            # Componentes de UI genéricos (Input, Button, etc.)
├── composables/       # Composables utilitários compartilhados
├── features/          # Funcionalidades organizadas por domínio
│   ├── auth/          # Login, registro, store de autenticação
│   ├── cards/         # Acervo e biblioteca de cartas
│   └── trades/        # Marketplace, minhas trocas e criação de trocas
├── lib/               # Instância do Axios, cookies, tratamento de erros
├── router/            # Definição das rotas e guardas de navegação
└── main.ts            # Ponto de entrada da aplicação
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- npm 9+

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/marketplace.git
cd marketplace

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL da sua API

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Scripts disponíveis

| Comando           | Descrição                                    |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento         |
| `npm run build`   | Gera o bundle de produção em `/dist`         |
| `npm run preview` | Pré-visualiza o build de produção localmente |
| `npm run format`  | Formata o código com Prettier                |

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
# URL base da API REST
VITE_API_BASE_URL=<adicione a URL da sua API>
```

> **Atenção:** O prefixo `VITE_` é obrigatório para que as variáveis fiquem acessíveis no código cliente via `import.meta.env`.

---

## ☁️ Deploy na Vercel

O projeto está configurado para deploy na Vercel via `vercel.json`. As rotas do Vue Router são corretamente redirecionadas para `index.html`, evitando erros 404 ao recarregar a página.

### Passo a passo

1. Importe o repositório em [vercel.com/new](https://vercel.com/new)
2. A Vercel detecta automaticamente o Vite. Confira as configurações:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Adicione a variável de ambiente no painel:
   - `VITE_API_BASE_URL` → URL da sua API
4. Clique em **Deploy** ✅

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
