# Multi-Domain Build System

This project supports building each domain independently at build time with **automatic domain discovery from Sanity CMS**, allowing you to serve different static builds on different domains/URLs.

## 🔍 Dynamic Domain Discovery

Domains are now **automatically discovered from your Sanity CMS**! No more hardcoded configurations.

### Available Commands

```bash
# Discover all domains from Sanity
pnpm discover-domains

# Get JSON output for scripts
pnpm discover-domains:json

# Validate domain configurations
pnpm validate-domains
```

### Example Output
```bash
✅ Found 3 campaigns in Sanity:
   • Viver Lisboa (viverlisboa.pt) - Lisboa
   • Viver Avenidas (viveravenidas.pt) - Avenidas Novas
   • Viver Alvalade (viveralvalade.pt) - Alvalade
```

## 🆕 Adding New Domains

To add a new domain:
1. **Create a new Campaign in Sanity Studio**
2. **Set the domain field** (e.g., `novocampo.pt`)
3. **Fill in required fields** (title, colors, location, etc.)
4. **Push to GitHub** - the new domain will be automatically included in deployments!

**No code changes needed!** 🎉

## Development

### Running Development Server

```bash
# Default development (auto-detects from available domains)
pnpm dev

# Domain-specific development (use discovered domains)
pnpm dev:lisboa       # viverlisboa.pt
pnpm dev:avenidas     # viveravenidas.pt
pnpm dev:alvalade     # viveralvalade.pt
```

In development, the system will:
1. Try to fetch campaign data from Sanity CMS
2. Fall back to local configuration if Sanity is unavailable
3. Use the `DEV_CAMPAIGN_DOMAIN` environment variable or hostname detection

## Building

### Single Domain Build

```bash
# Build specific domain (use actual domains from discovery)
pnpm build:domain viverlisboa.pt
pnpm build:domain viveravenidas.pt

# Check available domains first
pnpm discover-domains

# Then build discovered domains
node scripts/build-domain.js [discovered-domain]
```

### Build All Domains

```bash
# Build all domains in parallel (automatically discovered)
pnpm build:all

# Alternative
node scripts/build-all-domains.js
```

**💡 The build system automatically discovers all domains from Sanity and builds each one!**

## Build Output

Each domain build creates a separate directory:

```
builds/
├── viverlisboa.pt/
│   ├── .next/              # Next.js build output
│   ├── out/                # Static export for Cloudflare
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies
│   ├── next.config.js      # Configuration
│   └── deployment-info.json # Build metadata
├── viveravenidas.pt/
│   └── ...
└── [any-new-domain]/
    └── ...
```

## 🚀 Deployment

### Primary: Cloudflare Pages (Automatic)

The main deployment method uses **GitHub Actions** with automatic domain discovery:

```bash
# Automatic deployment on git push
git push origin main

# The system will:
# 1. Discover domains from Sanity
# 2. Build each domain in parallel
# 3. Deploy to Cloudflare Pages
```

### Manual Cloudflare Deployment

```bash
# Deploy specific domain to Cloudflare Pages
pnpm deploy:cloudflare viverlisboa.pt production
pnpm deploy:cloudflare viveravenidas.pt preview

# Auto-discovery and deployment
node scripts/deploy-cloudflare.js [discovered-domain] [environment]
```

### Alternative: Vercel/Netlify

```bash
# Legacy deployment methods (if needed)
pnpm deploy:domain viverlisboa.pt vercel
pnpm deploy:domain viveravenidas.pt netlify
```

## How It Works

### Dynamic Domain Discovery

The system fetches domains from Sanity CMS at build time:

```javascript
// scripts/discover-domains.js
const campaigns = await client.fetch(`
  *[_type == "campaign" && defined(domain)] | order(title asc) {
    _id, title, domain, location, mainColor, secondaryColor
  }
`);
```

### Build-Time Configuration

Each build uses the `CAMPAIGN_DOMAIN` environment variable:

```javascript
// src/lib/buildConfig.ts
export function getBuildConfig(): BuildConfig {
  const campaignDomain = process.env.CAMPAIGN_DOMAIN || 'viverlisboa.pt'
  
  // Fetch configuration from Sanity or use fallback
  return await getCampaignConfig(campaignDomain)
}
```

