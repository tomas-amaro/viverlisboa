#!/usr/bin/env node

/**
 * Build script for domain-specific builds
 * Usage: node scripts/build-domain.js <domain>
 * Example: node scripts/build-domain.js viverlisboa.pt
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Dynamic domain discovery
let AVAILABLE_DOMAINS = [];

async function discoverAvailableDomains() {
  if (AVAILABLE_DOMAINS.length > 0) {
    return AVAILABLE_DOMAINS; // Already cached
  }
  
  try {
    console.log('🔍 Discovering domains from Sanity...');
    const { discoverDomainsFromSanity } = require('./discover-domains');
    const campaigns = await discoverDomainsFromSanity();
    AVAILABLE_DOMAINS = campaigns.map(c => c.domain).filter(Boolean);
    
    if (AVAILABLE_DOMAINS.length === 0) {
      console.warn('⚠️  No domains found in Sanity, falling back to hardcoded defaults');
      AVAILABLE_DOMAINS = [
        'viverlisboa.pt',
        'viveravenidas.pt',
        'viveralvalade.pt'
      ];
    }
    
    return AVAILABLE_DOMAINS;
  } catch (error) {
    console.warn('⚠️  Failed to discover domains from Sanity, using hardcoded defaults:', error.message);
    AVAILABLE_DOMAINS = [
      'viverlisboa.pt',
      'viveravenidas.pt',
      'viveralvalade.pt'
    ];
    return AVAILABLE_DOMAINS;
  }
}

async function printUsage() {
  console.log('Usage: node scripts/build-domain.js <domain>');
  console.log('');
  console.log('Available domains:');
  
  const domains = await discoverAvailableDomains();
  domains.forEach(domain => {
    console.log(`  - ${domain}`);
  });
  
  console.log('');
  console.log('Examples:');
  console.log(`  node scripts/build-domain.js ${domains[0] || 'viverlisboa.pt'}`);
  console.log(`  node scripts/build-domain.js ${domains[1] || 'viveravenidas.pt'}`);
  console.log('');
  console.log('💡 Domains are discovered dynamically from your Sanity CMS');
}

async function main() {
  const domain = process.argv[2];
  
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
  
  console.log(`🚀 Building for domain: ${domain}`);
  console.log('');
  
  try {
    // Set environment variables and build
    const env = {
      ...process.env,
      CAMPAIGN_DOMAIN: domain,
      NODE_ENV: 'production'
    };
    
    // Run the build
    console.log('📦 Running Next.js build...');
    execSync('next build', { 
      stdio: 'inherit',
      env: env
    });
    
    // Create domain-specific output directory
    const outputDir = path.join(process.cwd(), 'builds', domain);
    if (!fs.existsSync(path.dirname(outputDir))) {
      fs.mkdirSync(path.dirname(outputDir), { recursive: true });
    }
    
    // Move build output to domain-specific directory
    console.log(`📁 Moving build output to builds/${domain}/`);
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
    
    // Copy .next directory to domain-specific builds folder
    execSync(`cp -r .next "${outputDir}"`, { stdio: 'inherit' });
    
    // Copy other necessary files
    const filesToCopy = ['public', 'package.json', 'next.config.js'];
    filesToCopy.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`📋 Copying ${file}...`);
        execSync(`cp -r "${file}" "${outputDir}/"`, { stdio: 'inherit' });
      }
    });
    
    // Create a deployment info file
    const deploymentInfo = {
      domain: domain,
      buildDate: new Date().toISOString(),
      nodeVersion: process.version,
      nextVersion: require('../package.json').dependencies.next
    };
    
    fs.writeFileSync(
      path.join(outputDir, 'deployment-info.json'),
      JSON.stringify(deploymentInfo, null, 2)
    );
    
    console.log('');
    console.log('✅ Build completed successfully!');
    console.log(`📁 Output directory: builds/${domain}/`);
    console.log('');
    console.log('To serve this build:');
    console.log(`  cd builds/${domain}`);
    console.log('  npm start');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  });
}

module.exports = { 
  discoverAvailableDomains,
  AVAILABLE_DOMAINS: () => AVAILABLE_DOMAINS // Function to get current domains
};
