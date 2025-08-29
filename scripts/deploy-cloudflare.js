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
  // Convert domain to project name by removing any TLD
  // e.g., viverlisboa.pt -> viverlisboa, example.com -> example, site.net -> site
  return domain.replace(/\.[^.]+$/, '');
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
  const outputDir = path.join(process.cwd(), 'out');
  
  console.log('🔄 Preparing build for Cloudflare Pages...');
  
  // Check if static export exists (should exist from workflow build step)
  if (!fs.existsSync(outputDir)) {
    throw new Error(`Static export not found at ${outputDir}. Make sure the build step completed successfully.`);
  }
  
  console.log('✅ Using static export from build step');
    
  try {
    
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

// Test Cloudflare API connectivity and authentication
async function testCloudflareAuth() {
  console.log('🔐 Testing Cloudflare authentication...');
  
  // Check if required environment variables are set
  if (!process.env.CLOUDFLARE_API_TOKEN) {
    throw new Error('❌ CLOUDFLARE_API_TOKEN environment variable is required');
  }
  if (!process.env.CLOUDFLARE_ACCOUNT_ID) {
    throw new Error('❌ CLOUDFLARE_ACCOUNT_ID environment variable is required');  
  }
  
  console.log('✅ Environment variables are set');
  console.log(`📋 Account ID: ${process.env.CLOUDFLARE_ACCOUNT_ID}`);
  console.log(`🔑 API Token: ${process.env.CLOUDFLARE_API_TOKEN.substring(0, 10)}...`);
  
  try {
    // Test API connectivity by listing projects
    console.log('📡 Testing API connectivity...');
    const testCmd = 'wrangler pages project list';
    execSync(testCmd, { stdio: 'pipe' }); // Just test if command works
    
    console.log('✅ API connection successful!');
    return true;
    
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Verify your Cloudflare API token has the correct permissions');
    console.log('2. Check that the account ID is correct');
    console.log('3. Ensure the API token includes "Cloudflare Pages:Edit" permission');
    console.log('4. Try: wrangler auth login');
    throw new Error('Cloudflare authentication failed');
  }
}

// Ensure Cloudflare Pages project exists by attempting to create it
async function ensureProjectExists(projectName) {
  console.log(`📦 Ensuring project "${projectName}" exists...`);
  
  try {
    const createCmd = `wrangler pages project create "${projectName}"`;
    execSync(createCmd, { stdio: 'inherit' });
    console.log(`✅ Project "${projectName}" created successfully`);
    return true;
    
  } catch (createError) {
    // If project already exists, that's fine
    if (createError.message.includes('already exists') || createError.message.includes('already taken') || createError.message.includes('already in use')) {
      console.log(`✅ Project "${projectName}" already exists`);
      return true;
    }
    
    console.error(`❌ Failed to create project "${projectName}": ${createError.message}`);
    console.log('📝 Will attempt deployment anyway...');
    return false;
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
    // Test Cloudflare authentication and API connectivity first
    await testCloudflareAuth();
    console.log('');
    
    // Ensure project exists before deployment
    const projectReady = await ensureProjectExists(projectName);
    if (!projectReady) {
      console.warn('⚠️  Project creation may have failed, but continuing with deployment...');
    }
    
    // For Cloudflare Pages, production vs preview is determined by branch
    const wranglerCmd = environment === 'production' 
      ? `wrangler pages deploy "${outputDir}" --project-name="${projectName}"`
      : `wrangler pages deploy "${outputDir}" --project-name="${projectName}" --branch="preview"`;
      
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
