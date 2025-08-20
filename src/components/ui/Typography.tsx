import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline'
  color?: 'primary' | 'secondary' | 'light' | 'white' | 'blue' | 'red' | 'carmin'
  align?: 'left' | 'center' | 'right'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black'
  margin?: boolean
  opacity?: number
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

const getVariantStyles = (variant: TypographyProps['variant']) => {
  switch (variant) {
    case 'h1':
      return css`
        font-size: ${theme.fontSizes['5xl']};
        font-weight: ${theme.fontWeights.black};
        line-height: 1.1;
        
        @media (max-width: ${theme.breakpoints.md}) {
          font-size: ${theme.fontSizes['4xl']};
        }
      `
    case 'h2':
      return css`
        font-size: ${theme.fontSizes['4xl']};
        font-weight: ${theme.fontWeights.bold};
        line-height: 1.2;
        
        @media (max-width: ${theme.breakpoints.md}) {
          font-size: ${theme.fontSizes['3xl']};
        }
      `
    case 'h3':
      return css`
        font-size: ${theme.fontSizes['3xl']};
        font-weight: ${theme.fontWeights.bold};
        line-height: 1.2;
        
        @media (max-width: ${theme.breakpoints.md}) {
          font-size: ${theme.fontSizes['2xl']};
        }
      `
    case 'h4':
      return css`
        font-size: ${theme.fontSizes['2xl']};
        font-weight: ${theme.fontWeights.semibold};
        line-height: 1.3;
      `
    case 'h5':
      return css`
        font-size: ${theme.fontSizes.xl};
        font-weight: ${theme.fontWeights.semibold};
        line-height: 1.3;
      `
    case 'h6':
      return css`
        font-size: ${theme.fontSizes.lg};
        font-weight: ${theme.fontWeights.semibold};
        line-height: 1.4;
      `
    case 'body1':
      return css`
        font-size: ${theme.fontSizes.base};
        font-weight: ${theme.fontWeights.normal};
        line-height: 1.6;
      `
    case 'body2':
      return css`
        font-size: ${theme.fontSizes.sm};
        font-weight: ${theme.fontWeights.normal};
        line-height: 1.5;
      `
    case 'caption':
      return css`
        font-size: ${theme.fontSizes.xs};
        font-weight: ${theme.fontWeights.normal};
        line-height: 1.4;
      `
    case 'overline':
      return css`
        font-size: ${theme.fontSizes.xs};
        font-weight: ${theme.fontWeights.semibold};
        line-height: 1.4;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      `
    default:
      return css`
        font-size: ${theme.fontSizes.base};
        font-weight: ${theme.fontWeights.normal};
        line-height: 1.6;
      `
  }
}

const getColor = (color: TypographyProps['color']) => {
  switch (color) {
    case 'primary':
      return theme.colors.text.primary
    case 'secondary':
      return theme.colors.text.secondary
    case 'light':
      return theme.colors.text.light
    case 'white':
      return theme.colors.text.white
    case 'blue':
      return theme.colors.primary.blue
    case 'red':
      return theme.colors.primary.red
    case 'carmin':
      return theme.colors.primary.carmin
    default:
      return theme.colors.text.primary
  }
}

const getWeight = (weight: TypographyProps['weight']) => {
  switch (weight) {
    case 'light':
      return theme.fontWeights.light
    case 'normal':
      return theme.fontWeights.normal
    case 'medium':
      return theme.fontWeights.medium
    case 'semibold':
      return theme.fontWeights.semibold
    case 'bold':
      return theme.fontWeights.bold
    case 'black':
      return theme.fontWeights.black
    default:
      return 'inherit'
  }
}

const getDefaultElement = (variant: TypographyProps['variant']) => {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return variant
    case 'body1':
    case 'body2':
      return 'p'
    case 'caption':
    case 'overline':
      return 'span'
    default:
      return 'p'
  }
}

const StyledTypography = styled.div<{ $variant: TypographyProps['variant']; $color: TypographyProps['color']; $align: TypographyProps['align']; $weight?: TypographyProps['weight']; $margin: boolean; $opacity?: number }>`
  font-family: ${theme.fonts.primary};
  color: ${({ $color }) => getColor($color)};
  text-align: ${({ $align }) => $align};
  font-weight: ${({ $weight }) => $weight && getWeight($weight)};
  opacity: ${({ $opacity }) => $opacity};
  
  ${({ $variant }) => getVariantStyles($variant)}
  
  ${({ $margin, $variant }) =>
    $margin &&
    ($variant?.startsWith('h') || $variant === 'body1' || $variant === 'body2') &&
    css`
      margin-bottom: ${theme.spacing[4]};
      
      &:last-child {
        margin-bottom: 0;
      }
    `}
`

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'primary',
  align = 'left',
  weight,
  margin = true,
  opacity,
  as,
  children,
  ...props
}) => {
  const element = as || getDefaultElement(variant)
  
  return (
    <StyledTypography as={element} $variant={variant} $color={color} $align={align} $weight={weight} $margin={margin} $opacity={opacity} {...props}>
      {children}
    </StyledTypography>
  )
}

// Componentes de conveniência
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
)

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
)

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
)

export const Body: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body1" {...props} />
)

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
)

export default Typography
