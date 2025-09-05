import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: React.ReactNode
  href?: string
  // Allow all button and anchor attributes
  [key: string]: unknown
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary.blue};
        color: ${theme.colors.text.white};
        border: 2px solid ${theme.colors.primary.blue};
        
        &:hover:not(:disabled) {
          border-color: ${theme.colors.primary.teal};
        }
      `
    case 'secondary':
      return css`
        background-color: ${theme.colors.primary.red};
        color: ${theme.colors.text.white};
        border: 2px solid ${theme.colors.primary.red};
        
        &:hover:not(:disabled) {
          border-color: ${theme.colors.primary.carmin};
        }
      `
    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary.blue};
        border: 2px solid ${theme.colors.primary.blue};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.blue};
          color: ${theme.colors.text.white};
        }
      `
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary.blue};
        border: 2px solid transparent;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.gray[100]};
        }
      `
    default:
      return ''
  }
}

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing[2]} ${theme.spacing[4]};
        font-size: ${theme.fontSizes.sm};
        min-height: 36px;
      `
    case 'md':
      return css`
        padding: ${theme.spacing[3]} ${theme.spacing[6]};
        font-size: ${theme.fontSizes.base};
        min-height: 44px;
      `
    case 'lg':
      return css`
        padding: ${theme.spacing[4]} ${theme.spacing[8]};
        font-size: ${theme.fontSizes.lg};
        min-height: 52px;
      `
    default:
      return ''
  }
}

const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.bold};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.base};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: ${theme.shadows.md};
  
  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}
  
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  &:focus {
    outline: 3px solid rgba(72, 185, 202, 0.5);
    outline-offset: 2px;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.lg};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: ${theme.shadows.base};
  }
  
  /* Diagonal accent effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    transition: width 0.3s ease;
    z-index: 1;
  }
  
  &:hover::before {
    width: 30px;
  }
  
  /* Text content */
  > * {
    position: relative;
    z-index: 2;
  }
`

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth,
  ...props
}) => {
  if (href) {
    return (
      <StyledButton as="a" href={href} $variant={variant} $size={size} $fullWidth={fullWidth}>
        {children}
      </StyledButton>
    )
  }

  return <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>{children}</StyledButton>
}

export default Button
