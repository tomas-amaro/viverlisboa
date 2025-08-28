# Deployment Setup Guide

This guide will help you set up automated deployment to Cloudflare Pages using GitHub Actions for your multi-domain application.

## Overview

Your application now **dynamically discovers domains from your Sanity CMS**! The system automatically:
- Fetches all campaigns with defined domains from Sanity
- Generates appropriate Cloudflare Pages project names
- Builds and deploys each domain independently

**No more hardcoded domain lists!** Simply create campaigns in your Sanity Studio and they'll be automatically included in deployments.

Example domains (automatically discovered):
- `viverlisboa.pt` → Deploys to `viver-lisboa` Cloudflare Pages project
- `viveravenidas.pt` → Deploys to `viver-avenidas` Cloudflare Pages project  
- Any new domain you add to Sanity → Automatically deployed

## Prerequisites

1. **Cloudflare Account** with Pages enabled
2. **GitHub Repository** with Actions enabled
3. **Sanity CMS Project** with API access

## Step 1: Domain Discovery and Management

### 1.1 Discover Available Domains

Your domains are now automatically discovered from Sanity CMS:

```bash
# See all available domains
pnpm discover-domains

# Get JSON output for scripts
pnpm discover-domains:json

# Validate domain configurations
pnpm validate-domains
```

### 1.2 Adding New Domains

To add a new domain:
1. **Create a new Campaign in Sanity Studio**
2. **Set the domain field** (e.g., `novocampo.pt`)
3. **Fill in required fields** (title, colors, location, etc.)
4. **Push to GitHub** - the new domain will be automatically included in deployments!

The system will automatically:
- Generate a Cloudflare project name (e.g., `novo-campo`)
- Build and deploy the domain
- Create the appropriate directory structure

## Step 2: Cloudflare Setup

### 2.1 Create Cloudflare Pages Projects

In your Cloudflare dashboard, create Pages projects for each domain:

```bash
# First, discover your domains and their project names
pnpm discover-domains
```

This will show you the mapping, for example:
- `viverlisboa.pt` → `viver-lisboa`
- `viveravenidas.pt` → `viver-avenidas`
- Any new domains → Automatically generated project names

**Create a Pages project in Cloudflare for each domain/project name pair shown.**

💡 **Tip**: When you add new campaigns to Sanity, you'll need to create corresponding Cloudflare Pages projects with the generated names.

### 1.2 Get Cloudflare Credentials

You'll need these values from your Cloudflare dashboard:

1. **Account ID**: Dashboard → Right sidebar → Account ID
2. **API Token**: My Profile → API Tokens → Create Token
   - Use "Custom token" template
   - Permissions needed:
     - `Zone:Zone Settings:Read`
     - `Zone:Zone:Read`
     - `Cloudflare Pages:Edit`
   - Account Resources: Include → [Your Account]
   - Zone Resources: Include → All zones

### 1.3 Configure Custom Domains (Optional)

For each Pages project, add your custom domain:

1. Go to your Pages project → Custom domains
2. Add your domain (e.g., `viverlisboa.pt`)
3. Follow DNS setup instructions

## Step 2: GitHub Secrets Setup

In your GitHub repository, go to Settings → Secrets and Variables → Actions, and add these secrets:

### Required Secrets

```bash
# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production  # or your dataset name
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-20  # or your preferred version
SANITY_API_TOKEN=your_sanity_api_token
```

### How to Get Sanity Credentials

1. **Project ID**: Found in your Sanity project dashboard URL or `sanity.config.ts`
2. **Dataset**: Usually "production" or found in your Sanity project settings
3. **API Token**: Sanity Dashboard → API → Tokens → Add API token
   - Give it read permissions for your dataset

## Step 3: Local Development Setup

### 3.1 Environment Variables

Create a `.env.local` file in your project root:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-20
SANITY_API_TOKEN=your_sanity_api_token

# Development Override (optional)
DEV_CAMPAIGN_DOMAIN=viverlisboa.pt
```

### 3.2 Install Dependencies

```bash
pnpm install

