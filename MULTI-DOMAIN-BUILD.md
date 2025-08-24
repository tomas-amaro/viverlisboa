# Multi-Domain Build System

This project now supports building each domain independently at build time, allowing you to serve different static builds on different domains/URLs.

## Available Domains

- `viverlisboa.pt` - Main Lisboa campaign
- `viveravenidas.pt` - Avenidas Novas campaign  
- `viveralvalade.pt` - Alvalade campaign

## Development

### Running Development Server

```bash
# Default development (uses viverlisboa.pt)
npm run dev

# Domain-specific development
npm run dev:lisboa       # viverlisboa.pt
npm run dev:avenidas     # viveravenidas.pt
npm run dev:alvalade     # viveralvalade.pt
```

In development, the system will:
1. Try to fetch campaign data from Sanity CMS
2. Fall back to local configuration if Sanity is unavailable
3. Use the `DEV_CAMPAIGN_DOMAIN` environment variable or hostname detection

## Building

### Single Domain Build

```bash
# Using npm scripts
npm run build:lisboa     # Build viverlisboa.pt
npm run build:avenidas   # Build viveravenidas.pt
npm run build:alvalade   # Build viveralvalade.pt

# Using build script directly
npm run build:domain viverlisboa.pt
npm run build:domain viveravenidas.pt
npm run build:domain viveralvalade.pt

# Alternative direct script usage
node scripts/build-domain.js viverlisboa.pt
```

### Build All Domains

```bash
# Build all domains in parallel
npm run build:all

# Alternative
node scripts/build-all-domains.js
```

## Build Output

Each domain build creates a separate directory:

```
builds/
├── viverlisboa.pt/
│   ├── .next/              # Next.js build output
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies
│   ├── next.config.js      # Configuration
│   └── deployment-info.json # Build metadata
├── viveravenidas.pt/
│   └── ...
└── viveralvalade.pt/
    └── ...
```

## Deployment

### Vercel Deployment

```bash
# Deploy specific domain to Vercel
npm run deploy:domain viverlisboa.pt vercel

# Alternative
node scripts/deploy-domain.js viverlisboa.pt vercel
```

### Netlify Deployment

```bash
# Deploy specific domain to Netlify
npm run deploy:domain viveravenidas.pt netlify

# Alternative
node scripts/deploy-domain.js viveravenidas.pt netlify
```

### Manual Deployment

```bash
# Get manual deployment instructions
npm run deploy:domain viveralvalade.pt manual

# Alternative
node scripts/deploy-domain.js viveralvalade.pt manual
```

## How It Works

### Build-Time Configuration

Each build uses the `CAMPAIGN_DOMAIN` environment variable to determine which campaign configuration to use:

```javascript
// src/lib/buildConfig.ts
export function getBuildConfig(): BuildConfig {
  const campaignDomain = process.env.CAMPAIGN_DOMAIN || 'viverlisboa.pt'
  // Returns appropriate campaign configuration
}
```

### Static Data Fetching

Pages use `getStaticProps` to fetch campaign-specific data at build time:

```javascript
// src/pages/index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const buildConfig = getBuildConfig()
  const campaignDomain = buildConfig.campaign.domain
  
  // Fetch campaign-specific data from Sanity
  const [campaignData, proposals, events, posts] = await Promise.all([
    client.fetch(campaignQuery, { domain: campaignDomain }),
    client.fetch(proposalsQuery, { domain: campaignDomain }),
    // ...
  ])
  
  return { props: { campaign, proposals, events, posts } }
}
```

### Client-Side Rendering

The app component uses build-time configuration in production and falls back to runtime detection in development:

```javascript
// src/pages/_app.tsx
useEffect(() => {
  if (!isDevelopment()) {
    // Production: use build-time configuration
    const buildConfig = getBuildConfig()
    setCampaign(buildConfig.campaign)
  } else {
    // Development: fetch from Sanity or use dev config
    // ...
  }
}, [])
```

## Configuration Management

### Domain Configuration

Campaign configurations are defined in `src/lib/buildConfig.ts`:

```javascript
const DOMAIN_CONFIGS = {
  'viverlisboa.pt': {
    title: 'Viver Lisboa',
    mainColor: '#48B9CA',
    secondaryColor: '#FF394C',
    // ...
  },
  // ...
}
```

### Environment Variables

- `CAMPAIGN_DOMAIN` - Specifies which domain to build (production)
- `DEV_CAMPAIGN_DOMAIN` - Specifies which domain to use in development
- `NODE_ENV` - Environment (development/production)

### Sanity Integration

The system fetches content from Sanity CMS based on the campaign domain:

```javascript
// Queries filter by campaign domain
const query = `*[_type == "proposal" && campaign->domain == $domain]`
```

## Benefits

1. **Static Builds**: Each domain gets a completely static build that can be served from CDN
2. **Independent Deployment**: Deploy each domain separately without affecting others
3. **Performance**: No runtime domain detection or API calls needed
4. **SEO Friendly**: Each domain has its own optimized static content
5. **Cost Effective**: Static hosting is cheaper than server-side rendering
6. **Scalability**: Easy to add new domains/campaigns

## Development Workflow

1. **Add New Domain**: Update `DOMAIN_CONFIGS` in `buildConfig.ts`
2. **Development**: Use `npm run dev:domain` to test specific domains
3. **Content**: Add campaign-specific content in Sanity CMS
4. **Build**: Use `npm run build:domain <domain>` to build specific domain
5. **Deploy**: Use `npm run deploy:domain <domain> <platform>` to deploy

## Troubleshooting

### Build Fails

```bash
# Check if domain exists
node scripts/build-domain.js unknown-domain.pt
# Error: Unknown domain "unknown-domain.pt"

# Check available domains
node scripts/build-domain.js
# Shows usage and available domains
```

### Missing Environment Variables

```bash
# Set explicitly for builds
CAMPAIGN_DOMAIN=viverlisboa.pt npm run build
```

### Sanity Connection Issues

The system falls back to local configuration if Sanity is unavailable, but for production builds with full content, ensure:

1. `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
2. `NEXT_PUBLIC_SANITY_DATASET` is set  
3. `SANITY_API_TOKEN` is set (for build-time fetching)
4. Sanity project has campaign data for the domain

### Development Issues

```bash
# Force specific campaign in development
DEV_CAMPAIGN_DOMAIN=viveravenidas.pt npm run dev

# Or use domain-specific scripts
npm run dev:avenidas
```

## Migration from Runtime Domain Detection

The old system detected domains at runtime and fetched data dynamically. The new system:

1. ✅ Builds static files for each domain
2. ✅ Fetches all data at build time
3. ✅ Uses environment variables for configuration
4. ✅ Supports development fallbacks
5. ✅ Maintains same component structure
6. ✅ Works with existing Sanity schemas
