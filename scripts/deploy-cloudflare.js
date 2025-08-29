#!/usr/bin/env node

/**
 * Deploy script for Cloudflare Pages
 * Usage: node scripts/deploy-cloudflare.js <domain> [environment]
 * Example: node scripts/deploy-cloudflare.js viverlisboa.pt production
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { discoverAvailableDomains } = require('./build-domain');

// Generate Cloudflare project name from domain
function generateProjectName(domain) {
  // Convert domain to project name (e.g., viverlisboa.pt -> viver-lisboa)
  return domain
    .replace(/\.pt$/, '') // Remove .pt suffix
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Add hyphens between camelCase
    .toLowerCase()
    .replace(/^viver/, 'viver-') // Ensure viver- prefix
    .replace(/viver-viver/, 'viver'); // Avoid double prefix
}

// Get Cloudflare project mappings dynamically
async function getCloudflareProjects() {
  const domains = await discoverAvailableDomains();
  const projects = {};
  
  domains.forEach(domain => {
    projects[domain] = generateProjectName(domain);
  });
  
  return projects;
}

async function printUsage() {
  console.log('Usage: node scripts/deploy-cloudflare.js <domain> [environment]');
  console.log('');
  console.log('Available domains:');
  
  const domains = await discoverAvailableDomains();
  const projects = await getCloudflareProjects();
  
  domains.forEach(domain => {
    console.log(`  - ${domain} → ${projects[domain]}`);
  });
  
  console.log('');
  console.log('Environments: production (default), preview');
  console.log('');
  console.log('Examples:');
  console.log(`  node scripts/deploy-cloudflare.js ${domains[0] || 'viverlisboa.pt'}`);
  console.log(`  node scripts/deploy-cloudflare.js ${domains[1] || 'viveravenidas.pt'} production`);
  console.log(`  node scripts/deploy-cloudflare.js ${domains[2] || 'viveralvalade.pt'} preview`);
  console.log('');
  console.log('💡 Domains and project names are discovered dynamically from your Sanity CMS');
}

function prepareBuildForCloudflare(domain) {
  const buildDir = path.join(process.cwd(), 'builds', domain);
  const outputDir = path.join(buildDir, 'out');
  
  console.log('🔄 Preparing build for Cloudflare Pages...');
  
  // Check if build exists
  if (!fs.existsSync(buildDir)) {
    throw new Error(`Build not found for ${domain}. Run: node scripts/build-domain.js ${domain}`);
  }
    
  try {
    // Run static build (replaces next export)
    console.log('📦 Generating static export...');
    execSync('pnpm build', {
      stdio: 'inherit',
      cwd: buildDir,
      env: {
        ...process.env,
        CAMPAIGN_DOMAIN: domain,
        NODE_ENV: 'production',
        NEXT_BUILD_TYPE: 'static'
      }
    });
    
    // Create _headers file for Cloudflare Pages
    const headersContent = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: origin-when-cross-origin
  Cache-Control: public, max-age=31536000, immutable

/api/*
  Cache-Control: no-cache, no-store, must-revalidate

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable`;
    
    fs.writeFileSync(path.join(outputDir, '_headers'), headersContent);
    
    console.log(`✅ Static build prepared at builds/${domain}/out/`);
    return outputDir;
    
  } finally {
    // No config restoration needed
  }
}

async function deployToCloudflare(domain, environment = 'production') {
  const projectName = generateProjectName(domain);
  const outputDir = prepareBuildForCloudflare(domain);
  
  console.log(`🚀 Deploying ${domain} to Cloudflare Pages...`);
  console.log(`📁 Project: ${projectName}`);
  console.log(`🌍 Environment: ${environment}`);
  console.log('');
  
  try {
    const wranglerCmd = environment === 'production' 
      ? `wrangler pages deploy "${outputDir}" --project-name="${projectName}" --production`
      : `wrangler pages deploy "${outputDir}" --project-name="${projectName}"`;
    
    // Ensure required environment variables are set
    if (!process.env.CLOUDFLARE_API_TOKEN) {
      throw new Error('CLOUDFLARE_API_TOKEN environment variable is required');
    }
    if (!process.env.CLOUDFLARE_ACCOUNT_ID) {
      throw new Error('CLOUDFLARE_ACCOUNT_ID environment variable is required');  
    }
      
    console.log('💫 Running Wrangler deployment...');
    execSync(wranglerCmd, { stdio: 'inherit' });
    
    console.log('');
    console.log('✅ Deployment completed successfully!');
    console.log(`🌐 Your site should be available at: https://${projectName}.pages.dev`);
    
    if (environment === 'production') {
      console.log(`🔗 Custom domain: https://${domain}`);
    }
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Make sure you have wrangler installed: pnpm add -g wrangler');
    console.log('2. Make sure you are logged in: wrangler login');
    console.log('3. Check your Cloudflare account and project settings');
    process.exit(1);
  }
}

async function main() {
  const domain = process.argv[2];
  const environment = process.argv[3] || 'production';
  
  if (!domain) {
    console.error('Error: Domain is required');
    await printUsage();
    process.exit(1);
  }
  
  const availableDomains = await discoverAvailableDomains();
  
  if (!availableDomains.includes(domain)) {
    console.error(`Error: Unknown domain "${domain}"`);
    await printUsage();
    process.exit(1);
  }
  
  if (!['production', 'preview'].includes(environment)) {
    console.error('Error: Environment must be "production" or "preview"');
    await printUsage();
    process.exit(1);
  }
  
  await deployToCloudflare(domain, environment);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  });
}

module.exports = { 
  generateProjectName, 
  getCloudflareProjects, 
  prepareBuildForCloudflare,
  deployToCloudflare
};
