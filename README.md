# CirquloFit Web

Frontend moderno e responsivo para o sistema de gamificação de treinos CirquloFit, desenvolvido com Next.js 14 e TypeScript.

## 🚀 Características

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Framer Motion** - Animações fluidas
- **Responsivo** - Design mobile-first
- **PWA Ready** - Aplicação web progressiva

## 🎨 Design System

### Temas
- **Dark Mode** - Tema escuro com tons roxos
- **Light Mode** - Tema claro com tons lilás
- **Transição suave** entre temas
- **Persistência** das preferências

### Tipografia
- **Poppins** - Fonte principal moderna
- **Pesos:** 300, 400, 500, 600, 700
- **Responsiva** e legível

### Cores
```css
/* Dark Theme */
--primary: #8B5CF6
--secondary: #A78BFA
--background: #0F0F23
--foreground: #FFFFFF

/* Light Theme */
--primary: #7C3AED
--secondary: #8B5CF6
--background: #FFFFFF
--foreground: #1F2937
```

## 🏗️ Arquitetura

```
src/
├── app/                 # App Router (Next.js 14)
│   ├── auth/           # Páginas de autenticação
│   ├── dashboard/      # Dashboard principal
│   └── layout.tsx      # Layout raiz
├── components/         # Componentes reutilizáveis
│   ├── animations/     # Animações e transições
│   ├── charts/         # Gráficos e visualizações
│   └── dashboard/      # Componentes do dashboard
├── contexts/           # Context API (React)
├── services/           # Serviços e APIs
├── utils/              # Utilitários e helpers
└── lib/                # Configurações e bibliotecas
```

## 🎮 Funcionalidades

### Autenticação
- **Login** com email e senha
- **Registro** com validação
- **JWT** para sessões seguras
- **Logout** com limpeza de dados

### Dashboard
- **Progresso semanal** com gráficos
- **Calendário** de treinos
- **Evolução de cargas** ao longo do tempo
- **Métricas** de performance
- **Streaks** e conquistas

### Treinos
- **Criação** de treinos personalizados
- **Treinos pré-definidos** por nível
- **Sessões** de treino interativas
- **Exercícios** com GIFs demonstrativos
- **Tracking** em tempo real

### Gamificação
- **Sistema de XP** por ações
- **Níveis** progressivos com nomes criativos
- **Conquistas** e badges
- **Streaks** diários
- **Animações** de progresso

### Compartilhamento
- **Geração** de imagens de conquistas
- **Compartilhamento** em redes sociais
- **Estatísticas** visuais
- **Progresso** semanal

## 🛠️ Tecnologias

- **Next.js** 14.2.15
- **React** 18.3.1
- **TypeScript** 5.5.4
- **Tailwind CSS** 3.4.1
- **Radix UI** - Componentes
- **Framer Motion** 11.11.17
- **React Hook Form** - Formulários
- **Zod** - Validação de schemas
- **Recharts** - Gráficos
- **html2canvas** - Geração de imagens

## 🚀 Instalação e Execução

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

### Docker

```bash
# Build da imagem
docker build -t cirqulofit-web .

# Executar container
docker run -p 3000:3000 cirqulofit-web
```

## 📱 Páginas

### Autenticação
- **`/auth/login`** - Página de login
- **`/auth/register`** - Página de registro

### Dashboard
- **`/dashboard`** - Dashboard principal
- **`/dashboard/my-workouts`** - Meus treinos
- **`/dashboard/create-workout`** - Criar treino
- **`/dashboard/workout/[id]`** - Sessão de treino

## 🎯 Componentes Principais

### Header
- **Logo** e navegação
- **Toggle** de tema
- **Menu** mobile responsivo
- **Avatar** do usuário

### Dashboard
- **WeeklyProgress** - Progresso semanal
- **WeeklyCalendar** - Calendário de treinos
- **LoadEvolutionChart** - Gráfico de evolução
- **XPGuide** - Guia de XP e níveis

### Animações
- **PageTransition** - Transições entre páginas
- **LoadingSpinner** - Spinner de carregamento
- **XPAnimation** - Animação de ganho de XP

### Modais
- **ShareModal** - Compartilhamento
- **ExerciseGifModal** - GIFs de exercícios

## 🎮 Sistema de Gamificação

### XP por Ações
```typescript
const XP_REWARDS = {
  START_SESSION: 10,
  TRAIN_EXERCISE: 5,
  COMPLETE_SESSION: 20,
  DAILY_STREAK: 5
};
```

### Níveis Evolutivos
```typescript
const LEVELS = {
  1: "Ameba",      // Sedentário
  2: "Bactéria",   // Primeiros passos
  3: "Protozoário", // Ganhando forma
  4: "Inseto",     // Evoluindo
  5: "Peixe",      // Nadando bem
  6: "Réptil",     // Sangue frio
  7: "Ave",        // Voando alto
  8: "Mamífero",   // Sangue quente
  9: "Primata",    // Quase humano
  10: "Humano"     // Evolução completa
};
```

## 🎨 Animações

### Transições
- **Fade in/out** entre páginas
- **Slide** para navegação
- **Scale** para botões
- **Bounce** para notificações

### Micro-interações
- **Hover** effects em botões
- **Loading** states animados
- **Progress** bars animadas
- **XP** gain animations

## 📊 Gráficos e Visualizações

### Recharts
- **LineChart** - Evolução de cargas
- **BarChart** - Progresso semanal
- **PieChart** - Distribuição de treinos
- **Responsive** - Adaptável a mobile

### Custom Charts
- **WeeklyProgress** - Barras de progresso
- **LoadEvolution** - Linha de evolução
- **Calendar** - Calendário visual

## 🔧 Configuração

### Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=CirquloFit
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Tailwind Config

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          500: '#8b5cf6',
          900: '#4c1d95'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  }
};
```

## 📱 Responsividade

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Mobile Features
- **Touch** effects
- **Swipe** gestures
- **Responsive** navigation
- **Optimized** performance

## 🎯 Performance

### Otimizações
- **Code splitting** automático
- **Image optimization** com Next.js
- **Lazy loading** de componentes
- **Memoization** com React.memo

### Bundle Size
- **Tree shaking** automático
- **Dynamic imports** para rotas
- **Chunk splitting** otimizado

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Testes E2E
npm run test:e2e
```

## 📦 Build e Deploy

### Build de Produção
```bash
npm run build
npm start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Segurança

- **CSP** headers configurados
- **XSS** protection
- **CSRF** protection
- **Secure** cookies
- **Input** validation

## 📈 Analytics

### Métricas
- **Page views** tracking
- **User** interactions
- **Performance** metrics
- **Error** tracking

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Design:** UI/UX moderno
- **Desenvolvimento:** React/Next.js
- **Animações:** Framer Motion
- **Performance:** Otimizado

---

**CirquloFit Web** - Transformando treinos em jogos! 🎮💪