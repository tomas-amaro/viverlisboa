#!/usr/bin/env node

/**
 * Deploy a domain-specific build
 * Usage: node scripts/deploy-domain.js <domain> [platform]
 * 
 * Platforms: vercel, netlify, manual
 * Example: node scripts/deploy-domain.js viverlisboa.pt vercel
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { AVAILABLE_DOMAINS } = require('./build-domain');

function printUsage() {
  console.log('Usage: node scripts/deploy-domain.js <domain> [platform]');
  console.log('');
  console.log('Available domains:');
  AVAILABLE_DOMAINS.forEach(domain => {
    console.log(`  - ${domain}`);
  });
  console.log('');
  console.log('Available platforms:');
  console.log('  - vercel (default)');
  console.log('  - netlify');
  console.log('  - manual');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/deploy-domain.js viverlisboa.pt vercel');
  console.log('  node scripts/deploy-domain.js viveravenidas.pt netlify');
  console.log('  node scripts/deploy-domain.js viveralvalade.pt manual');
}

function deployToVercel(domain, buildDir) {
  console.log(`🚀 Deploying ${domain} to Vercel...`);
  
  try {
    // Check if vercel CLI is installed
    execSync('vercel --version', { stdio: 'pipe' });
  } catch (error) {
    throw new Error('Vercel CLI not installed. Run: pnpm add -g vercel');
  }
  
  // Deploy with vercel
  const deployCmd = `vercel --prod --name=${domain.replace('.', '-')} --cwd="${buildDir}"`;
  console.log(`Running: ${deployCmd}`);
  execSync(deployCmd, { stdio: 'inherit' });
  
  console.log(`✅ ${domain} deployed to Vercel successfully!`);
}

function deployToNetlify(domain, buildDir) {
  console.log(`🚀 Deploying ${domain} to Netlify...`);
  
  try {
    // Check if netlify CLI is installed
    execSync('netlify --version', { stdio: 'pipe' });
  } catch (error) {
    throw new Error('Netlify CLI not installed. Run: pnpm add -g netlify-cli');
  }
  
  // Deploy with netlify
  const deployCmd = `netlify deploy --prod --dir="${buildDir}" --site=${domain.replace('.', '-')}`;
  console.log(`Running: ${deployCmd}`);
  execSync(deployCmd, { stdio: 'inherit' });
  
  console.log(`✅ ${domain} deployed to Netlify successfully!`);
}

function deployManual(domain, buildDir) {
  console.log(`📁 Manual deployment for ${domain}`);
  console.log('');
  console.log('Build is ready at:', buildDir);
  console.log('');
  console.log('Manual deployment steps:');
  console.log('1. Upload the contents of the build directory to your server');
  console.log('2. Configure your web server to serve the static files');
  console.log('3. Set up SSL certificate for the domain');
  console.log('4. Configure DNS to point to your server');
  console.log('');
  console.log('For static hosting services:');
  console.log('- Upload the "out" or ".next" directory contents');
  console.log('- Configure domain settings in your hosting provider');
  console.log('');
  console.log(`✅ ${domain} build ready for manual deployment!`);
}

function main() {
  const domain = process.argv[2];
  const platform = process.argv[3] || 'vercel';
  
  if (!domain) {
    console.error('Error: Domain is required');
    printUsage();
    process.exit(1);
  }
  
  if (!AVAILABLE_DOMAINS.includes(domain)) {
    console.error(`Error: Unknown domain "${domain}"`);
    printUsage();
    process.exit(1);
  }
  
  const buildDir = path.join(process.cwd(), 'builds', domain);
  
  if (!fs.existsSync(buildDir)) {
    console.error(`Error: Build directory not found: ${buildDir}`);
    console.log('Run the build first:');
    console.log(`  node scripts/build-domain.js ${domain}`);
    process.exit(1);
  }
  
  try {
    switch (platform) {
      case 'vercel':
        deployToVercel(domain, buildDir);
        break;
      case 'netlify':
        deployToNetlify(domain, buildDir);
        break;
      case 'manual':
        deployManual(domain, buildDir);
        break;
      default:
        console.error(`Error: Unknown platform "${platform}"`);
        printUsage();
        process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Deployment failed:`, error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
