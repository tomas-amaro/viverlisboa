import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'

interface CardProps {
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  clickable?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const getPadding = (padding: CardProps['padding']) => {
  switch (padding) {
    case 'sm':
      return theme.spacing[4]
    case 'md':
      return theme.spacing[6]
    case 'lg':
      return theme.spacing[8]
    default:
      return theme.spacing[6]
  }
}

const getShadow = (shadow: CardProps['shadow']) => {
  switch (shadow) {
    case 'sm':
      return theme.shadows.sm
    case 'md':
      return theme.shadows.md
    case 'lg':
      return theme.shadows.lg
    case 'xl':
      return theme.shadows.xl
    default:
      return theme.shadows.base
  }
}

const StyledCard = styled.div<{ $padding: CardProps['padding']; $shadow: CardProps['shadow']; $hover?: boolean; $clickable?: boolean; onClick?: () => void }>`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${({ $shadow }) => getShadow($shadow)};
  padding: ${({ $padding }) => getPadding($padding)};
  transition: ${theme.transitions.base};
  border: 1px solid ${theme.colors.gray[200]};
  ${({ $hover }) =>
    $hover &&
    css`
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.lg};
      }
    `}
  
  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.lg};
      }
      
      &:active {
        transform: translateY(0);
      }
    `}
  
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`

const CardHeader = styled.div`
  margin-bottom: ${theme.spacing[4]};
  
  &:last-child {
    margin-bottom: 0;
  }
`

const CardTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
  line-height: 1.3;
`

const CardSubtitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin: 0;
`

const CardContent = styled.div`
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  
  p {
    margin-bottom: ${theme.spacing[3]};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const CardFooter = styled.div`
  margin-top: ${theme.spacing[4]};
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid ${theme.colors.gray[200]};
  
  &:first-child {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
`

const CardImage = styled.div<{ $padding?: CardProps['padding'] }>`
  margin: -${({ $padding = 'md' }) => getPadding($padding)};
  margin-bottom: ${theme.spacing[4]};
  
  img {
    width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
    display: block;
  }
`
export const Card = ({ children, padding = 'md', shadow = 'sm', hover, clickable, onClick, ...props }: CardProps) => {
  return <StyledCard $padding={padding} $shadow={shadow} $hover={hover} $clickable={clickable} onClick={onClick} {...props}>{children}</StyledCard>
}

const CardComponent = Card as typeof Card & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Subtitle: typeof CardSubtitle;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
  Image: typeof CardImage;
}

CardComponent.Header = CardHeader;
CardComponent.Title = CardTitle;
Card.Subtitle = CardSubtitle
Card.Content = CardContent
Card.Footer = CardFooter
Card.Image = CardImage

export default Card
