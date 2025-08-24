#!/usr/bin/env node

/**
 * Build script for domain-specific builds
 * Usage: node scripts/build-domain.js <domain>
 * Example: node scripts/build-domain.js viverlisboa.pt
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Available domains
const AVAILABLE_DOMAINS = [
  'viverlisboa.pt',
  'viveravenidas.pt',
  'viveralvalade.pt'
];

function printUsage() {
  console.log('Usage: node scripts/build-domain.js <domain>');
  console.log('');
  console.log('Available domains:');
  AVAILABLE_DOMAINS.forEach(domain => {
    console.log(`  - ${domain}`);
  });
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/build-domain.js viverlisboa.pt');
  console.log('  node scripts/build-domain.js viveravenidas.pt');
}

function main() {
  const domain = process.argv[2];
  
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
  main();
}

module.exports = { AVAILABLE_DOMAINS };
