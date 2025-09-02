import React from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Container, CampaignName } from '@/components/ui'

const VariationsSection = styled.section`
  padding: ${theme.spacing[16]} 0;
  background: #f5f5f5;
`

const VariationsTitle = styled.h2`
  text-align: center;
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[8]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 300;
`

const VariationsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[8]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[6]};
  }
`

const LogoBox = styled.div<{ $background: string }>`
  background: ${props => props.$background};
  padding: ${theme.spacing[12]} ${theme.spacing[8]};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    z-index: 0;
  }
`

const LogoContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: left;
  width: 100%;
`

const LogoLabel = styled.div<{ $textColor: string }>`
  position: absolute;
  bottom: ${theme.spacing[4]};
  left: ${theme.spacing[4]};
  font-size: ${theme.fontSizes.sm};
  color: ${props => props.$textColor};
  opacity: 0.7;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const LogoVariations: React.FC = () => {
  return (
    <VariationsSection>
      <Container>
        <VariationsTitle>Logótipo sobre Fundos Cromáticos</VariationsTitle>
        
        {/* Size variations demo */}
        <div style={{ marginBottom: '3rem', padding: '2rem', background: 'white', borderRadius: '12px' }}>
          <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem', textAlign: 'center' }}>
            Variações de Tamanho
          </div>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div>
              <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '0.5rem' }}>XS - Business Cards</div>
              <CampaignName mainTitle="VIVER LISBOA" size="xs" />
            </div>
            <div>
              <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '0.5rem' }}>SM - Headers</div>
              <CampaignName mainTitle="VIVER LISBOA" candidateName="ALEXANDRA LEITÃO" size="sm" />
            </div>
            <div>
              <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '0.5rem' }}>MD - Cards & Sections</div>
              <CampaignName mainTitle="VIVER LISBOA" candidateName="ALEXANDRA LEITÃO" year="2025" size="md" />
            </div>
            <div>
              <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '0.5rem' }}>LG - Banners</div>
              <CampaignName mainTitle="VIVER LISBOA" candidateName="ALEXANDRA LEITÃO" year="2025" size="lg" />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '0.5rem' }}>XL - Large Displays</div>
              <CampaignName mainTitle="VIVER LISBOA" candidateName="ALEXANDRA LEITÃO" year="2025" size="xl" />
            </div>
            <div style={{ marginTop: '1rem', padding: '2rem', background: 'linear-gradient(135deg, #e8e8e8, #f5f5f5)', borderRadius: '8px' }}>
              <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '1rem' }}>HERO - Main Landing</div>
              <CampaignName mainTitle="VIVER LISBOA" candidateName="ALEXANDRA LEITÃO" year="2025" size="hero" />
            </div>
          </div>
        </div>
        
        <VariationsGrid>
          {/* Left - Mixed colors on light background */}
          <LogoBox $background="linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%)">
            <LogoContent>
              <CampaignName 
                variant="mixed"
                mainTitle="VIVER LISBOA"
                candidateName="ALEXANDRA LEITÃO"
                year="2025"
              />
            </LogoContent>
            <LogoLabel $textColor="#666">Fundo Claro</LogoLabel>
          </LogoBox>

          {/* Top Right - All white on red background */}
          <LogoBox $background={`linear-gradient(135deg, ${theme.colors.primary.red} 0%, #d32f2f 100%)`}>
            <LogoContent>
              <CampaignName 
                variant="white"
                mainTitle="VIVER LISBOA"
                candidateName="ALEXANDRA LEITÃO"
                year="2025"
              />
            </LogoContent>
            <LogoLabel $textColor="rgba(255,255,255,0.8)">Fundo Vermelho</LogoLabel>
          </LogoBox>

          {/* Bottom Left - All white on teal background */}
          <LogoBox $background={`linear-gradient(135deg, ${theme.colors.primary.teal} 0%, #00acc1 100%)`}>
            <LogoContent>
              <CampaignName 
                variant="white"
                mainTitle="VIVER LISBOA"
                candidateName="ALEXANDRA LEITÃO"
                year="2025"
              />
            </LogoContent>
            <LogoLabel $textColor="rgba(255,255,255,0.8)">Fundo Azul</LogoLabel>
          </LogoBox>

          {/* Bottom Right - Default variation */}
          <LogoBox $background="linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)">
            <LogoContent>
              <CampaignName 
                variant="default"
                mainTitle="VIVER LISBOA"
                candidateName="ALEXANDRA LEITÃO"
                year="2025"
              />
            </LogoContent>
            <LogoLabel $textColor="#666">Variação Padrão</LogoLabel>
          </LogoBox>
        </VariationsGrid>
      </Container>
    </VariationsSection>
  )
}

export { LogoVariations }
