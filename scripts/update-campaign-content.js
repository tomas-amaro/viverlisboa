require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Need write permissions
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-20'
})

async function updateCampaignContent() {
  try {
    console.log('🔍 Finding campaigns to update...')
    
    // Find the default campaign (you can modify this query as needed)
    const campaigns = await client.fetch(`
      *[_type == "campaign"] {
        _id,
        title,
        domain
      }
    `)
    
    if (!campaigns.length) {
      console.log('⚠️  No campaigns found. Please create a campaign first.')
      return
    }

    for (const campaign of campaigns) {
      console.log(`📝 Updating campaign: ${campaign.title}`)
      
      const updateData = {
        headerContent: {
          tagline: "Juntos por uma cidade mais justa, sustentável e democrática"
        },
        footerContent: {
          description: "Uma coligação de esquerda comprometida com a transformação social e ambiental das nossas comunidades. Trabalhamos por uma cidade mais justa, sustentável e próspera para todos.",
          contactInfo: {
            phone: "+351 213 XXX XXX",
            email: `geral@${campaign.domain}`,
            address: "Lisboa, Portugal"
          },
          quickLinks: [
            { linkType: "proposals" },
            { linkType: "events" },
            { linkType: "news" },
            { label: "Como Apoiar", linkType: "external", externalUrl: "https://apoiar.viverlisboa.pt" },
            { linkType: "external", label: "Contacto", externalUrl: "/contacto" }
          ]
        }
      }

      const result = await client
        .patch(campaign._id)
        .set(updateData)
        .commit()

      console.log(`✅ Updated campaign: ${result.title}`)
    }
    
    console.log('🎉 Campaign content update completed!')
    console.log('📋 Updated content includes:')
    console.log('   • Header tagline for mobile menu')
    console.log('   • Footer description')
    console.log('   • Contact information (phone, email, address)')
    console.log('   • Quick links menu')
    console.log('')
    console.log('🔧 You can now customize this content in the Sanity Studio under:')
    console.log('   • "Conteúdo do Cabeçalho" for header settings')
    console.log('   • "Conteúdo do Rodapé" for footer settings')
    
  } catch (error) {
    console.error('❌ Error updating campaign content:', error.message)
    console.error(error)
    process.exit(1)
  }
}

updateCampaignContent()
