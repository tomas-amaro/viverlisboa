import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Container, Typography, PortableTextRenderer } from '@/components/ui'
import { theme } from '@/styles/theme'
import { TextBlockProps, BlockComponentProps } from './types'

interface Props extends BlockComponentProps {
  block: TextBlockProps
}

const TextSection = styled.section<{ 
  $backgroundColor: string
  $alignment: string 
}>`
  padding: ${theme.spacing[12]} 0;
  
  ${({ $backgroundColor }) => {
    switch ($backgroundColor) {
      case 'white':
        return `background-color: ${theme.colors.background.primary};`
      case 'gray-light':
        return `background-color: ${theme.colors.background.secondary};`
      case 'primary':
        return `
          background-color: ${theme.colors.primary.blue};
          color: ${theme.colors.text.white};
        `
      case 'secondary':
        return `
          background-color: ${theme.colors.primary.teal};
          color: ${theme.colors.text.white};
        `
      default:
        return 'background-color: transparent;'
    }
  }}
  
  text-align: ${({ $alignment }) => $alignment};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[8]} 0;
  }
`

const Content = styled.div<{ $alignment: string }>`
  max-width: ${({ $alignment }) => 
    $alignment === 'center' ? '800px' : '100%'};
  margin: ${({ $alignment }) => 
    $alignment === 'center' ? '0 auto' : 
    $alignment === 'right' ? '0 0 0 auto' : '0'};
`

const Title = styled(Typography)<{ $isWhite: boolean }>`
  margin-bottom: ${theme.spacing[6]};
  color: ${({ $isWhite }) => 
    $isWhite ? theme.colors.text.white : 'inherit'};
`

export const TextBlock: React.FC<Props> = ({ block, campaign }) => {
  const isWhiteText = block.backgroundColor === 'primary' || block.backgroundColor === 'secondary'

  return (
    <TextSection
      $backgroundColor={block.backgroundColor}
      $alignment={block.alignment}
    >
      <Container>
        <Content $alignment={block.alignment}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {block.title && (
              <Title 
                variant="h2" 
                $isWhite={isWhiteText}
                align={block.alignment}
              >
                {block.title}
              </Title>
            )}
            
            <div style={{ 
              color: isWhiteText ? theme.colors.text.white : 'inherit' 
            }}>
              <PortableTextRenderer 
                content={block.content} 
                campaign={campaign}
              />
            </div>
          </motion.div>
        </Content>
      </Container>
    </TextSection>
  )
}
