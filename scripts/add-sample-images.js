#!/usr/bin/env node

/**
 * Script para adicionar imagens de exemplo aos blocos da página "Como Apoiar"
 * Usa imagens de placeholder para demonstrar funcionalidades visuais
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

async function uploadPlaceholderImage(width, height, text) {
  try {
    const imageUrl = `https://via.placeholder.com/${width}x${height}/48B9CA/FFFFFF?text=${encodeURIComponent(text)}`;
    
    // Fazer download da imagem
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    // Upload para Sanity
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `${text.toLowerCase().replace(/\s+/g, '-')}.png`
    });
    
    return asset._id;
  } catch (error) {
    console.warn(`⚠️  Erro ao fazer upload da imagem "${text}":`, error.message);
    return null;
  }
}

async function addSampleImages() {
  try {
    console.log('🖼️  Adicionando imagens de exemplo à página "Como Apoiar"...');

    // Buscar a página "apoiar"
    const page = await client.fetch(
      '*[_type == "page" && slug.current == "apoiar"][0]'
    );

    if (!page) {
      throw new Error('Página "apoiar" não encontrada. Execute primeiro o script create-apoiar-page.js');
    }

    console.log('📄 Página encontrada, adicionando imagens...');

    // Upload das imagens de exemplo
    console.log('⬆️  Fazendo upload das imagens...');
    
    const heroImageId = await uploadPlaceholderImage(1920, 1080, 'Campanha+Politica');
    const voluntariosImageId = await uploadPlaceholderImage(800, 600, 'Voluntarios');
    const eventoImageId = await uploadPlaceholderImage(400, 300, 'Evento+1');
    const equipaImageId = await uploadPlaceholderImage(400, 300, 'Equipa');
    const comicioImageId = await uploadPlaceholderImage(400, 300, 'Comicio');

    // Atualizar o conteúdo da página com as imagens
    const updatedContent = page.content.map(block => {
      // Hero Block - adicionar imagem de fundo
      if (block._key === 'hero-apoiar' && heroImageId) {
        return {
          ...block,
          backgroundImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: heroImageId
            },
            alt: 'Campanha política - pessoas unidas por uma causa'
          }
        };
      }

      // Image Block - voluntários
      if (block._key === 'voluntarios-image' && voluntariosImageId) {
        return {
          ...block,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: voluntariosImageId
            },
            alt: 'Voluntários da campanha em ação',
            caption: 'A nossa equipa de voluntários trabalhando pela comunidade'
          }
        };
      }

      // Gallery Block - momentos da campanha
      if (block._key === 'momentos-campanha') {
        const images = [];
        
        if (eventoImageId) {
          images.push({
            _type: 'image',
            _key: 'evento-1',
            asset: {
              _type: 'reference',
              _ref: eventoImageId
            },
            alt: 'Evento de lançamento da campanha',
            caption: 'Lançamento oficial da campanha'
          });
        }

        if (equipaImageId) {
          images.push({
            _type: 'image',
            _key: 'equipa-1',
            asset: {
              _type: 'reference',
              _ref: equipaImageId
            },
            alt: 'Equipa de campanha',
            caption: 'Nossa dedicada equipa de trabalho'
          });
        }

        if (comicioImageId) {
          images.push({
            _type: 'image',
            _key: 'comicio-1',
            asset: {
              _type: 'reference',
              _ref: comicioImageId
            },
            alt: 'Comício no centro da cidade',
            caption: 'Comício com a participação da comunidade'
          });
        }

        return {
          ...block,
          images
        };
      }

      return block;
    });

    // Atualizar a página
    const result = await client
      .patch(page._id)
      .set({ content: updatedContent })
      .commit();

    console.log('✅ Imagens adicionadas com sucesso!');
    console.log(`📄 Página atualizada: ${result._id}`);
    
    console.log('\n🖼️  Imagens adicionadas:');
    if (heroImageId) console.log('  • Hero Block: Imagem de fundo da campanha');
    if (voluntariosImageId) console.log('  • Image Block: Voluntários em ação');
    if (eventoImageId) console.log('  • Gallery: Evento de lançamento');
    if (equipaImageId) console.log('  • Gallery: Equipa de campanha');
    if (comicioImageId) console.log('  • Gallery: Comício público');

    console.log('\n🎨 Agora todos os blocos visuais têm conteúdo de exemplo!');
    console.log('🔗 Acesse /apoiar para ver o resultado completo.');

  } catch (error) {
    console.error('❌ Erro ao adicionar imagens:', error.message);
    process.exit(1);
  }
}

// Executar o script
if (require.main === module) {
  addSampleImages();
}

module.exports = { addSampleImages };
