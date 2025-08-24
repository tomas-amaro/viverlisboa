#!/usr/bin/env node

/**
 * Build all domains in parallel
 * Usage: node scripts/build-all-domains.js
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const { AVAILABLE_DOMAINS } = require('./build-domain');

async function buildDomain(domain) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Starting build for ${domain}...`);
    
    const child = spawn('node', ['scripts/build-domain.js', domain], {
      stdio: ['inherit', 'pipe', 'pipe'],
      cwd: process.cwd()
    });
    
    let output = '';
    let error = '';
    
    child.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      // Prefix output with domain for clarity
      process.stdout.write(`[${domain}] ${text}`);
    });
    
    child.stderr.on('data', (data) => {
      const text = data.toString();
      error += text;
      process.stderr.write(`[${domain}] ${text}`);
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${domain} build completed successfully!`);
        resolve({ domain, success: true, output });
      } else {
        console.error(`❌ ${domain} build failed with code ${code}`);
        reject({ domain, success: false, error, code });
      }
    });
  });
}

async function main() {
  console.log('🏗️  Building all domains...');
  console.log(`Domains: ${AVAILABLE_DOMAINS.join(', ')}`);
  console.log('');
  
  const startTime = Date.now();
  const results = [];
  
  try {
    // Build domains in parallel
    const promises = AVAILABLE_DOMAINS.map(domain => 
      buildDomain(domain).catch(error => ({ ...error, failed: true }))
    );
    
    const buildResults = await Promise.all(promises);
    
    // Report results
    const successful = buildResults.filter(r => r.success && !r.failed);
    const failed = buildResults.filter(r => r.failed || !r.success);
    
    console.log('');
    console.log('📊 Build Summary');
    console.log('================');
    console.log(`✅ Successful: ${successful.length}`);
    successful.forEach(r => console.log(`   - ${r.domain}`));
    
    if (failed.length > 0) {
      console.log(`❌ Failed: ${failed.length}`);
      failed.forEach(r => console.log(`   - ${r.domain}`));
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`⏱️  Total time: ${duration}s`);
    
    if (failed.length > 0) {
      console.log('');
      console.error('Some builds failed. Check the output above for details.');
      process.exit(1);
    } else {
      console.log('');
      console.log('🎉 All builds completed successfully!');
      console.log('');
      console.log('📁 Build outputs:');
      successful.forEach(r => console.log(`   builds/${r.domain}/`));
    }
    
  } catch (error) {
    console.error('❌ Build process failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
