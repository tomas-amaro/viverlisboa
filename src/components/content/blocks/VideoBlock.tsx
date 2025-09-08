import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Container, Typography } from '@/components/ui'
import { theme } from '@/styles/theme'
import { VideoBlockProps, BlockComponentProps } from './types'

interface Props extends BlockComponentProps {
  block: VideoBlockProps
}

const VideoSection = styled.section`
  padding: ${theme.spacing[12]} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[8]} 0;
  }
`

const Title = styled(Typography)`
  margin-bottom: ${theme.spacing[6]};
  text-align: center;
`

const VideoContainer = styled.div<{ $aspectRatio: string }>`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  
  ${({ $aspectRatio }) => {
    switch ($aspectRatio) {
      case '16:9':
        return 'aspect-ratio: 16/9;'
      case '4:3':
        return 'aspect-ratio: 4/3;'
      case '1:1':
        return 'aspect-ratio: 1/1;'
      default:
        return 'aspect-ratio: 16/9;'
    }
  }}
  
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
`

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${theme.colors.gray[200]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.lg};
  text-align: center;
  padding: ${theme.spacing[4]};
`

const VideoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: ${theme.borderRadius.lg};
`

// Função para converter URL do YouTube/Vimeo para embed
const getEmbedUrl = (url: string): string | null => {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1`
  }

  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/
  const vimeoMatch = url.match(vimeoRegex)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  // Se já for uma URL de embed, retornar como está
  if (url.includes('embed') || url.includes('player')) {
    return url
  }

  return null
}

export const VideoBlock: React.FC<Props> = ({ block }) => {
  const embedUrl = getEmbedUrl(block.videoUrl)

  return (
    <VideoSection>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {block.title && (
            <Title variant="h2">
              {block.title}
            </Title>
          )}
          
          <VideoContainer $aspectRatio={block.aspectRatio}>
            {embedUrl ? (
              <VideoIframe
                src={embedUrl}
                title={block.title || 'Vídeo'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <VideoPlaceholder>
                🎥 Vídeo
                <br />
                <small>URL não suportada: {block.videoUrl}</small>
                <br />
                <small>Use URLs do YouTube ou Vimeo</small>
              </VideoPlaceholder>
            )}
          </VideoContainer>
        </motion.div>
      </Container>
    </VideoSection>
  )
}
