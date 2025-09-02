import styled from 'styled-components'
import { theme } from '../../styles/theme'

interface GeometricBackgroundProps {
  variant?: 'primary' | 'secondary' | 'hero' | 'subtle'
  className?: string
}

const BackgroundContainer = styled.div<{ $variant: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;

  ${({ $variant }) => {
    switch ($variant) {
      case 'hero':
        return `
          background: linear-gradient(135deg, 
            ${theme.colors.primary.blue} 0%, 
            ${theme.colors.primary.teal} 30%, 
            ${theme.colors.primary.carmin} 65%, 
            ${theme.colors.primary.red} 100%
          );
        `
      case 'primary':
        return `
          background: linear-gradient(135deg, 
            ${theme.colors.primary.blue} 0%, 
            ${theme.colors.primary.teal} 100%
          );
        `
      case 'secondary':
        return `
          background: linear-gradient(135deg, 
            ${theme.colors.primary.carmin} 0%, 
            ${theme.colors.primary.red} 100%
          );
        `
      case 'subtle':
        return `
          background: linear-gradient(135deg, 
            rgba(72, 185, 202, 0.1) 0%, 
            rgba(35, 117, 126, 0.05) 100%
          );
        `
      default:
        return `
          background: ${theme.colors.primary.blue};
        `
    }
  }}
`

const GeometricShape = styled.div<{ 
  $variant: string
  $top?: string
  $left?: string
  $right?: string
  $bottom?: string
  $width: string
  $height: string
  $rotation?: string
  $opacity?: number
}>`
  position: absolute;
  top: ${props => props.$top || 'auto'};
  left: ${props => props.$left || 'auto'};
  right: ${props => props.$right || 'auto'};
  bottom: ${props => props.$bottom || 'auto'};
  width: ${props => props.$width};
  height: ${props => props.$height};
  transform: rotate(${props => props.$rotation || '0deg'});
  opacity: ${props => props.$opacity || 1};
  z-index: 2;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'hero':
        return `
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 255, 255, 0.25) 100%
          );
          clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
          border-left: 4px solid rgba(255, 255, 255, 0.6);
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
        `
      case 'primary':
        return `
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.45) 0%, 
            rgba(255, 255, 255, 0.3) 100%
          );
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%);
          border-left: 3px solid rgba(255, 255, 255, 0.6);
          box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1);
        `
      case 'secondary':
        return `
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 255, 255, 0.25) 100%
          );
          clip-path: polygon(0% 0, 75% 0, 100% 100%, 0% 100%);
          border-right: 3px solid rgba(255, 255, 255, 0.6);
          box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1);
        `
      case 'subtle':
        return `
          background: linear-gradient(135deg, 
            rgba(72, 185, 202, 0.35) 0%, 
            rgba(35, 117, 126, 0.2) 100%
          );
          clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
          border-left: 3px solid rgba(72, 185, 202, 0.5);
          box-shadow: inset 0 0 15px rgba(72, 185, 202, 0.1);
        `
      default:
        return `
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%, 
            rgba(255, 255, 255, 0.25) 100%
          );
          clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
          border-left: 3px solid rgba(255, 255, 255, 0.5);
          box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1);
        `
    }
  }}

  @media (max-width: ${theme.breakpoints.md}) {
    width: ${props => {
      const width = parseInt(props.$width)
      return `${Math.max(width * 0.7, 200)}px`
    }};
    height: ${props => {
      const height = parseInt(props.$height)
      return `${Math.max(height * 0.7, 150)}px`
    }};
  }
`

const PatternLines = styled.div<{ $variant: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.15);
    transform-origin: center;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'hero':
        return `
          &::before {
            top: 25%;
            right: 0;
            width: 60%;
            height: 3px;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
          }
          &::after {
            top: 65%;
            right: 10%;
            width: 40%;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%);
          }
        `
      case 'primary':
        return `
          &::before {
            top: 40%;
            right: 0;
            width: 50%;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 80%, transparent 100%);
          }
        `
      case 'secondary':
        return `
          &::before {
            bottom: 40%;
            left: 0;
            width: 45%;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 80%, transparent 100%);
          }
        `
      default:
        return ''
    }
  }}
`

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({
  variant = 'primary',
  className
}) => {
  const shapes = {
    hero: [
      { top: '0%', right: '0%', width: '60%', height: '100%', rotation: '0deg', opacity: 1 },
      { top: '0%', right: '30%', width: '40%', height: '100%', rotation: '0deg', opacity: 0.7 },
      { top: '0%', right: '50%', width: '30%', height: '100%', rotation: '0deg', opacity: 0.5 },
    ],
    primary: [
      { top: '0%', right: '0%', width: '50%', height: '100%', rotation: '0deg', opacity: 1 },
      { top: '0%', right: '30%', width: '25%', height: '100%', rotation: '0deg', opacity: 0.6 },
    ],
    secondary: [
      { top: '0%', left: '0%', width: '45%', height: '100%', rotation: '0deg', opacity: 1 },
      { top: '0%', left: '25%', width: '30%', height: '100%', rotation: '0deg', opacity: 0.6 },
    ],
    subtle: [
      { top: '0%', right: '0%', width: '40%', height: '100%', rotation: '0deg', opacity: 1 },
    ]
  }

  return (
    <BackgroundContainer $variant={variant} className={className}>
      <PatternLines $variant={variant} />
      {shapes[variant]?.map((shape, index) => (
        <GeometricShape
          key={index}
          $variant={variant}
          $top={shape.top}
          $left={'left' in shape ? shape.left as string : undefined}
          $right={'right' in shape ? shape.right as string : undefined}
          $bottom={'bottom' in shape ? shape.bottom as string : undefined}
          $width={shape.width}
          $height={shape.height}
          $rotation={shape.rotation}
          $opacity={shape.opacity}
        />
      ))}
    </BackgroundContainer>
  )
}

export { GeometricBackground }
