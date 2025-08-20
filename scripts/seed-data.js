/**
 * Seed script to populate Sanity with test data
 * Run with: node scripts/seed-data.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2025-08-20',
  token: process.env.SANITY_API_TOKEN, // Need write permissions
});

// Sample data
const sampleData = {
  campaigns: [
    {
      _id: 'campaign-viver-lisboa',
      _type: 'campaign',
      title: 'Viver Lisboa',
      slug: { current: 'viver-lisboa' },
      description: 'Coligação de esquerda para uma Lisboa mais justa, sustentável e democrática.',
      domain: 'viverlisboa.pt',
      location: 'Lisboa',
      mainColor: '#48B9CA',
      secondaryColor: '#FF394C',
      socialMedia: {
        facebook: 'https://facebook.com/viverlisboa',
        instagram: 'https://instagram.com/viverlisboa',
        twitter: 'https://twitter.com/viverlisboa',
      },
      // Note: logo field omitted - upload images through Sanity Studio and reference them
    },
    {
      _id: 'campaign-viver-avenidas',
      _type: 'campaign',
      title: 'Viver Avenidas Novas',
      slug: { current: 'viver-avenidas' },
      description: 'A nossa proposta para as Avenidas Novas - proximidade, inovação e qualidade de vida.',
      domain: 'viveravenidas.pt',
      location: 'Avenidas Novas',
      mainColor: '#48B9CA',
      secondaryColor: '#7D3C4B',
      socialMedia: {
        facebook: 'https://facebook.com/viveravenidas',
        instagram: 'https://instagram.com/viveravenidas',
      },
      // Note: logo field omitted - upload images through Sanity Studio and reference them
    },
    {
      _id: 'campaign-viver-alvalade',
      _type: 'campaign',
      title: 'Viver Alvalade',
      slug: { current: 'viver-alvalade' },
      description: 'Propostas concretas para Alvalade - uma freguesia que cuida das pessoas e do ambiente.',
      domain: 'viveralvalade.pt',
      location: 'Alvalade',
      mainColor: '#48B9CA',
      secondaryColor: '#FF394C',
      // Note: logo field omitted - upload images through Sanity Studio and reference them
    },
  ],

  proposals: [
    {
      _id: 'proposal-habitacao-acessivel',
      _type: 'proposal',
      title: 'Habitação Acessível para Todos',
      slug: { current: 'habitacao-acessivel' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      category: 'habitacao',
      summary: 'Programa abrangente para garantir habitação digna e acessível a todas as famílias lisboetas, com foco na criação de habitação pública e controlo de preços.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'A habitação é um direito fundamental que deve estar ao alcance de todas as famílias. A nossa proposta inclui:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Construção de 10.000 novas habitações sociais até 2030' }]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Programa de apoio ao arrendamento jovem' }]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Regulação do mercado imobiliário para prevenir especulação' }]
        }
      ],
      priority: 'high',
      featured: true,
      tags: ['habitação', 'social', 'jovens', 'famílias'],
    },
    {
      _id: 'proposal-transportes-gratuitos',
      _type: 'proposal',
      title: 'Transportes Públicos Gratuitos',
      slug: { current: 'transportes-gratuitos' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      category: 'transportes',
      summary: 'Implementação progressiva da gratuitidade dos transportes públicos em Lisboa, começando pelos jovens e idosos.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Os transportes públicos devem ser um serviço público universal. Vamos implementar:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Transportes gratuitos para menores de 18 e maiores de 65 anos' }]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Expansão progressiva para toda a população' }]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Melhoria da qualidade e frequência dos serviços' }]
        }
      ],
      priority: 'high',
      featured: true,
      tags: ['transportes', 'mobilidade', 'ambiente', 'social'],
    },
    {
      _id: 'proposal-lisboa-verde',
      _type: 'proposal',
      title: 'Lisboa Verde e Sustentável',
      slug: { current: 'lisboa-verde' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      category: 'ambiente',
      summary: 'Aumentar significativamente as áreas verdes e promover a sustentabilidade urbana através de corredores ecológicos e energias renováveis.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Lisboa precisa de mais verde e sustentabilidade. As nossas medidas incluem:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Criação de 50 novos jardins e parques urbanos' }]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Corredores verdes conectando toda a cidade' }]
        },
        {
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{ _type: 'span', text: 'Transição energética para 100% renováveis até 2030' }]
        }
      ],
      priority: 'medium',
      featured: false,
      tags: ['ambiente', 'sustentabilidade', 'parques', 'energia'],
    },
    {
      _id: 'proposal-cultura-acessivel',
      _type: 'proposal',
      title: 'Cultura Acessível e Descentralizada',
      slug: { current: 'cultura-acessivel' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      category: 'cultura',
      summary: 'Democratizar o acesso à cultura através de programas descentralizados e apoio aos artistas locais.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'A cultura deve estar ao alcance de todos os lisboetas. Propomos:'
            }
          ]
        }
      ],
      priority: 'medium',
      featured: false,
      tags: ['cultura', 'arte', 'comunidade'],
    },
  ],

  events: [
    {
      _id: 'event-comicio-abertura',
      _type: 'event',
      title: 'Comício de Abertura de Campanha',
      slug: { current: 'comicio-abertura' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      date: '2025-02-01',
      time: '18:00',
      location: 'Marquês de Pombal, Lisboa',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Junte-se a nós no lançamento oficial da campanha Viver Lisboa. Será um momento histórico para apresentar as nossas propostas e candidatos para uma Lisboa mais justa e democrática.'
            }
          ]
        }
      ],
      eventType: 'comicio',
      featured: true,
    },
    {
      _id: 'event-debate-habitacao',
      _type: 'event',
      title: 'Debate: Habitação em Lisboa',
      slug: { current: 'debate-habitacao' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      date: '2025-02-15',
      time: '19:30',
      location: 'Auditório da Junta de Freguesia de Alvalade',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Debate aberto sobre as soluções para a crise habitacional em Lisboa. Participação de especialistas, candidatos e cidadãos.'
            }
          ]
        }
      ],
      eventType: 'debate',
      featured: false,
    },
    {
      _id: 'event-arruada-avenidas',
      _type: 'event',
      title: 'Arruada nas Avenidas Novas',
      slug: { current: 'arruada-avenidas' },
      campaign: { _ref: 'campaign-viver-avenidas', _type: 'reference' },
      date: '2025-02-20',
      time: '10:00',
      location: 'Avenida da República',
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Venha conhecer os nossos candidatos e propostas para as Avenidas Novas numa arruada pela freguesia.'
            }
          ]
        }
      ],
      eventType: 'arruada',
      featured: false,
    },
  ],

  posts: [
    {
      _id: 'post-lancamento-campanha',
      _type: 'post',
      title: 'Lançamento da Campanha Viver Lisboa',
      slug: { current: 'lancamento-campanha' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      publishedAt: '2025-01-15T10:00:00Z',
      excerpt: 'Hoje marcamos o início oficial da nossa campanha para as eleições autárquicas de Lisboa. Uma coligação de esquerda unida por uma visão comum.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'É com grande entusiasmo que anunciamos o lançamento oficial da campanha Viver Lisboa, uma coligação que une PS, Livre, BE e PAN numa visão comum para o futuro da nossa cidade.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: 'Uma Visão Partilhada' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'As nossas propostas assentam em três pilares fundamentais: justiça social, sustentabilidade ambiental e participação democrática.'
            }
          ]
        }
      ],
      categories: ['campanha'],
    },
    {
      _id: 'post-propostas-habitacao',
      _type: 'post',
      title: 'As Nossas Propostas para a Habitação',
      slug: { current: 'propostas-habitacao' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      publishedAt: '2025-01-20T14:30:00Z',
      excerpt: 'Apresentamos o nosso programa detalhado para resolver a crise habitacional em Lisboa, com medidas concretas e cronograma de implementação.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'A habitação é uma das maiores preocupações dos lisboetas. Apresentamos aqui as nossas propostas concretas para resolver esta crise.'
            }
          ]
        }
      ],
      categories: ['propostas'],
    },
    {
      _id: 'post-apoio-candidatura',
      _type: 'post',
      title: 'Como Apoiar a Nossa Candidatura',
      slug: { current: 'como-apoiar' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      publishedAt: '2025-01-25T16:00:00Z',
      excerpt: 'Descubra as diferentes formas de apoiar a campanha Viver Lisboa e participar ativamente na construção de uma cidade mais justa.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'A sua participação é fundamental para o sucesso da nossa campanha. Existem várias formas de apoiar:'
            }
          ]
        }
      ],
      categories: ['campanha'],
    },
  ],

  pages: [
    {
      _id: 'page-sobre',
      _type: 'page',
      title: 'Sobre Nós',
      slug: { current: 'sobre' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      seo: {
        title: 'Sobre a Coligação Viver Lisboa',
        description: 'Conheça a coligação de esquerda que une PS, Livre, BE e PAN numa visão comum para Lisboa.',
        keywords: ['sobre', 'coligação', 'PS', 'Livre', 'BE', 'PAN', 'Lisboa'],
      },
      content: [
        {
          _type: 'hero',
          title: 'Uma Coligação para Lisboa',
          subtitle: 'PS, Livre, BE e PAN unidos por uma cidade melhor',
          ctaText: 'Conhecer Propostas',
          ctaUrl: '/propostas',
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'A coligação Viver Lisboa representa a união da esquerda democrática numa visão partilhada para o futuro da nossa cidade.'
            }
          ]
        }
      ],
    },
    {
      _id: 'page-contacto',
      _type: 'page',
      title: 'Contacto',
      slug: { current: 'contacto' },
      campaign: { _ref: 'campaign-viver-lisboa', _type: 'reference' },
      seo: {
        title: 'Contacto - Viver Lisboa',
        description: 'Entre em contacto com a campanha Viver Lisboa. Estamos aqui para ouvir as suas propostas e responder às suas questões.',
        keywords: ['contacto', 'comunicação', 'telefone', 'email'],
      },
      content: [
        {
          _type: 'block',
          style: 'h1',
          children: [{ _type: 'span', text: 'Fale Connosco' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Estamos aqui para ouvir as suas propostas, responder às suas questões e receber o seu apoio.'
            }
          ]
        }
      ],
    },
  ],
};

async function seedData() {
  try {
    console.log('🌱 Starting data seeding...');

    // Create campaigns first (referenced by other documents)
    console.log('📍 Creating campaigns...');
    for (const campaign of sampleData.campaigns) {
      await client.createOrReplace(campaign);
      console.log(`✅ Created campaign: ${campaign.title}`);
    }

    // Create proposals
    console.log('📋 Creating proposals...');
    for (const proposal of sampleData.proposals) {
      await client.createOrReplace(proposal);
      console.log(`✅ Created proposal: ${proposal.title}`);
    }

    // Create events
    console.log('📅 Creating events...');
    for (const event of sampleData.events) {
      await client.createOrReplace(event);
      console.log(`✅ Created event: ${event.title}`);
    }

    // Create posts
    console.log('📰 Creating posts...');
    for (const post of sampleData.posts) {
      await client.createOrReplace(post);
      console.log(`✅ Created post: ${post.title}`);
    }

    // Create pages
    console.log('📄 Creating pages...');
    for (const page of sampleData.pages) {
      await client.createOrReplace(page);
      console.log(`✅ Created page: ${page.title}`);
    }

    console.log('🎉 Data seeding completed successfully!');
    console.log(`
📊 Summary:
- ${sampleData.campaigns.length} campaigns
- ${sampleData.proposals.length} proposals  
- ${sampleData.events.length} events
- ${sampleData.posts.length} posts
- ${sampleData.pages.length} pages
`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData, sampleData };
