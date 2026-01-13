# 🏢 Sistema de Cadastro de Funcionários

![Nuxt](https://img.shields.io/badge/Nuxt-4.0-00C58E?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

> Um sistema moderno e completo para gerenciamento de funcionários com autenticação segura, interface responsiva e operações CRUD completas.

## 📋 Sumário

- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [📦 Instalação](#-instalação)
- [⚙️ Configuração](#️-configuração)
- [🚀 Como Usar](#-como-usar)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎨 Interface](#-interface)
- [🧠 Metodologia de Desenvolvimento](#-metodologia-de-desenvolvimento)


## ✨ Funcionalidades

### 🔐 **Autenticação Segura**
- ✅ Sistema de login e registro
- ✅ Proteção de rotas com middleware
- ✅ Gerenciamento de sessões
- ✅ Logout seguro

### 👥 **Gerenciamento de Funcionários**
- ✅ **Criar** - Cadastro de novos funcionários
- ✅ **Visualizar** - Listagem em tabela responsiva
- ✅ **Editar** - Atualização de dados existentes
- ✅ **Deletar** - Remoção com confirmação segura

### 🎨 **Interface Moderna**
- ✅ Design responsivo para desktop e mobile
- ✅ Tema dark com cores personalizadas
- ✅ Componentes reutilizáveis
- ✅ Toast notifications para feedback
- ✅ Modal de confirmação para ações críticas

### 🔧 **Características Técnicas**
- ✅ TypeScript para type safety
- ✅ Validação de formulários
- ✅ Estados de loading
- ✅ Tratamento robusto de erros
- ✅ Cache híbrido para performance

## 🛠️ Tecnologias

### **Frontend**
- **[Nuxt 4](https://nuxt.com/)** - Framework Vue.js full-stack
- **[Vue.js 3](https://vuejs.org/)** - Framework reativo progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript tipado
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Headless UI](https://headlessui.com/)** - Componentes sem estilo

### **Backend & Database**
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
  - Authentication
  - PostgreSQL Database
  - Real-time subscriptions

### **Bibliotecas Adicionais**
- **[vue-toastification](https://github.com/Maronato/vue-toastification)** - Toast notifications
- **[Vite](https://vitejs.dev/)** - Build tool

## 📦 Instalação

### **Pré-requisitos**
- Node.js 18+ 
- npm, pnpm, yarn ou bun

### **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/sistema-cadastro.git
cd sistema-cadastro
```

### **2. Instale as dependências**
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## ⚙️ Configuração

### **1. Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

### **2. Preencha as credenciais do Supabase**
```env
SUPABASE_URL=sua_url_do_supabase_aqui
SUPABASE_KEY=sua_chave_publica_do_supabase_aqui
```

### **3. Configure o banco de dados**
Execute no SQL Editor do Supabase:

**1. Criar tabela de funcionários:**
```sql
CREATE TABLE public.funcionarios (
  id SERIAL NOT NULL,
  nome TEXT NOT NULL,
  cargo TEXT NOT NULL,
  endereco TEXT NULL,
  email TEXT NOT NULL,
  salario NUMERIC(10, 2) NOT NULL,
  CONSTRAINT funcionarios_pkey PRIMARY KEY (id),
  CONSTRAINT funcionarios_email_key UNIQUE (email)
) TABLESPACE pg_default;
```

**2. Habilitar Row Level Security:**
```sql
-- Habilitar Row Level Security
ALTER TABLE funcionarios ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso (usuários autenticados)
CREATE POLICY "Usuários podem ver funcionários" ON funcionarios 
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem inserir funcionários" ON funcionarios 
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem atualizar funcionários" ON funcionarios 
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários podem deletar funcionários" ON funcionarios 
FOR DELETE USING (auth.role() = 'authenticated');
```

**3. Inserir dados de exemplo (opcional):**
```sql
INSERT INTO funcionarios (nome, cargo, endereco, email, salario)
VALUES
('Ana Paula Rodrigues', 'Assistente Administrativo', 'Rua São Jorge, 410 - Curitiba/PR', 'ana.rodrigues@empresa.com', 3200.00),
('Felipe Martins Azevedo', 'Designer UX/UI', 'Av. Paulista, 1578 - São Paulo/SP', 'felipe.azevedo@empresa.com', 5800.00),
('Juliana Ferreira Pires', 'Analista Financeiro', 'Rua Sete de Setembro, 990 - Porto Alegre/RS', 'juliana.pires@empresa.com', 6100.00),
('Bruno Almeida Nogueira', 'Coordenador de TI', 'Av. Dom Pedro II, 230 - Campinas/SP', 'bruno.nogueira@empresa.com', 8900.00),
('Patricia Gomes Leal', 'Recursos Humanos', 'Rua das Acácias, 75 - Goiânia/GO', 'patricia.leal@empresa.com', 4700.00);
```

## 🚀 Como Usar

### **Desenvolvimento**
```bash
# Inicia o servidor de desenvolvimento em http://localhost:3000
npm run dev
```

### **Produção**
```bash
# Build da aplicação
npm run build

# Preview do build
npm run preview
```

### **Fluxo de Uso**

1. **Acesse** `http://localhost:3000`
2. **Crie uma conta** ou faça login
3. **Gerencie funcionários**:
   - Clique em "Novo Cadastro" para adicionar
   - Use os botões "Editar" e "Deletar" na tabela
   - Confirme ações destrutivas no modal

## 📁 Estrutura do Projeto

```
sistema-cadastro/
├── 📁 app/
│   ├── 📁 components/          # Componentes reutilizáveis
│   │   ├── Base*.vue          # Componentes base (Button, Input, etc.)
│   │   ├── The*.vue           # Layout components
│   │   └── *.vue              # Componentes específicos
│   ├── 📁 composables/        # Lógica reutilizável
│   │   ├── useAuth.ts         # Autenticação
│   │   ├── useFuncionarios.ts # CRUD funcionários
│   │   └── useNotifications.ts # Toast notifications
│   ├── 📁 layouts/            # Layouts da aplicação
│   ├── 📁 middleware/         # Middleware de rotas
│   ├── 📁 pages/              # Páginas/rotas
│   ├── 📁 plugins/            # Plugins do Nuxt
│   └── 📁 types/              # Definições TypeScript
├── 📁 public/                 # Assets estáticos
├── 📄 .env.example           # Template de variáveis
├── 📄 nuxt.config.ts         # Configuração do Nuxt
├── 📄 tailwind.config.js     # Configuração do Tailwind
└── 📄 package.json           # Dependências e scripts
```

## 🎨 Interface

### **Paleta de Cores**
- **Primary**: Gradiente laranja (#FF8C00, #FF4500)
- **Background**: Dark theme (#0F172A, #1E293B)
- **Text**: Hierarquia clara de cores
- **Accent**: Laranja vibrante para CTAs

### **Componentes Principais**
- 🔘 **BaseButton** - Botão com múltiplas variantes
- 📝 **BaseInput** - Input com validação
- 📋 **BaseDropdown** - Dropdown customizado
- 🔔 **Toast System** - Notificações elegantes
- 🗂️ **Modal System** - Confirmações seguras

## 🧠 Metodologia de Desenvolvimento

Este projeto foi desenvolvido utilizando:
- **AI-Assisted Development** para otimização e boas práticas
- **Arquitetura componentizada** para máxima reutilização
- **TypeScript-first** approach para type safety
- **Design patterns modernos** (Composables, SFC, etc.)

---

<div align="center">
  <p>Desenvolvido por Nicholas</p>
</div>
