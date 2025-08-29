#!/usr/bin/env node

/**
 * Deploy Sanity webhook handler to Cloudflare Workers
 * Usage: node scripts/deploy-webhook.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function deployWebhook() {
  console.log('🚀 Deploying Sanity webhook handler to Cloudflare Workers...');
  
  const workerScript = path.join(process.cwd(), 'webhook-worker.js');
  
  if (!fs.existsSync(workerScript)) {
    throw new Error('webhook-worker.js not found. Make sure you have the worker script ready.');
  }

  try {
    // Create a basic wrangler.toml for the worker
    const wranglerConfig = `
name = "sanity-webhook-handler"
main = "webhook-worker.js"
compatibility_date = "2024-08-01"

[env.production.vars]
# Set these in Cloudflare Workers dashboard:
# GITHUB_OWNER = "your-github-username"
# GITHUB_REPO = "viverlisboa"
# GITHUB_TOKEN = "your-personal-access-token"
`;

    fs.writeFileSync('wrangler-webhook.toml', wranglerConfig);
    
    console.log('📦 Deploying worker...');
    execSync('wrangler deploy --config wrangler-webhook.toml', { stdio: 'inherit' });
    
    console.log('✅ Webhook worker deployed successfully!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Go to Cloudflare Workers dashboard');
    console.log('2. Set environment variables:');
    console.log('   - GITHUB_OWNER: your GitHub username');
    console.log('   - GITHUB_REPO: viverlisboa (or your repo name)');
    console.log('   - GITHUB_TOKEN: your personal access token');
    console.log('3. Copy the worker URL for Sanity webhook configuration');
    
    // Clean up temporary config
    fs.unlinkSync('wrangler-webhook.toml');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('');
    console.log('🔧 Make sure you have:');
    console.log('1. Wrangler CLI installed: pnpm add -g wrangler');
    console.log('2. Logged in to Cloudflare: wrangler login');
    console.log('3. The webhook-worker.js file in your project root');
    process.exit(1);
  }
}

if (require.main === module) {
  deployWebhook().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { deployWebhook };
