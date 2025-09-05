/**
 * Script to clear all test data from Sanity
 * Run with: node scripts/clear-data.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2025-08-20',
  token: process.env.SANITY_API_TOKEN, // Need write permissions
});

const testDataIds = [
  // Campaigns
  'campaign-viver-lisboa',
  'campaign-viver-avenidas', 
  'campaign-viver-alvalade',
  
  // Proposals
  'proposal-habitacao-acessivel',
  'proposal-transportes-gratuitos',
  'proposal-lisboa-verde',
  'proposal-cultura-acessivel',
  
  // Events
  'event-comicio-abertura',
  'event-debate-habitacao',
  'event-arruada-avenidas',
  
  // Posts
  'post-lancamento-campanha',
  'post-propostas-habitacao',
  'post-apoio-candidatura',
  
  // Pages
  'page-sobre',
];

async function clearData() {
  try {
    console.log('🗑️  Starting data cleanup...');

    for (const id of testDataIds) {
      try {
        await client.delete(id);
        console.log(`✅ Deleted: ${id}`);
      } catch (error) {
        if (error.statusCode === 404) {
          console.log(`⏭️  Skipping (not found): ${id}`);
        } else {
          console.log(`❌ Error deleting ${id}:`, error.message);
        }
      }
    }

    console.log('🎉 Data cleanup completed!');

  } catch (error) {
    console.error('❌ Error clearing data:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  clearData();
}

module.exports = { clearData };
