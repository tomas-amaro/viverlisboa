# Viver Lisboa - Political Campaign Website

A modern political campaign website built with React/Next.js and content management through Sanity CMS. Supports multiple campaigns (Viver Lisboa, Viver Avenidas, Viver Alvalade, etc.) through dynamic domain discovery.

## 🚀 Features

- **Complete Design System**: Based on campaign visual identity with official colors and typography
- **Dynamic CMS**: Complete content management through Sanity with automatic domain discovery
- **Multi-Domain**: Support for different campaigns on specific domains, automatically discovered from Sanity
- **SEO Optimized**: Meta tags, structured data, sitemaps and performance optimizations
- **Responsive**: Fully adaptive design for all devices
- **Accessibility**: Accessible components with keyboard navigation and screen reader support
- **Performance**: Optimized for fast loading and great user experience
- **Dynamic Deployment**: Automatic domain discovery and deployment through GitHub Actions

## 🛠 Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Styled Components with custom design system
- **CMS**: Sanity.io for content management
- **Animations**: Framer Motion
- **Deployment**: Cloudflare Pages with GitHub Actions
- **Domain Discovery**: Dynamic discovery from Sanity CMS

## 📦 Installation

1. **Clone the repository**
```bash
git clone [repository-url]
cd viveravenidas
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the project root:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-20
SANITY_API_TOKEN=your_sanity_api_token

# Development Override (optional)
DEV_CAMPAIGN_DOMAIN=viverlisboa.pt

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

4. **Set up Sanity**
```bash
# Login to Sanity
pnpm sanity login

# Initialize Sanity project (if it doesn't exist)
pnpm sanity init

# Run Sanity Studio
pnpm sanity dev
```

5. **Run in development**
```bash
pnpm dev
```

The site will be available at `http://localhost:3000` and Sanity Studio at `http://localhost:3333`.

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/               # Base design system components
│   ├── layout/           # Layout components (Header, Footer)
│   └── content/          # Specific content components
├── lib/
│   ├── buildConfig.ts    # Dynamic build configuration
│   └── sanity.ts         # Sanity configuration
├── pages/
│   ├── _app.tsx          # Global app configuration
│   ├── _document.tsx     # Custom HTML document
│   ├── index.tsx         # Homepage
│   ├── [slug].tsx        # Dynamic pages
│   └── 404.tsx           # 404 error page
├── styles/
│   ├── theme.ts          # Design system (colors, typography, etc.)
│   └── GlobalStyles.ts   # Global styles
├── types/
│   └── sanity.ts         # TypeScript types for Sanity
└── sanity/               # Sanity CMS configuration
    ├── schemaTypes/      # Content schemas
    └── lib/              # Sanity utilities
```

## 🎨 Design System

The project includes a complete design system based on campaign visual identity:

### Colors
- **PS Blue**: `#48B9CA` (primary color)
- **Teal Blue**: `#23757E` (secondary color)
- **Vivid Red**: `#FF394C` (accent)
- **Carmine**: `#7D3C4B` (support)
- **White**: `#FFFFFF`

### Typography
- **Main Font**: Gotham (with fallback to Inter/system fonts)
- **Weights**: Light (300), Normal (400), Medium (500), Semibold (600), Bold (700), Black (900)

### Components
- Button (4 variants, 3 sizes)
- Typography (complete H1-H6 hierarchy)
- Card (with hover effects and shadows)
- Responsive grid system
- Container with breakpoints

## 📝 Content Management (Sanity)

### Available Schemas

1. **Campaign**: Configuration for each campaign (logo, colors, domain)
2. **Page**: Static pages with flexible content
3. **Post**: News and announcements
4. **Event**: Campaign events
5. **Proposal**: Political proposals by category
6. **Block Content**: Rich text editor for content

### Content Creation

1. Access Sanity Studio at `https://viverlisboa.sanity.studio`
2. First create a "Campaign" with base configurations and **set the domain field**
3. Add pages, proposals, events and news associated with the campaign
4. Content will be automatically synchronized with the website

## 🌐 Multi-Domain System

The system automatically discovers domains from your Sanity CMS! No more hardcoded configurations.

### How It Works

1. **Automatic Discovery**: Fetches all campaigns with defined domains from Sanity
2. **Dynamic Project Names**: Generates appropriate Cloudflare Pages project names
3. **Independent Builds**: Builds and deploys each domain independently

