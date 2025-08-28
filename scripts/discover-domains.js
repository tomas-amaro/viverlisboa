#!/usr/bin/env node

/**
 * Discover available domains from Sanity CMS
 * Usage: node scripts/discover-domains.js [--json] [--validate]
 */

const { execSync } = require('child_process');
const path = require('path');

// Smart logger that outputs JSON in --json mode, human-readable otherwise
const isJsonMode = process.argv.includes('--json');
const log = (...args) => {
  if (isJsonMode) {
    console.error(JSON.stringify({ level: 'info', message: args.join(' '), timestamp: new Date().toISOString() }));
  } else {
    console.log(...args);
  }
};
const warn = (...args) => {
  if (isJsonMode) {
    console.error(JSON.stringify({ level: 'warn', message: args.join(' '), timestamp: new Date().toISOString() }));
  } else {
    console.warn(...args);
  }
};
const logError = (message, errorData = {}) => {
  if (isJsonMode) {
    console.log(JSON.stringify({ error: message, ...errorData }, null, 2));
  } else {
    console.error('\n❌ Failed to discover domains:', message);
  }
};

// Import Sanity client - we'll use a dynamic import since it's TypeScript
async function getSanityClient() {
  try {
    // Try to build the client module first if it doesn't exist
    const clientPath = path.join(process.cwd(), 'src/sanity/lib/client.ts');
    
    // Use tsx to run TypeScript files directly
    const { createClient } = await import('@sanity/client');
    
    // Get environment variables
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-20';
    const token = process.env.SANITY_API_TOKEN;
    
    if (!projectId) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required. Set it in your .env.local or environment.');
    }
    
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false, // Always get fresh data for builds
      perspective: 'published', // Only published content
    });
    
    return client;
  } catch (error) {
    console.error('❌ Failed to create Sanity client:', error.message);
    
    if (error.message.includes('NEXT_PUBLIC_SANITY_PROJECT_ID')) {
      console.error('💡 Make sure to set your Sanity environment variables:');
      console.error('   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id');
      console.error('   NEXT_PUBLIC_SANITY_DATASET=production');
      console.error('   SANITY_API_TOKEN=your_token (optional for public data)');
      console.error('');
      console.error('   You can find these in your Sanity dashboard or .env.local file');
    }
    
    throw error;
  }
}

async function discoverDomainsFromSanity() {
  log('🔍 Discovering available domains from Sanity CMS...');
  
  try {
    const client = await getSanityClient();
    
    // Query all published campaigns with their domains
    const query = `*[_type == "campaign" && defined(domain)] | order(title asc) {
      _id,
      title,
      domain,
      location,
      slug,
      mainColor,
      secondaryColor,
      description,
      socialMedia
    }`;
    
    log('📡 Fetching campaigns from Sanity...');
    const campaigns = await client.fetch(query);
    
    if (!campaigns || campaigns.length === 0) {
      warn('⚠️  No campaigns found in Sanity CMS');
      log('💡 Make sure you have created campaigns in your Sanity Studio');
      log('   Each campaign should have a "domain" field set (e.g., "viverlisboa.pt")');
      return [];
    }
    
    log(`✅ Found ${campaigns.length} campaigns in Sanity:`);
    campaigns.forEach(campaign => {
      log(`   • ${campaign.title} (${campaign.domain}) - ${campaign.location}`);
    });
    
    return campaigns;
    
  } catch (error) {
    console.error('❌ Failed to fetch campaigns from Sanity:', error.message);
    
    // Provide helpful error messages for common issues
    if (error.message.includes('Permission denied')) {
      console.error('💡 This might be a permissions issue. Try:');
      console.error('   1. Make sure your SANITY_API_TOKEN has read permissions');
      console.error('   2. Check if your campaigns are published (not drafts)');
      console.error('   3. Verify your project ID and dataset are correct');
    } else if (error.message.includes('fetch')) {
      console.error('💡 This might be a network issue. Check your internet connection.');
    }
    
    throw error;
  }
}

function generateDomainConfig(campaigns) {
  const domainConfigs = {};
  
  campaigns.forEach(campaign => {
    domainConfigs[campaign.domain] = {
      domain: campaign.domain,
      title: campaign.title,
      slug: campaign.slug?.current || campaign.domain.replace('.pt', '').replace('.', '-'),
      description: campaign.description || `Campaign ${campaign.title}`,
      location: campaign.location,
      mainColor: campaign.mainColor || '#48B9CA',
      secondaryColor: campaign.secondaryColor || '#FF394C',
      socialMedia: campaign.socialMedia || {},
    };
  });
  
  return domainConfigs;
}

async function validateDomains(campaigns) {
  log('🔍 Validating domain configurations...');
  
  const issues = [];
  
  campaigns.forEach(campaign => {
    if (!campaign.domain) {
      issues.push(`Campaign "${campaign.title}" is missing a domain`);
    } else if (!campaign.domain.includes('.')) {
      issues.push(`Campaign "${campaign.title}" has invalid domain format: ${campaign.domain}`);
    }
    
    if (!campaign.title) {
      issues.push(`Campaign with domain "${campaign.domain}" is missing a title`);
    }
    
    if (!campaign.mainColor) {
      issues.push(`Campaign "${campaign.title}" is missing mainColor`);
    } else if (!campaign.mainColor.match(/^#[0-9A-Fa-f]{6}$/)) {
      issues.push(`Campaign "${campaign.title}" has invalid mainColor format: ${campaign.mainColor}`);
    }
  });
  
  if (issues.length > 0) {
    log('⚠️  Found validation issues:');
    issues.forEach(issue => log(`   • ${issue}`));
    log('');
    log('💡 Please fix these issues in your Sanity Studio');
    return false;
  }
  
  log('✅ All domain configurations are valid');
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes('--json');
  const validateOnly = args.includes('--validate');
  
  try {
    const campaigns = await discoverDomainsFromSanity();
    
    if (campaigns.length === 0) {
      if (jsonOutput) {
        console.log(JSON.stringify({ domains: [], campaigns: [] }, null, 2));
      }
      process.exit(1);
    }
    
    // Validate domains if requested
    if (validateOnly) {
      const isValid = await validateDomains(campaigns);
      process.exit(isValid ? 0 : 1);
    }
    
    // Extract domains
    const domains = campaigns.map(c => c.domain).filter(Boolean);
    const domainConfigs = generateDomainConfig(campaigns);
    
    if (jsonOutput) {
      // Output JSON for consumption by other scripts
      console.log(JSON.stringify({
        domains,
        campaigns,
        domainConfigs
      }, null, 2));
    } else {
      log('');
      log('📋 Available domains:');
      domains.forEach(domain => log(`   • ${domain}`));
      
      log('');
      log('🏗️  To build all domains: pnpm build:all');
      log('🚀 To deploy all domains: pnpm deploy:all');
      
      domains.forEach(domain => {
        log(`   • Build ${domain}: node scripts/build-domain.js ${domain}`);
      });
    }
    
  } catch (error) {
    logError(error.message, { domains: [], campaigns: [] });
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  discoverDomainsFromSanity,
  generateDomainConfig,
  validateDomains
};
