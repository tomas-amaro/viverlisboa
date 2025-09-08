import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Typography, Button } from '@/components/ui'
import { theme } from '@/styles/theme'
import { urlFor } from '@/lib/sanity'
import { HeroBlockProps, BlockComponentProps } from './types'

interface Props extends BlockComponentProps {
  block: HeroBlockProps
}

const HeroSection = styled.section<{ 
  $height: string
  $backgroundImage?: string 
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.text.white};
  overflow: hidden;
  
  ${({ $height }) => {
    switch ($height) {
      case 'sm': return 'min-height: 40vh;'
      case 'md': return 'min-height: 60vh;'
      case 'lg': return 'min-height: 80vh;'
      case 'xl': return 'min-height: 100vh;'
      default: return 'min-height: 80vh;'
    }
  }}
  
  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `
    background-image: url(${$backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $backgroundImage }) =>
      $backgroundImage
        ? 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))'
        : `linear-gradient(135deg, ${theme.colors.primary.blue}, ${theme.colors.primary.teal})`};
    z-index: 1;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: ${theme.spacing[8]} ${theme.spacing[4]};
`

const Title = styled(Typography)`
  margin-bottom: ${theme.spacing[4]};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const Subtitle = styled(Typography)`
  margin-bottom: ${theme.spacing[6]};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`

const Description = styled(Typography)`
  margin-bottom: ${theme.spacing[8]};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  opacity: 0.95;
`

export const HeroBlock: React.FC<Props> = ({ block }) => {
  const backgroundImageUrl = block.backgroundImage
    ? urlFor(block.backgroundImage).width(1920).height(1080).url()
    : undefined

  return (
    <HeroSection
      $height={block.height}
      $backgroundImage={backgroundImageUrl}
    >
        <Content>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Title variant="h1" color="white" align="center">
              {block.title}
            </Title>
            
            {block.subtitle && (
              <Subtitle variant="h3" color="white" align="center">
                {block.subtitle}
              </Subtitle>
            )}
            
            {block.description && (
              <Description variant="body1" color="white" align="center">
                {block.description}
              </Description>
            )}
            
            {block.ctaButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              >
                <Button
                  variant={block.ctaButton.style}
                  size="lg"
                  href={block.ctaButton.url}
                >
                  {block.ctaButton.text}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </Content>
    </HeroSection>
  )
}
