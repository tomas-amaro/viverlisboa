# Viver Lisboa - Site de Campanha Política

Um site moderno de campanha política desenvolvido em React/Next.js com gestão de conteúdo através de Sanity CMS. Suporta múltiplas campanhas (Viver Lisboa, Viver Avenidas, Viver Alvalade, etc.) através de configuração por domínio.

## 🚀 Características

- **Design System Completo**: Baseado na identidade visual da campanha com cores e tipografia oficiais
- **CMS Dinâmico**: Gestão completa de conteúdo através de Sanity
- **Multi-domínio**: Suporte para diferentes campanhas em domínios específicos
- **SEO Otimizado**: Meta tags, structured data, sitemaps e otimizações de performance
- **Responsive**: Design totalmente adaptativo para todos os dispositivos
- **Acessibilidade**: Componentes acessíveis com navegação por teclado e leitores de ecrã
- **Performance**: Otimizado para carregamento rápido e boa experiência do utilizador

## 🛠 Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Styled Components com design system personalizado
- **CMS**: Sanity.io para gestão de conteúdo
- **Animações**: Framer Motion
- **Deployment**: Vercel (recomendado)

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd viver-lisboa-website
```

2. **Instalar dependências**
```bash
pnpm install
```

3. **Configurar variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://viverlisboa.pt

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Social Media
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/viverlisboa
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/viverlisboa
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/viverlisboa
```

4. **Configurar Sanity**
```bash

# Fazer login no Sanity
pnpm sanity login

# Inicializar projeto Sanity (se ainda não existir)
pnpm sanity init

# Executar Sanity Studio
pnpm sanity dev
```

5. **Executar em desenvolvimento**
```bash
pnpm run dev
```

O site estará disponível em `http://localhost:3000` e o Sanity Studio em `http://localhost:3333`.

## 🏗 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/               # Componentes base do design system
│   ├── layout/           # Componentes de layout (Header, Footer)
│   └── content/          # Componentes de conteúdo específicos
├── lib/
│   └── sanity.ts         # Configuração do Sanity
├── pages/
│   ├── _app.tsx          # Configuração global da app
│   ├── _document.tsx     # Documento HTML customizado
│   ├── index.tsx         # Página inicial
│   └── 404.tsx           # Página de erro 404
├── styles/
│   ├── theme.ts          # Design system (cores, tipografia, etc.)
│   └── GlobalStyles.ts   # Estilos globais
├── types/
│   └── sanity.ts         # Tipos TypeScript para Sanity
schemas/                  # Schemas do Sanity CMS
├── campaign.ts           # Schema das campanhas
├── page.ts               # Schema das páginas
├── post.ts               # Schema das notícias
├── event.ts              # Schema dos eventos
├── proposal.ts           # Schema das propostas
└── blockContent.ts       # Schema do conteúdo rich text
```

## 🎨 Design System

O projeto inclui um design system completo baseado na identidade visual da campanha:

### Cores
- **Azul PS**: `#48B9CA` (cor primária)
- **Azul Teal**: `#23757E` (cor secundária)
- **Vermelho Vivo**: `#FF394C` (destaque)
- **Carmin**: `#7D3C4B` (apoio)
- **Branco**: `#FFFFFF`

### Tipografia
- **Fonte Principal**: Gotham (com fallback para Inter/system fonts)
- **Pesos**: Light (300), Normal (400), Medium (500), Semibold (600), Bold (700), Black (900)

### Componentes
- Button (4 variantes, 3 tamanhos)
- Typography (hierarquia completa H1-H6)
- Card (com hover effects e shadows)
- Grid system responsivo
- Container com breakpoints

## 📝 Gestão de Conteúdo (Sanity)

### Schemas Disponíveis

1. **Campaign**: Configuração de cada campanha (logo, cores, domínio)
2. **Page**: Páginas estáticas com conteúdo flexível
3. **Post**: Notícias e comunicados
4. **Event**: Eventos da campanha
5. **Proposal**: Propostas políticas por categoria
6. **Block Content**: Rich text editor para conteúdo

### Criação de Conteúdo

1. Aceda ao Sanity Studio
2. Crie primeiro uma "Campanha" com as configurações base
3. Adicione páginas, propostas, eventos e notícias associadas à campanha
4. O conteúdo será automaticamente sincronizado com o site

## 🌐 Multi-domínio

O sistema suporta múltiplas campanhas através de domínios:

- `viverlisboa.pt` → Campanha principal
- `viveravenidas.pt` → Campanha Avenidas Novas
- `viveralvalade.pt` → Campanha Alvalade

### Configuração
1. No Sanity, crie diferentes campanhas com os respetivos domínios
2. Configure DNS dos domínios para apontar para o deployment
3. A aplicação automaticamente carrega a campanha baseada no domínio

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar repositório**
   - Importe o projeto no Vercel
   - Configure as variáveis de ambiente

2. **Configurar domínios**
   - Adicione todos os domínios no Vercel
   - Configure DNS para apontar para Vercel

3. **Deploy automático**
   - Cada push para `main` faz deploy automático
   - Preview deployments para branches

### Outras plataformas
O projeto é compatível com qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
pnpm run dev          # Executar em modo desenvolvimento
pnpm run build        # Build para produção
pnpm run start        # Executar versão de produção
pnpm run lint         # Verificar code style
pnpm run type-check   # Verificar tipos TypeScript

# Sanity
pnpm sanity dev           # Executar Sanity Studio
pnpm sanity deploy        # Deploy do Studio
pnpm sanity dataset export # Exportar dados
```

## 📊 SEO e Performance

### Implementações SEO
- Meta tags dinâmicas por página
- Open Graph e Twitter Cards
- Structured data (JSON-LD)
- Sitemap automático
- Canonical URLs
- Meta robots configurável

### Otimizações de Performance
- Next.js Image optimization
- Lazy loading de componentes
- Code splitting automático
- Preconnect para recursos externos
- Critical CSS inline

## ♿ Acessibilidade

- Navegação por teclado completa
- Aria labels e roles adequados
- Contraste de cores WCAG AA
- Skip links para conteúdo principal
- Texto alternativo em imagens
- Foco visível em elementos interativos

## 🔒 Segurança

- Headers de segurança configurados
- Sanitização de conteúdo
- Validação de forms
- Rate limiting (recomendado adicionar)
- HTTPS obrigatório

## 📱 Responsividade

Breakpoints configurados:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large: > 1280px

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para a feature (`git checkout -b feature/AmazingFeature`)
3. Commit as mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para questões técnicas ou suporte:
- Email: tech@viverlisboa.pt
- Issues no GitHub

## 📄 Licença

Este projeto está licenciado sob MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido para a campanha Viver Lisboa 2025** 🏛️✊