### Adding New Domains

To add a new domain:
1. **Create a new Campaign in Sanity Studio**
2. **Set the domain field** (e.g., `novocampo.pt`)
3. **Fill in required fields** (title, colors, location, etc.)
4. **Push to GitHub** - the new domain will be automatically included in deployments!

### Domain Discovery Commands

```bash
# See all available domains
pnpm discover-domains

# Get JSON output for scripts
pnpm discover-domains:json

# Validate domain configurations
pnpm validate-domains
```

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

The project uses a fully automated deployment system:

- **Pull Requests**: Creates preview deployments for all domains
- **Main Branch**: Creates production deployments with custom domains
- **Matrix Strategy**: Builds and deploys each domain in parallel
- **Dynamic Discovery**: Automatically includes new domains from Sanity

### Manual Deployment

```bash
# Local manual deployment
pnpm deploy:cloudflare viverlisboa.pt production
pnpm deploy:cloudflare viveravenidas.pt preview

# Deploy specific domain
pnpm deploy:cloudflare [domain] [environment]
```

### Deployment Architecture

```
GitHub Push
    ↓
GitHub Actions
    ↓
Domain Discovery Job
    ├── Fetches campaigns from Sanity CMS
    ├── Discovers available domains dynamically
    └── Generates deployment matrix
    ↓
Parallel Build & Deploy Jobs (Matrix Strategy)
    ├── Build [domain1] → Deploy to [project-name1].pages.dev
    ├── Build [domain2] → Deploy to [project-name2].pages.dev  
    └── Build [domainN] → Deploy to [project-nameN].pages.dev
```

**🔄 Fully Dynamic**: Adding a new campaign in Sanity automatically includes it in future deployments!

## 🔧 Available Commands

```bash
# Development
pnpm dev                     # Run in development mode
pnpm dev:lisboa             # Run with Lisboa campaign
pnpm dev:avenidas           # Run with Avenidas campaign
pnpm dev:alvalade           # Run with Alvalade campaign

# Building
pnpm build                  # Build for production
pnpm build:domain           # Build specific domain
pnpm build:all              # Build all domains (auto-discovered)

# Domain Management
pnpm discover-domains       # See all available domains
pnpm validate-domains       # Validate domain configurations
pnpm verify-setup          # Verify deployment setup

# Deployment
pnpm deploy:cloudflare      # Deploy to Cloudflare Pages
pnpm deploy:preview         # Quick preview deployment
pnpm deploy:production      # Quick production deployment

# Utilities
pnpm lint                   # Check code style
pnpm type-check            # Check TypeScript types
pnpm setup:check           # Combined setup verification

# Sanity
pnpm studio                # Run Sanity Studio
pnpm sanity:build          # Build Sanity Studio
pnpm sanity:deploy         # Deploy Sanity Studio
pnpm seed                  # Seed test data
pnpm clear-data            # Clear test data
```

## 📊 SEO and Performance

### SEO Implementations
- Dynamic meta tags per page
- Open Graph and Twitter Cards
- Structured data (JSON-LD)
- Automatic sitemap
- Canonical URLs
- Configurable meta robots

### Performance Optimizations
- Next.js Image optimization
- Component lazy loading
- Automatic code splitting
- Preconnect for external resources
- Critical CSS inline

## ♿ Accessibility

- Complete keyboard navigation
- Appropriate aria labels and roles
- WCAG AA color contrast
- Skip links to main content
- Alternative text for images
- Visual focus on interactive elements

## 🔒 Security

- Configured security headers
- Content sanitization
- Form validation
- HTTPS required

## 📱 Responsiveness

Configured breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large: > 1280px

## 🛠 Setup and Configuration

### Prerequisites

1. **Cloudflare Account** with Pages enabled
2. **GitHub Repository** with Actions enabled
3. **Sanity CMS Project** with API access

### Environment Variables

Required for GitHub Actions:

```bash
# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-20
SANITY_API_TOKEN=your_sanity_api_token
```

### Getting Started

1. **Set up Sanity**: Create campaigns with domain fields
2. **Configure GitHub secrets**: Add required environment variables
3. **Create Cloudflare Pages projects**: Use generated project names from domain discovery
4. **Push to GitHub**: Automatic deployment will begin

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For technical questions or support:
- GitHub Issues
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions

## 📄 License

This project is licensed under MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built for political campaigns with modern web technologies** 🏛️✊