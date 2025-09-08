import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Container, Typography, Button } from '@/components/ui'
import { theme } from '@/styles/theme'
import { CtaBlockProps, BlockComponentProps } from './types'

interface Props extends BlockComponentProps {
  block: CtaBlockProps
}

const CtaSection = styled.section<{ $backgroundColor: string }>`
  padding: ${theme.spacing[16]} 0;
  text-align: center;
  
  ${({ $backgroundColor }) => {
    switch ($backgroundColor) {
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
      case 'gradient':
        return `
          background: linear-gradient(135deg, ${theme.colors.primary.blue}, ${theme.colors.primary.teal});
          color: ${theme.colors.text.white};
        `
      case 'white':
        return `
          background-color: ${theme.colors.background.primary};
          color: ${theme.colors.text.primary};
        `
      default:
        return `
          background: linear-gradient(135deg, ${theme.colors.primary.blue}, ${theme.colors.primary.teal});
          color: ${theme.colors.text.white};
        `
    }
  }}
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} 0;
  }
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled(Typography)<{ $isWhite: boolean }>`
  margin-bottom: ${theme.spacing[4]};
  color: ${({ $isWhite }) => 
    $isWhite ? theme.colors.text.white : 'inherit'};
`

const Description = styled(Typography)<{ $isWhite: boolean }>`
  margin-bottom: ${theme.spacing[8]};
  opacity: ${({ $isWhite }) => $isWhite ? 0.9 : 0.8};
  color: ${({ $isWhite }) => 
    $isWhite ? theme.colors.text.white : 'inherit'};
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    
    > * {
      min-width: 250px;
    }
  }
`

export const CtaBlock: React.FC<Props> = ({ block }) => {
  const isWhiteText = block.backgroundColor !== 'white'

  return (
    <CtaSection $backgroundColor={block.backgroundColor}>
      <Container>
        <Content>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Title 
              variant="h2" 
              $isWhite={isWhiteText}
              align="center"
            >
              {block.title}
            </Title>
            
            {block.description && (
              <Description 
                variant="body1" 
                $isWhite={isWhiteText}
                align="center"
              >
                {block.description}
              </Description>
            )}
            
            <ButtonGroup>
              {block.buttons.map((button, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2 + (index * 0.1),
                    ease: 'easeOut' 
                  }}
                >
                  <Button
                    variant={button.style}
                    size="lg"
                    href={button.url}
                  >
                    {button.text}
                  </Button>
                </motion.div>
              ))}
            </ButtonGroup>
          </motion.div>
        </Content>
      </Container>
    </CtaSection>
  )
}