# Optional: Install Wrangler CLI for manual deployment
pnpm add -g wrangler
wrangler login  # Login to your Cloudflare account
```

## Step 4: Testing the Setup

### 4.1 Test Domain Discovery

```bash
# First, make sure your domains are discoverable
pnpm discover-domains

# Validate all domain configurations
pnpm validate-domains

# Get JSON output (used by build scripts)
pnpm discover-domains:json
```

### 4.2 Test Local Builds

```bash
# Test building all domains (automatically discovered)
pnpm build:all

# Test building specific domains (use actual domain names from discovery)
node scripts/build-domain.js viverlisboa.pt
node scripts/build-domain.js [your-domain-here]
```

### 4.3 Test Local Deployment (Optional)

If you have Wrangler CLI installed:

```bash
# Deploy domains (use actual domain names from discovery)
node scripts/deploy-cloudflare.js viverlisboa.pt preview
node scripts/deploy-cloudflare.js [your-domain-here] preview

# The script will automatically:
# - Discover available domains
# - Generate appropriate Cloudflare project names
# - Deploy to the correct project
```

### 4.3 Test GitHub Actions

1. **Push to a feature branch** to test preview deployments
2. **Create a Pull Request** to test the full workflow
3. **Merge to main** for production deployment

## Step 5: Deployment Process

### Automatic Deployment

- **Pull Requests**: Creates preview deployments for all domains
- **Main Branch**: Creates production deployments with custom domains
- **Matrix Strategy**: Builds and deploys each domain in parallel

### Manual Deployment

```bash
# Local manual deployment
node scripts/deploy-cloudflare.js viverlisboa.pt production
node scripts/deploy-cloudflare.js viveravenidas.pt preview

# Using pnpm scripts
pnpm deploy:cf:lisboa
```

## Deployment Architecture

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

## Build Process Details

1. **Domain-Specific Build**: Uses `CAMPAIGN_DOMAIN` env var to build each domain
2. **Static Export**: Converts Next.js standalone build to static files for Cloudflare
3. **Headers Configuration**: Adds security and caching headers via `_headers` file
4. **Parallel Deployment**: Each domain deploys independently

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Sanity credentials in GitHub secrets
   - Verify environment variables are correctly set
   - Check build logs for specific errors

2. **Deployment Failures**
   - Verify Cloudflare API token has correct permissions
   - Check if Cloudflare Pages projects exist with correct names
   - Ensure account ID is correct

3. **Content Not Loading**
   - Verify Sanity API token has read permissions
   - Check if content exists for the specific domain in Sanity
   - Verify dataset name is correct

### Debug Commands

```bash
# Check build output
ls -la builds/
ls -la builds/viverlisboa.pt/

# Test Sanity connection
node -e "
const client = require('./src/sanity/lib/client.ts');
client.fetch('*[_type == \"campaign\"]').then(console.log);
"

# Check environment variables in CI
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
```

## Additional Configuration

### Cloudflare Pages Environment Variables

You can also set environment variables directly in Cloudflare Pages dashboard:

1. Go to Pages project → Settings → Environment variables
2. Add the same Sanity variables as above
3. This provides a backup if GitHub secrets fail

### Custom Build Commands

If you need custom build commands per domain:

```bash
# In Cloudflare Pages settings
Build command: pnpm build:lisboa
Build output directory: builds/viverlisboa.pt/out
```

## Security Notes

- Never commit `.env.local` or any files with secrets
- Use GitHub secrets for all sensitive data
- Rotate API tokens regularly
- Use minimal permissions for API tokens

## Performance Optimization

- Static exports provide excellent performance on Cloudflare Pages
- CDN caching is automatically configured via `_headers`
- Each domain is independently deployable and cacheable

## Support

If you encounter issues:

1. Check GitHub Actions logs
2. Review Cloudflare Pages deployment logs  
3. Verify all environment variables are set correctly
4. Test builds locally first

## Monitoring

Monitor your deployments:

- **GitHub Actions**: Repository → Actions tab
- **Cloudflare Pages**: Dashboard → Pages → [Your Project] → Deployments
- **Performance**: Cloudflare Analytics for each domain
