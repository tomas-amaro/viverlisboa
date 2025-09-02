const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Need write permissions
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-20'
});

async function createDefaultCampaign() {
  try {
    console.log('Creating default campaign...');
    
    const campaign = {
      _type: 'campaign',
      title: 'Viver Avenidas',
      slug: {
        _type: 'slug',
        current: 'viver-avenidas'
      },
      description: 'Uma coligação de esquerda para as Avenidas Novas. Juntos por uma freguesia mais justa, sustentável e democrática.',
      domain: 'viveravenidas.pt',
      location: 'Avenidas Novas',
      mainColor: '#48B9CA',
      secondaryColor: '#FF394C',
      contentTypes: {
        proposals: true,
        news: true,
        events: true,
        customPages: false
      },
      navigationLabels: {
        proposals: 'Propostas',
        news: 'Notícias',
        events: 'Eventos'
      },
      socialMedia: {
        facebook: 'https://facebook.com/viveravenidas',
        instagram: 'https://instagram.com/viveravenidas',
        twitter: 'https://twitter.com/viveravenidas'
      },
      seoSettings: {
        metaTitle: 'Viver Avenidas - Coligação de Esquerda',
        metaDescription: 'Uma coligação de esquerda para as Avenidas Novas. Propostas concretas para habitação, transportes, ambiente e cultura.'
      }
    };

    const result = await client.create(campaign);
    console.log('✅ Default campaign created successfully:', result._id);
    console.log('🌐 Domain:', result.domain);
    console.log('📧 Title:', result.title);
    
    return result;
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('⚠️  Campaign already exists, fetching existing one...');
      const existing = await client.fetch('*[_type == "campaign" && domain == $domain][0]', { 
        domain: 'viveravenidas.pt' 
      });
      console.log('📄 Found existing campaign:', existing?._id);
      return existing;
    }
    console.error('❌ Error creating campaign:', error);
    throw error;
  }
}

