import React from 'react'
import styled from 'styled-components'
import { LayoutConstructionBackground } from '../ui/LayoutConstructionBackground'
import { Container, Typography, Button } from '../ui'
import { theme } from '../../styles/theme'

const ShowcaseSection = styled.section`
  position: relative;
  margin: 2rem 0;
`

const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 5;
  padding: 2rem;
`

const ContentBox = styled.div`
  max-width: 500px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const HeaderBrand = styled.div`
  color: ${theme.colors.primary.red};
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  opacity: 0.8;
`

const MainTitle = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2rem;
  }
`

const Subtitle = styled(Typography)`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  font-weight: 400;
`

const ActionButton = styled(Button)`
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 20px rgba(235, 87, 87, 0.3);
  
  &:hover {
    box-shadow: 0 12px 30px rgba(235, 87, 87, 0.4);
    transform: translateY(-2px);
  }
`

const LayoutShowcase: React.FC = () => {
  return (
    <ShowcaseSection>
      <LayoutConstructionBackground showImage={true} />
      
      <ContentWrapper>
        <Container>
          <ContentBox>
            <HeaderBrand>VIVER LISBOA — Alexandra Leitão 2025</HeaderBrand>
            
            <MainTitle as="h1">
              Construção de Layout
            </MainTitle>
            
            <Subtitle>
              Discover the geometric beauty and thoughtful design that powers our 
              campaign. Every element crafted with purpose, every pattern designed 
              to inspire Lisboa&apos;s future.
            </Subtitle>
            
            <ActionButton variant="primary">
              Explore Our Vision
            </ActionButton>
          </ContentBox>
        </Container>
      </ContentWrapper>
    </ShowcaseSection>
  )
}

export { LayoutShowcase }
