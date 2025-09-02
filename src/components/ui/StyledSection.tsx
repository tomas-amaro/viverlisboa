import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'
import { Container } from './Container'
import { GeometricBackground } from './GeometricBackground'

interface StyledSectionProps {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'dark' | 'light'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  backgroundPattern?: boolean
  centerContent?: boolean
  children: React.ReactNode
  className?: string
}

const getSectionStyles = (variant: string) => {
  switch (variant) {
    case 'primary':
      return css`
        background: linear-gradient(
          135deg,
          ${theme.colors.primary.blue} 0%,
          ${theme.colors.primary.teal} 100%
        );
        color: ${theme.colors.text.white};
      `
    case 'secondary':
      return css`
        background: linear-gradient(
          135deg,
          ${theme.colors.primary.carmin} 0%,
          ${theme.colors.primary.red} 100%
        );
        color: ${theme.colors.text.white};
      `
    case 'accent':
      return css`
        background: linear-gradient(
          135deg,
          ${theme.colors.primary.blue} 0%,
          ${theme.colors.primary.teal} 30%,
          ${theme.colors.primary.carmin} 70%,
          ${theme.colors.primary.red} 100%
        );
        color: ${theme.colors.text.white};
      `
    case 'dark':
      return css`
        background: ${theme.colors.background.dark};
        color: ${theme.colors.text.white};
      `
    case 'light':
      return css`
        background: ${theme.colors.background.secondary};
        color: ${theme.colors.text.primary};
      `
    default:
      return css`
        background: ${theme.colors.background.primary};
        color: ${theme.colors.text.primary};
      `
  }
}

const getSectionPadding = (padding: string) => {
  switch (padding) {
    case 'sm':
      return css`
        padding: ${theme.spacing[12]} 0;
        
        @media (max-width: ${theme.breakpoints.md}) {
          padding: ${theme.spacing[8]} 0;
        }
      `
    case 'md':
      return css`
        padding: ${theme.spacing[16]} 0;
        
        @media (max-width: ${theme.breakpoints.md}) {
          padding: ${theme.spacing[12]} 0;
        }
      `
    case 'lg':
      return css`
        padding: ${theme.spacing[20]} 0;
        
        @media (max-width: ${theme.breakpoints.md}) {
          padding: ${theme.spacing[16]} 0;
        }
      `
    case 'xl':
      return css`
        padding: ${theme.spacing[24]} 0;
        
        @media (max-width: ${theme.breakpoints.md}) {
          padding: ${theme.spacing[20]} 0;
        }
      `
    default:
      return css`
        padding: ${theme.spacing[16]} 0;
        
        @media (max-width: ${theme.breakpoints.md}) {
          padding: ${theme.spacing[12]} 0;
        }
      `
  }
}

const SectionWrapper = styled(motion.section)<{ 
  variant: string
  padding: string 
  centerContent: boolean 
}>`
  position: relative;
  overflow: hidden;
  
  ${({ variant }) => getSectionStyles(variant)}
  ${({ padding }) => getSectionPadding(padding)}
  
  ${({ centerContent }) =>
    centerContent &&
    css`
      display: flex;
      align-items: center;
      min-height: 60vh;
    `}
`

const SectionContent = styled(Container)<{ centerContent: boolean }>`
  position: relative;
  z-index: 2;
  
  ${({ centerContent }) =>
    centerContent &&
    css`
      text-align: center;
    `}
`

const SectionTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.black};
  text-transform: uppercase;
  letter-spacing: -0.01em;
  margin-bottom: ${theme.spacing[6]};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.fontSizes['3xl']};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['2xl']};
    margin-bottom: ${theme.spacing[4]};
  }
`

const SectionSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.medium};
  opacity: 0.9;
  margin-bottom: ${theme.spacing[8]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing[6]};
  }
`

const StyledSection: React.FC<StyledSectionProps> = ({
  variant = 'default',
  padding = 'md',
  backgroundPattern = false,
  centerContent = false,
  children,
  className
}) => {
  const backgroundVariant = 
    variant === 'primary' ? 'primary' : 
    variant === 'secondary' ? 'secondary' :
    variant === 'accent' ? 'hero' : 
    'subtle'

  return (
    <SectionWrapper
      variant={variant}
      padding={padding}
      centerContent={centerContent}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {backgroundPattern && (
        <GeometricBackground variant={backgroundVariant} />
      )}
      
      <SectionContent centerContent={centerContent}>
        {children}
      </SectionContent>
    </SectionWrapper>
  )
}

// Predefined section components for common use cases
const HeroStyledSection: React.FC<Omit<StyledSectionProps, 'variant'>> = (props) => (
  <StyledSection variant="accent" backgroundPattern centerContent {...props} />
)

const CallToActionSection: React.FC<Omit<StyledSectionProps, 'variant'>> = (props) => (
  <StyledSection variant="primary" backgroundPattern centerContent {...props} />
)

const HighlightSection: React.FC<Omit<StyledSectionProps, 'variant'>> = (props) => (
  <StyledSection variant="secondary" backgroundPattern {...props} />
)

const ContentSection: React.FC<Omit<StyledSectionProps, 'variant'>> = (props) => (
  <StyledSection variant="light" {...props} />
)

// Export all components
export { 
  StyledSection,
  HeroStyledSection,
  CallToActionSection,
  HighlightSection,
  ContentSection,
  SectionTitle,
  SectionSubtitle
}
