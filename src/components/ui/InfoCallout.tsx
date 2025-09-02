import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { GeometricBackground } from './GeometricBackground'

interface InfoCalloutProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  className?: string
}

const CalloutContainer = styled.div<{ variant: string }>`
  position: relative;
  padding: ${theme.spacing[6]} ${theme.spacing[8]};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  z-index: 1;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary.blue};
          color: ${theme.colors.text.white};
        `
      case 'secondary':
        return `
          background: ${theme.colors.primary.teal};
          color: ${theme.colors.text.white};
        `
      case 'accent':
        return `
          background: ${theme.colors.primary.red};
          color: ${theme.colors.text.white};
        `
      default:
        return `
          background: ${theme.colors.primary.blue};
          color: ${theme.colors.text.white};
        `
    }
  }}

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[4]} ${theme.spacing[6]};
  }
`

const CalloutContent = styled.div`
  position: relative;
  z-index: 2;
`

const CalloutTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing[2]};
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
  }
`

const CalloutSubtitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  opacity: 0.9;
  margin-bottom: ${theme.spacing[4]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const CalloutBody = styled.div`
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
  
  p {
    margin-bottom: ${theme.spacing[3]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const DiagonalAccent = styled.div<{ variant: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 100%;
  z-index: 1;
  
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(45deg, 
            ${theme.colors.primary.teal} 0%, 
            ${theme.colors.primary.carmin} 100%
          );
        `
      case 'secondary':
        return `
          background: linear-gradient(45deg, 
            ${theme.colors.primary.blue} 0%, 
            ${theme.colors.primary.red} 100%
          );
        `
      case 'accent':
        return `
          background: linear-gradient(45deg, 
            ${theme.colors.primary.carmin} 0%, 
            ${theme.colors.primary.teal} 100%
          );
        `
      default:
        return `
          background: ${theme.colors.primary.teal};
        `
    }
  }}
  
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);

  @media (max-width: ${theme.breakpoints.md}) {
    width: 80px;
  }
`

const InfoCallout: React.FC<InfoCalloutProps> = ({
  title,
  subtitle,
  children,
  variant = 'primary',
  className
}) => {
  return (
    <CalloutContainer variant={variant} className={className}>
      <GeometricBackground variant="subtle" />
      <DiagonalAccent variant={variant} />
      <CalloutContent>
        {subtitle && <CalloutSubtitle>{subtitle}</CalloutSubtitle>}
        {title && <CalloutTitle>{title}</CalloutTitle>}
        <CalloutBody>{children}</CalloutBody>
      </CalloutContent>
    </CalloutContainer>
  )
}

export { InfoCallout }