// Comprehensive sample content showcasing all features
async function createSampleContent(campaignId) {
  try {
    console.log('Creating comprehensive sample content...');
    
    // 📋 PROPOSALS - Cover all categories with different priorities
    const proposals = [
      {
        title: 'Habitação Acessível para Jovens',
        slug: 'habitacao-acessivel-jovens',
        category: 'habitacao',
        summary: 'Criar programas de habitação específicos para jovens que trabalham na freguesia, com rendas controladas e contratos de longa duração.',
        priority: 'high',
        featured: true,
        tags: ['habitação', 'jovens', 'rendas'],
        content: 'A habitação é um direito fundamental e um dos maiores desafios que os jovens enfrentam hoje. Propomos a criação de um programa municipal específico para apoiar jovens profissionais que trabalham na freguesia, oferecendo habitação com rendas controladas e contratos de longa duração. Esta iniciativa incluirá parcerias com proprietários privados e a reabilitação de edifícios devolutos.'
      },
      {
        title: 'Rede de Transportes Sustentáveis',
        slug: 'rede-transportes-sustentaveis',
        category: 'transportes',
        summary: 'Expandir a rede de ciclovias e melhorar os transportes públicos para reduzir o trânsito e as emissões de carbono.',
        priority: 'high',
        featured: true,
        tags: ['transportes', 'sustentabilidade', 'ciclovias'],
        content: 'As Avenidas Novas precisam de uma revolução na mobilidade. Propomos a criação de uma rede integrada de ciclovias seguras, a melhoria da frequência dos transportes públicos e a implementação de zonas de baixa emissão. O objetivo é reduzir o tráfego automóvel em 30% até 2030.'
      },
      {
        title: 'Corredor Verde das Avenidas',
        slug: 'corredor-verde-avenidas',
        category: 'ambiente',
        summary: 'Criar um corredor verde contínuo que conecte todos os parques e jardins da freguesia, promovendo a biodiversidade urbana.',
        priority: 'medium',
        featured: false,
        tags: ['ambiente', 'biodiversidade', 'espaços verdes'],
        content: 'Vamos transformar as Avenidas Novas numa freguesia mais verde e respirável. O projeto inclui a plantação de 1000 novas árvores, a criação de jardins verticais em edifícios públicos e a implementação de telhados verdes. Cada quarteirão terá pelo menos um espaço verde de proximidade.'
      },
      {
        title: 'Centro Cultural Comunitário',
        slug: 'centro-cultural-comunitario',
        category: 'cultura',
        summary: 'Estabelecer um espaço cultural dinâmico que sirva como centro de atividades artísticas e educativas para todas as idades.',
        priority: 'medium',
        featured: true,
        tags: ['cultura', 'comunidade', 'artes'],
        content: 'A cultura é o coração de uma comunidade vibrante. Propomos a criação de um Centro Cultural Comunitário que oferecerá oficinas de arte, espetáculos regulares, exposições de artistas locais e programas educativos para crianças e adultos. O espaço será gerido em parceria com associações locais.'
      },
      {
        title: 'Escolas do Futuro',
        slug: 'escolas-do-futuro',
        category: 'educacao',
        summary: 'Modernizar as infraestruturas escolares e implementar programas inovadores de educação digital e sustentabilidade.',
        priority: 'high',
        featured: false,
        tags: ['educação', 'tecnologia', 'infraestruturas'],
        content: 'As nossas escolas precisam de estar preparadas para o século XXI. Propomos a modernização completa das infraestruturas escolares, incluindo laboratórios de ciências, salas de informática atualizadas e espaços de aprendizagem flexíveis. Implementaremos também programas de educação digital e sustentabilidade ambiental.'
      },
      {
        title: 'Centros de Saúde de Proximidade',
        slug: 'centros-saude-proximidade',
        category: 'saude',
        summary: 'Ampliar o acesso aos cuidados de saúde primários através de centros de saúde de proximidade em cada bairro.',
        priority: 'high',
        featured: false,
        tags: ['saúde', 'proximidade', 'acessibilidade'],
        content: 'A saúde deve estar ao alcance de todos. Propomos a criação de centros de saúde de proximidade em cada grande bairro da freguesia, oferecendo consultas de medicina geral, enfermagem e serviços básicos de diagnóstico. Estes centros estarão integrados numa rede municipal de saúde.'
      },
      {
        title: 'Incubadora de Negócios Locais',
        slug: 'incubadora-negocios-locais',
        category: 'economia',
        summary: 'Apoiar o empreendedorismo local através de uma incubadora que oferece espaços, formação e mentoria para novos negócios.',
        priority: 'medium',
        featured: false,
        tags: ['economia', 'empreendedorismo', 'negócios locais'],
        content: 'O tecido económico local precisa de ser revitalizado. A nossa incubadora oferecerá espaços de coworking a preços acessíveis, formação em gestão e marketing, e programas de mentoria com empresários experientes. Daremos prioridade a negócios sustentáveis e com impacto social positivo.'
      },
      {
        title: 'Orçamento Participativo Digital',
        slug: 'orcamento-participativo-digital',
        category: 'participacao',
        summary: 'Implementar uma plataforma digital onde os cidadãos podem propor e votar em projetos para a freguesia.',
        priority: 'medium',
        featured: true,
        tags: ['participação', 'democracia', 'digital'],
        content: 'A democracia não acontece só de quatro em quatro anos. Através do orçamento participativo digital, os cidadãos poderão propor projetos para melhorar a freguesia e votar nas iniciativas que consideram prioritárias. 20% do orçamento anual será decidido desta forma.'
      }
    ];

    for (const proposal of proposals) {
      const doc = {
        _type: 'proposal',
        title: proposal.title,
        slug: { _type: 'slug', current: proposal.slug },
        campaign: { _type: 'reference', _ref: campaignId },
        category: proposal.category,
        summary: proposal.summary,
        content: [{
          _type: 'block',
          _key: `content_${proposal.slug}`,
          style: 'normal',
          children: [{
            _type: 'span',
            _key: `span_${proposal.slug}`,
            text: proposal.content
          }]
        }],
        priority: proposal.priority,
        featured: proposal.featured,
        tags: proposal.tags
      };
      
      const created = await client.create(doc);
      console.log(`✅ Proposal created: ${proposal.title} (${created._id})`);
    }

    // 📅 EVENTS - Different types and dates
    const events = [
      {
        title: 'Sessão de Esclarecimento - Propostas para a Habitação',
        slug: 'sessao-habitacao',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '18:30',
        location: 'Centro Paroquial das Avenidas Novas',
        eventType: 'apresentacao',
        featured: true,
        description: 'Venha conhecer as nossas propostas para resolver a crise da habitação na freguesia. Sessão aberta com debate e esclarecimento de dúvidas sobre habitação acessível, programas de apoio e reabilitação urbana.'
      },
      {
        title: 'Grande Comício de Abertura da Campanha',
        slug: 'comicio-abertura',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '19:00',
        location: 'Jardim do Campo Pequeno',
        eventType: 'comicio',
        featured: true,
        description: 'O grande momento de abertura oficial da nossa campanha! Junte-se a nós para conhecer toda a equipa, as nossas propostas e a visão para as Avenidas Novas. Haverá música, atividades para crianças e um lanche convívio.'
      },
      {
        title: 'Debate sobre Sustentabilidade Urbana',
        slug: 'debate-sustentabilidade',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '20:00',
        location: 'Auditório da Junta de Freguesia',
        eventType: 'debate',
        featured: false,
        description: 'Debate aberto com especialistas em sustentabilidade urbana, alterações climáticas e economia verde. Discutiremos como tornar as Avenidas Novas numa freguesia mais sustentável e resiliente.'
      },
      {
        title: 'Arruada no Mercado do Arco do Cego',
        slug: 'arruada-mercado',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '09:00',
        location: 'Mercado do Arco do Cego',
        eventType: 'arruada',
        featured: false,
        description: 'Venha conversar connosco no mercado! Estaremos presentes para ouvir as preocupações dos comerciantes e dos fregueses, distribuir material informativo e apresentar as nossas propostas para dinamizar o comércio local.'
      },
      {
        title: 'Conferência: O Futuro dos Transportes em Lisboa',
        slug: 'conferencia-transportes',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '14:30',
        location: 'Centro de Congressos do Campo Pequeno',
        eventType: 'conferencia',
        featured: true,
        description: 'Conferência com especialistas nacionais e internacionais sobre mobilidade urbana sustentável. Apresentaremos estudos de caso de outras cidades europeias e as nossas propostas para revolucionar os transportes na freguesia.'
      },
      {
        title: 'Encontro de Jovens - Habitação e Trabalho',
        slug: 'encontro-jovens',
        date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '17:00',
        location: 'Biblioteca das Avenidas Novas',
        eventType: 'encontro',
        featured: false,
        description: 'Encontro especialmente dedicado aos jovens da freguesia para discutir os desafios da habitação e do mercado de trabalho. Queremos ouvir as vossas ideias e preocupações para construir propostas que respondam às vossas necessidades.'
      }
    ];

    for (const event of events) {
      const doc = {
        _type: 'event',
        title: event.title,
        slug: { _type: 'slug', current: event.slug },
        campaign: { _type: 'reference', _ref: campaignId },
        date: event.date,
        time: event.time,
        location: event.location,
        description: [{
          _type: 'block',
          _key: `desc_${event.slug}`,
          style: 'normal',
          children: [{
            _type: 'span',
            _key: `span_${event.slug}`,
            text: event.description
          }]
        }],
        eventType: event.eventType,
        featured: event.featured
      };
      
      const created = await client.create(doc);
      console.log(`✅ Event created: ${event.title} (${created._id})`);
    }

    // 📰 NEWS POSTS - Different categories and dates
    const posts = [
      {
        title: 'Lançamento da Campanha Viver Avenidas',
        slug: 'lancamento-campanha',
        publishedAt: new Date().toISOString(),
        excerpt: 'A coligação de esquerda Viver Avenidas apresenta-se oficialmente com propostas concretas para transformar a nossa freguesia.',
        categories: ['campanha', 'comunicados'],
        content: 'Hoje marca o início oficial da nossa campanha. Com uma equipa diversa e experiente, apresentamos um programa ambicioso mas realista para as Avenidas Novas. Baseado em meses de trabalho de proximidade e escuta ativa dos cidadãos, o nosso programa foca-se em cinco áreas prioritárias: habitação, transportes, ambiente, cultura e participação democrática.'
      },
      {
        title: 'Programa de Habitação Jovem aprovado em reunião',
        slug: 'programa-habitacao-jovem',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'A nossa proposta para habitação acessível aos jovens foi discutida e aprovada pela equipa da campanha.',
        categories: ['propostas'],
        content: 'Após várias sessões de trabalho com jovens da freguesia, arquitetos e especialistas em habitação, finalizámos a nossa proposta para criar 500 fogos de habitação acessível nos próximos 4 anos. O programa inclui parcerias público-privadas, reabilitação de edifícios e apoios diretos ao arrendamento.'
      },
      {
        title: 'Candidatura apresentada oficialmente',
        slug: 'candidatura-apresentada',
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'A candidatura Viver Avenidas foi oficialmente entregue na Comissão Nacional de Eleições.',
        categories: ['campanha'],
        content: 'Com grande satisfação, anunciamos que a nossa candidatura foi oficialmente entregue na Comissão Nacional de Eleições. A lista, encabeçada por Maria Silva e composta por 15 candidatos de diferentes áreas profissionais, representa a diversidade e competência que queremos levar para a gestão da freguesia.'
      },
      {
        title: 'Viver Avenidas na Comunicação Social',
        slug: 'comunicacao-social',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'As nossas propostas têm sido destacadas pelos principais órgãos de comunicação social.',
        categories: ['imprensa'],
        content: 'As nossas propostas para os transportes sustentáveis foram destaque no jornal Público desta semana. A RTP também realizou uma reportagem sobre o nosso programa de habitação jovem. Este reconhecimento mediático demonstra a qualidade e inovação das nossas propostas.'
      },
      {
        title: 'Encontro com Comerciantes do Mercado',
        slug: 'encontro-comerciantes',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'Reunimos com os comerciantes do Mercado do Arco do Cego para ouvir as suas preocupações e propostas.',
        categories: ['eventos'],
        content: 'O encontro com os comerciantes do Mercado do Arco do Cego foi muito produtivo. Identificámos as principais necessidades: melhor sinalização, apoio à digitalização dos negócios e eventos regulares para atrair mais visitantes. Estas questões serão integradas no nosso programa de dinamização do comércio local.'
      },
      {
        title: 'Adesão de Personalidades à Campanha',
        slug: 'adesao-personalidades',
        publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'Várias personalidades da cultura, ciência e desporto manifestaram apoio à nossa candidatura.',
        categories: ['campanha'],
        content: 'Temos o orgulho de anunciar que várias personalidades de reconhecido mérito manifestaram apoio à nossa candidatura. Entre elas, o arquiteto João Carrilho da Graça, a escritora Lídia Jorge e o ex-futebolista Rui Costa. O seu apoio é um reconhecimento da qualidade do nosso projeto para as Avenidas Novas.'
      }
    ];

    for (const post of posts) {
      const doc = {
        _type: 'post',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        campaign: { _type: 'reference', _ref: campaignId },
        publishedAt: post.publishedAt,
        excerpt: post.excerpt,
        content: [{
          _type: 'block',
          _key: `content_${post.slug}`,
          style: 'normal',
          children: [{
            _type: 'span',
            _key: `span_${post.slug}`,
            text: post.content
          }]
        }],
        categories: post.categories
      };
      
      const created = await client.create(doc);
      console.log(`✅ News post created: ${post.title} (${created._id})`);
    }

    // 📄 CUSTOM PAGES - Enable and create custom pages
    console.log('Enabling custom pages and creating sample pages...');
    
    // First, enable custom pages in the campaign
    await client.patch(campaignId).set({
      'contentTypes.customPages': true
    }).commit();
    
    const customPages = [
      {
        title: 'A Nossa Equipa',
        slug: 'equipa',
        showInNavigation: true,
        navigationOrder: 1,
        navigationLabel: 'Equipa',
        content: 'A nossa equipa é composta por 15 candidatos com experiência diversificada em áreas como urbanismo, educação, saúde, cultura e ambiente. Todos partilhamos o mesmo compromisso: trabalhar para uma freguesia mais justa, sustentável e participativa. Maria Silva, cabeça de lista, é arquiteta urbanista com 15 anos de experiência em projetos de reabilitação urbana.'
      },
      {
        title: 'Como Apoiar a Campanha',
        slug: 'apoiar',
        showInNavigation: true,
        navigationOrder: 2,
        navigationLabel: 'Apoiar',
        content: 'Existem várias formas de apoiar a nossa campanha: seja voluntário nas nossas ações, partilhe as nossas propostas nas redes sociais, participe nos nossos eventos, ou faça um donativo. Cada contribuição, por pequena que seja, faz a diferença. Juntos podemos transformar as Avenidas Novas numa freguesia de referência em Lisboa.'
      },
      {
        title: 'Programa Completo',
        slug: 'programa',
        showInNavigation: false,
        navigationOrder: 3,
        content: 'O nosso programa completo está disponível para download em formato PDF. Contém todas as nossas 50 propostas detalhadas, organizadas por área temática. Cada proposta inclui objetivos, metodologia de implementação, orçamento estimado e cronograma. Este documento representa dois anos de trabalho de preparação e consulta à população.'
      }
    ];

    for (const page of customPages) {
      const doc = {
        _type: 'page',
        title: page.title,
        slug: { _type: 'slug', current: page.slug },
        campaign: { _type: 'reference', _ref: campaignId },
        showInNavigation: page.showInNavigation,
        navigationOrder: page.navigationOrder,
        navigationLabel: page.navigationLabel,
        content: [{
          _type: 'block',
          _key: `content_${page.slug}`,
          style: 'normal',
          children: [{
            _type: 'span',
            _key: `span_${page.slug}`,
            text: page.content
          }]
        }]
      };
      
      const created = await client.create(doc);
      console.log(`✅ Custom page created: ${page.title} (${created._id})`);
    }

    console.log('\n🎉 Comprehensive content created successfully!');
    console.log('📊 Summary:');
    console.log(`   • ${proposals.length} Proposals (covering all categories)`);
    console.log(`   • ${events.length} Events (different types and dates)`);
    console.log(`   • ${posts.length} News Posts (various categories)`);
    console.log(`   • ${customPages.length} Custom Pages (with navigation)`);

  } catch (error) {
    console.error('❌ Error creating comprehensive content:', error);
  }
}

async function main() {
  try {
    const campaign = await createDefaultCampaign();
    if (campaign && campaign._id) {
      await createSampleContent(campaign._id);
    }
    console.log('\n🎉 Setup complete! You can now start developing with sample data.');
  } catch (error) {
    console.error('💥 Setup failed:', error);
    process.exit(1);
  }
}

main();
