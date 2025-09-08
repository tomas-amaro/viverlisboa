import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Container, Typography } from '@/components/ui'
import { theme } from '@/styles/theme'
import { urlFor } from '@/lib/sanity'
import { ImageBlockProps, BlockComponentProps } from './types'

interface Props extends BlockComponentProps {
  block: ImageBlockProps
}

const ImageSection = styled.section`
  padding: ${theme.spacing[12]} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[8]} 0;
  }
`

const ImageContainer = styled.div<{ 
  $size: string
  $alignment: string 
}>`
  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return 'max-width: 400px;'
      case 'medium':
        return 'max-width: 600px;'
      case 'large':
        return 'max-width: 800px;'
      case 'full':
        return 'max-width: 100%;'
      default:
        return 'max-width: 800px;'
    }
  }}
  
  ${({ $alignment }) => {
    switch ($alignment) {
      case 'center':
        return 'margin: 0 auto;'
      case 'right':
        return 'margin: 0 0 0 auto;'
      default:
        return 'margin: 0;'
    }
  }}
  
  position: relative;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
`

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
`

const Caption = styled(Typography)`
  margin-top: ${theme.spacing[3]};
  text-align: center;
  font-style: italic;
`

export const ImageBlock: React.FC<Props> = ({ block }) => {
  const imageUrl = urlFor(block.image).width(1200).height(800).url()

  return (
    <ImageSection>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <ImageContainer
            $size={block.size}
            $alignment={block.alignment}
          >
            <StyledImage
              src={imageUrl}
              alt={block.image.alt}
              width={1200}
              height={800}
              priority={false}
            />
            
            {block.image.caption && (
              <Caption variant="body2" color="secondary">
                {block.image.caption}
              </Caption>
            )}
          </ImageContainer>
        </motion.div>
      </Container>
    </ImageSection>
  )
}
