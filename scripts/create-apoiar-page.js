#!/usr/bin/env node

/**
 * Script para criar uma página "Como Apoiar" com todos os blocos de conteúdo
 * Esta página serve como demonstração completa do sistema de page builder
 */

const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function createApoiarPage() {
  try {
    console.log('🚀 Criando página "Como Apoiar" com todos os blocos...');

    // Primeiro, vamos buscar a campanha existente
    const campaigns = await client.fetch('*[_type == "campaign"]');
    if (campaigns.length === 0) {
      throw new Error('Nenhuma campanha encontrada. Crie uma campanha primeiro.');
    }
    
    const campaign = campaigns[0];
    console.log(`📋 Usando campanha: ${campaign.title}`);

    // Buscar propostas existentes da campanha
    const existingProposals = await client.fetch(
      '*[_type == "proposal" && references($campaignId)] | order(priority asc, title asc) [0...6]{ _id }',
      { campaignId: campaign._id }
    );

    console.log(`📄 Encontradas ${existingProposals.length} propostas para a campanha`);

    // Verificar se a página já existe
    const existingPage = await client.fetch(
      '*[_type == "page" && slug.current == "apoiar" && references($campaignId)][0]',
      { campaignId: campaign._id }
    );

    if (existingPage) {
      console.log('⚠️  Página "apoiar" já existe. Atualizando...');
    }

    // Conteúdo da página com todos os blocos
    const pageContent = [
      // 1. Hero Block - Abertura impactante
      {
        _type: 'heroBlock',
        _key: 'hero-apoiar',
        title: 'Junte-se à Nossa Campanha',
        subtitle: 'Juntos podemos transformar a nossa cidade',
        description: 'A sua participação é fundamental para construirmos uma cidade mais justa, sustentável e democrática. Descubra como pode apoiar a nossa campanha e fazer a diferença.',
        height: 'lg',
        ctaButton: {
          text: 'Quero Apoiar Agora',
          url: '#formas-apoio',
          style: 'primary'
        }
      },

      // 2. Text Block - Introdução
      {
        _type: 'textBlock',
        _key: 'intro-text',
        title: 'Por que o seu apoio é importante?',
        alignment: 'center',
        backgroundColor: 'transparent',
        content: [
          {
            _type: 'block',
            _key: 'intro-block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'intro-span',
                text: 'Uma campanha política é muito mais do que candidatos e propostas. É um movimento coletivo de cidadãos que acreditam numa visão comum para o futuro. O seu apoio, seja ele qual for, é essencial para amplificarmos a nossa mensagem e chegarmos a mais pessoas.'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'intro-block-2',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'intro-span-2',
                text: 'Cada contribuição, cada partilha, cada conversa com amigos e familiares ajuda a construir uma rede de apoio que pode verdadeiramente mudar a nossa cidade.'
              }
            ]
          }
        ]
      },

      // 3. Spacer
      {
        _type: 'spacerBlock',
        _key: 'spacer-1',
        height: 'md'
      },

      // 4. CTA Block - Formas de Apoio
      {
        _type: 'ctaBlock',
        _key: 'formas-apoio',
        title: 'Formas de Apoiar a Campanha',
        description: 'Existem várias maneiras de contribuir para o nosso movimento. Escolha a que melhor se adequa à sua disponibilidade e possibilidades.',
        backgroundColor: 'gradient',
        buttons: [
          {
            text: 'Apoio Financeiro',
            url: '#apoio-financeiro',
            style: 'primary'
          },
          {
            text: 'Voluntariado',
            url: '#voluntariado',
            style: 'secondary'
          },
          {
            text: 'Divulgação',
            url: '#divulgacao',
            style: 'outline'
          }
        ]
      },

      // 5. Text Block - Apoio Financeiro
      {
        _type: 'textBlock',
        _key: 'apoio-financeiro',
        title: '💰 Apoio Financeiro',
        alignment: 'left',
        backgroundColor: 'white',
        content: [
          {
            _type: 'block',
            _key: 'financeiro-block-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'financeiro-span-1',
                text: 'As campanhas políticas têm custos: materiais de divulgação, eventos, deslocações, comunicação digital. O seu contributo financeiro, por mais pequeno que seja, ajuda-nos a chegar a mais pessoas e a organizar melhores eventos.'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'financeiro-block-2',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'financeiro-span-2',
                text: 'Como contribuir:'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'financeiro-list',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'financeiro-list-1',
                text: 'Transferência bancária: IBAN PT50 0000 0000 0000 0000 0000 0'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'financeiro-list-2',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'financeiro-list-2-span',
                text: 'MB Way: 912 345 678'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'financeiro-list-3',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'financeiro-list-3-span',
                text: 'PayPal: apoio@viveravenidas.pt'
              }
            ]
          }
        ]
      },

      // 6. Image Block - Voluntários em ação
      {
        _type: 'imageBlock',
        _key: 'voluntarios-image',
        size: 'large',
        alignment: 'center',
        // Nota: Em produção, você adicionaria uma imagem real aqui
        // image: { asset: { _ref: 'image-abc123' }, alt: 'Voluntários da campanha em ação' }
      },

      // 7. Text Block - Voluntariado
      {
        _type: 'textBlock',
        _key: 'voluntariado',
        title: '🤝 Voluntariado',
        alignment: 'left',
        backgroundColor: 'gray-light',
        content: [
          {
            _type: 'block',
            _key: 'voluntario-block-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'voluntario-span-1',
                text: 'O trabalho voluntário é o coração de qualquer campanha. Se tem tempo disponível e vontade de se envolver ativamente, há muitas formas de ajudar:'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'voluntario-list-1',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'voluntario-list-1-span',
                text: 'Distribuição de materiais de campanha'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'voluntario-list-2',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'voluntario-list-2-span',
                text: 'Apoio na organização de eventos'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'voluntario-list-3',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'voluntario-list-3-span',
                text: 'Gestão de redes sociais'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'voluntario-list-4',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'voluntario-list-4-span',
                text: 'Contacto direto com eleitores'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'voluntario-list-5',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'voluntario-list-5-span',
                text: 'Apoio logístico e administrativo'
              }
            ]
          }
        ]
      },

      // 8. Video Block - Testemunho de apoiante
      {
        _type: 'videoBlock',
        _key: 'testemunho-video',
        title: 'Testemunho de um Apoiante',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        aspectRatio: '16:9'
      },

      // 9. Spacer
      {
        _type: 'spacerBlock',
        _key: 'spacer-2',
        height: 'lg'
      },

      // 10. Text Block - Divulgação
      {
        _type: 'textBlock',
        _key: 'divulgacao',
        title: '📢 Divulgação e Partilha',
        alignment: 'left',
        backgroundColor: 'transparent',
        content: [
          {
            _type: 'block',
            _key: 'divulgacao-block-1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'divulgacao-span-1',
                text: 'Uma das formas mais eficazes de apoiar é divulgar a nossa mensagem. Cada partilha, cada conversa, cada recomendação multiplica o nosso alcance.'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'divulgacao-block-2',
            style: 'h3',
            children: [
              {
                _type: 'span',
                _key: 'divulgacao-span-2',
                text: 'Como pode divulgar:'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'divulgacao-list-1',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'divulgacao-list-1-span',
                text: 'Partilhe os nossos conteúdos nas redes sociais'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'divulgacao-list-2',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'divulgacao-list-2-span',
                text: 'Fale com amigos e familiares sobre as nossas propostas'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'divulgacao-list-3',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'divulgacao-list-3-span',
                text: 'Convide pessoas para os nossos eventos'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'divulgacao-list-4',
            style: 'normal',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                _key: 'divulgacao-list-4-span',
                text: 'Coloque um cartaz na sua janela ou estabelecimento'
              }
            ]
          }
        ]
      },

      // 11. Gallery Block - Momentos da campanha
      {
        _type: 'galleryBlock',
        _key: 'momentos-campanha',
        title: 'Momentos da Nossa Campanha',
        layout: 'grid-3',
        images: [
          // Nota: Em produção, você adicionaria imagens reais aqui
          // { asset: { _ref: 'image-123' }, alt: 'Evento de lançamento', caption: 'Lançamento da campanha' },
          // { asset: { _ref: 'image-456' }, alt: 'Voluntários', caption: 'Equipa de voluntários' },
          // { asset: { _ref: 'image-789' }, alt: 'Comício', caption: 'Comício no centro da cidade' }
        ]
      },

      // 12. Proposals Showcase Block - Nossas propostas
      {
        _type: 'proposalsShowcaseBlock',
        _key: 'propostas-destaque',
        title: 'Conheça as Nossas Propostas',
        description: 'Veja algumas das nossas principais propostas para transformar a cidade',
        proposals: existingProposals.map(p => ({ _type: 'reference', _ref: p._id })),
        showCategoryFilter: true,
        layout: 'grid'
      },

      // 13. Spacer
      {
        _type: 'spacerBlock',
        _key: 'spacer-3',
        height: 'lg'
      },

      // 14. CTA Block - Contacto
      {
        _type: 'ctaBlock',
        _key: 'contacto-final',
        title: 'Tem Dúvidas? Entre em Contacto',
        description: 'A nossa equipa está disponível para esclarecer qualquer questão sobre como pode apoiar a campanha.',
        backgroundColor: 'primary',
        buttons: [
          {
            text: 'Enviar Email',
            url: 'mailto:apoio@viveravenidas.pt',
            style: 'secondary'
          },
          {
            text: 'Ligar Agora',
            url: 'tel:+351912345678',
            style: 'outline'
          }
        ]
      },

      // 15. Text Block - Agradecimento final
      {
        _type: 'textBlock',
        _key: 'agradecimento',
        title: 'Obrigado pelo Seu Apoio!',
        alignment: 'center',
        backgroundColor: 'transparent',
        content: [
          {
            _type: 'block',
            _key: 'agradecimento-block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'agradecimento-span',
                text: 'Cada gesto de apoio, por mais pequeno que seja, contribui para construirmos uma cidade melhor. Juntos, podemos fazer a diferença e criar o futuro que todos merecemos.'
              }
            ]
          },
          {
            _type: 'block',
            _key: 'agradecimento-assinatura',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 'agradecimento-assinatura-span',
                text: 'Com gratidão,\nA Equipa Viver Avenidas',
                marks: ['em']
              }
            ]
          }
        ]
      }
    ];

    // Dados da página
    const pageData = {
      _type: 'page',
      title: 'Como Apoiar a Campanha',
      slug: {
        _type: 'slug',
        current: 'apoiar'
      },
      campaign: {
        _type: 'reference',
        _ref: campaign._id
      },
      showInNavigation: true,
      navigationOrder: 10,
      navigationLabel: 'Apoiar',
      seo: {
        title: 'Como Apoiar - Viver Avenidas',
        description: 'Descubra como pode apoiar a nossa campanha através de contribuições financeiras, voluntariado ou divulgação. Juntos podemos transformar a nossa cidade.',
        keywords: ['apoiar campanha', 'voluntariado', 'contribuição', 'política local', 'participação cidadã']
      },
      content: pageContent
    };

    let result;
    if (existingPage) {
      // Atualizar página existente
      result = await client
        .patch(existingPage._id)
        .set(pageData)
        .commit();
      console.log('✅ Página "Como Apoiar" atualizada com sucesso!');
    } else {
      // Criar nova página
      result = await client.create(pageData);
      console.log('✅ Página "Como Apoiar" criada com sucesso!');
    }

    console.log(`📄 ID da página: ${result._id}`);
    console.log(`🔗 URL: /apoiar`);
    console.log(`🎨 Blocos criados: ${pageContent.length}`);
    
    console.log('\n📋 Blocos incluídos:');
    pageContent.forEach((block, index) => {
      console.log(`  ${index + 1}. ${block._type} - ${block.title || block._key}`);
    });

    console.log('\n🎯 Esta página demonstra todos os blocos disponíveis:');
    console.log('  • Hero Block - Seção de abertura impactante');
    console.log('  • Text Block - Conteúdo rico em texto');
    console.log('  • Image Block - Imagens com legendas');
    console.log('  • Gallery Block - Galeria de imagens');
    console.log('  • CTA Block - Chamadas para ação');
    console.log('  • Video Block - Incorporação de vídeos');
    console.log('  • Proposals Showcase - Vitrine de propostas');
    console.log('  • Spacer Block - Espaçamentos flexíveis');

    console.log('\n🚀 Acesse /apoiar no seu site para ver o resultado!');
    console.log('💡 Use o Sanity Studio (/studio) para editar e personalizar os blocos.');

  } catch (error) {
    console.error('❌ Erro ao criar página:', error.message);
    process.exit(1);
  }
}

// Executar o script
if (require.main === module) {
  createApoiarPage();
}

module.exports = { createApoiarPage };
