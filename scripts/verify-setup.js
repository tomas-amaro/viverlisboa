#!/usr/bin/env node

/**
 * Verification script to check deployment setup
 * Usage: node scripts/verify-setup.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Verifying deployment setup...\n');

const checks = [];
let allPassed = true;

function check(name, condition, successMsg, failMsg, fix = null) {
  const passed = condition();
  checks.push({ name, passed, successMsg, failMsg, fix });
  if (passed) {
    console.log(`✅ ${name}: ${successMsg}`);
  } else {
    console.log(`❌ ${name}: ${failMsg}`);
    if (fix) {
      console.log(`   💡 Fix: ${fix}`);
    }
    allPassed = false;
  }
}

// Check 1: GitHub workflow file exists
check(
  'GitHub Workflow',
  () => fs.existsSync('.github/workflows/deploy.yml'),
  'GitHub Actions workflow is configured',
  'GitHub Actions workflow file is missing',
  'Make sure .github/workflows/deploy.yml exists'
);

// Check 2: Deployment scripts exist
check(
  'Deployment Scripts',
  () => fs.existsSync('scripts/deploy-cloudflare.js'),
  'Cloudflare deployment script is ready',
  'Cloudflare deployment script is missing',
  'Make sure scripts/deploy-cloudflare.js exists'
);

// Check 3: Build scripts work
check(
  'Build Scripts',
  () => {
    try {
      const result = execSync('node scripts/build-domain.js', { encoding: 'utf8', stdio: 'pipe' });
      return result.includes('Available domains');
    } catch {
      return false;
    }
  },
  'Build scripts are functional',
  'Build scripts have issues',
  'Check scripts/build-domain.js for errors'
);

// Check 4: Package.json has new scripts
check(
  'NPM Scripts',
  () => {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    return packageJson.scripts['deploy:cloudflare'] && 
           packageJson.scripts['deploy:cf:lisboa'];
  },
  'NPM scripts are configured',
  'NPM scripts are missing',
  'Update package.json with Cloudflare deployment scripts'
);

// Check 5: Environment variables template
check(
  'Documentation',
  () => fs.existsSync('DEPLOYMENT.md'),
  'Deployment documentation is available',
  'Deployment documentation is missing',
  'Create DEPLOYMENT.md with setup instructions'
);

// Check 6: Wrangler config
check(
  'Wrangler Config',
  () => fs.existsSync('wrangler.toml'),
  'Wrangler configuration is present',
  'Wrangler configuration is missing (optional)',
  'wrangler.toml provides additional Cloudflare configuration'
);

// Check 7: Node modules
check(
  'Dependencies',
  () => fs.existsSync('node_modules') && fs.existsSync('node_modules/next'),
  'Dependencies are installed',
  'Dependencies need to be installed',
  'Run: npm install'
);

// Check 8: TypeScript compilation
check(
  'TypeScript',
  () => {
    try {
      execSync('npm run type-check', { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  },
  'TypeScript compiles without errors',
  'TypeScript has compilation errors',
  'Run: npm run type-check to see errors'
);

console.log('\n' + '='.repeat(50));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(50));

const passed = checks.filter(c => c.passed).length;
const total = checks.length;

console.log(`✅ Passed: ${passed}/${total}`);

if (!allPassed) {
  console.log(`❌ Failed: ${total - passed}/${total}\n`);
  
  console.log('🚨 Issues to fix:');
  checks.filter(c => !c.passed).forEach(check => {
    console.log(`   • ${check.name}: ${check.failMsg}`);
    if (check.fix) {
      console.log(`     💡 ${check.fix}`);
    }
  });
} else {
  console.log('\n🎉 All checks passed! Your deployment setup is ready.');
  
  console.log('\n📋 Next steps:');
  console.log('   1. Set up GitHub secrets (see DEPLOYMENT.md)');
  console.log('   2. Create Cloudflare Pages projects');
  console.log('   3. Push to GitHub to trigger deployment');
  console.log('   4. Test with: git push origin feature-branch');
}

console.log('\n📚 For detailed setup instructions, see: DEPLOYMENT.md');
console.log('🔧 For local testing, run: npm run build:all');

process.exit(allPassed ? 0 : 1);