### Static Data Fetching

Pages use `getStaticProps` to fetch campaign-specific data:

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

## Configuration Management

### Sanity-Based Configuration

Campaign configurations are now stored in **Sanity CMS**:

```javascript
// Sanity Campaign Schema
{
  _type: "campaign",
  title: "Viver Lisboa",
  domain: "viverlisboa.pt",
  mainColor: "#48B9CA",
  secondaryColor: "#FF394C",
  location: "Lisboa",
  description: "Campaign description...",
  // All configuration in CMS!
}
```

### Environment Variables

- `CAMPAIGN_DOMAIN` - Specifies which domain to build (production)
- `DEV_CAMPAIGN_DOMAIN` - Specifies which domain to use in development
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset
- `SANITY_API_TOKEN` - API token for build-time fetching

### Dynamic Sanity Integration

The system fetches content based on campaign domain:

```javascript
// Queries filter by campaign domain
const query = `*[_type == "proposal" && campaign->domain == $domain]`
```

## Benefits

1. **🔄 Fully Dynamic**: Add domains by creating campaigns in Sanity Studio
2. **🚀 Static Builds**: Each domain gets a completely static build for CDN
3. **⚡ Independent Deployment**: Deploy each domain separately without affecting others
4. **🎯 Performance**: No runtime domain detection or API calls needed
5. **📈 SEO Friendly**: Each domain has its own optimized static content
6. **💰 Cost Effective**: Static hosting is cheaper than server-side rendering
7. **📊 Scalability**: Easy to add unlimited domains/campaigns
8. **🛠️ No Code Changes**: Add new domains without touching code

## Development Workflow

1. **Add New Domain**: Create campaign in Sanity Studio with domain field
2. **Discovery**: Use `pnpm discover-domains` to see available domains
3. **Development**: Use `pnpm dev:domain` or domain-specific scripts
4. **Content**: Add campaign-specific content in Sanity CMS
5. **Build**: Use `pnpm build:domain <domain>` or `pnpm build:all`
6. **Deploy**: Push to GitHub for automatic deployment

## Troubleshooting

### No Domains Found

```bash
# Check Sanity connection
pnpm discover-domains

# Verify environment variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $NEXT_PUBLIC_SANITY_DATASET
echo $SANITY_API_TOKEN
```

### Build Fails

```bash
# Check if domain exists in Sanity
pnpm discover-domains

# Build specific discovered domain
node scripts/build-domain.js [discovered-domain]

# Check build logs for Sanity connection issues
```

### Missing Environment Variables

```bash
# Set explicitly for builds
CAMPAIGN_DOMAIN=viverlisboa.pt pnpm build
```

### Sanity Connection Issues

For production builds with full content, ensure:

1. `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
2. `NEXT_PUBLIC_SANITY_DATASET` is set  
3. `SANITY_API_TOKEN` is set (for build-time fetching)
4. Sanity project has campaign data with domain fields
5. Campaigns are published (not drafts)

### Development Issues

```bash
# Force specific campaign in development
DEV_CAMPAIGN_DOMAIN=viveravenidas.pt pnpm dev

# Or use domain-specific scripts
pnpm dev:avenidas

# Check available development options
pnpm discover-domains
```

## Migration from Hardcoded Configuration

The old system used hardcoded domain configurations. The new system:

1. ✅ **Dynamic Discovery**: Domains discovered from Sanity CMS
2. ✅ **No Code Changes**: Add domains via Sanity Studio
3. ✅ **Automatic Deployment**: GitHub Actions handles everything
4. ✅ **Builds Static Files**: Each domain gets optimized static build
5. ✅ **Fetches All Data**: Build-time data fetching from Sanity
6. ✅ **Environment Variables**: Clean configuration management
7. ✅ **Development Fallbacks**: Works offline with local config
8. ✅ **Same Components**: Maintains existing component structure
9. ✅ **Existing Schemas**: Works with current Sanity schemas

**🎉 The new system is fully backward-compatible but much more flexible!**