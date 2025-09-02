import styled from 'styled-components'
import { theme } from '../../styles/theme'

interface LayoutConstructionBackgroundProps {
  className?: string
  showImage?: boolean
}

const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  background: linear-gradient(135deg, 
    ${theme.colors.primary.teal} 0%, 
    ${theme.colors.primary.blue} 35%, 
    ${theme.colors.primary.carmin} 70%, 
    ${theme.colors.primary.red} 100%
  );
`

const GeometricLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

const DiagonalShape = styled.div<{
  $left?: string
  $right?: string
  $top?: string
  $width: string
  $height: string
  $opacity: number
  $clipPath: string
  $background: string
}>`
  position: absolute;
  left: ${props => props.$left || 'auto'};
  right: ${props => props.$right || 'auto'};
  top: ${props => props.$top || '0%'};
  width: ${props => props.$width};
  height: ${props => props.$height};
  background: ${props => props.$background};
  opacity: ${props => props.$opacity};
  clip-path: ${props => props.$clipPath};
  z-index: 2;
`

const GeometricLine = styled.div<{
  $left?: string
  $right?: string
  $top?: string
  $width: string
  $height: string
  $rotation?: string
  $background: string
}>`
  position: absolute;
  left: ${props => props.$left || 'auto'};
  right: ${props => props.$right || 'auto'};
  top: ${props => props.$top || '50%'};
  width: ${props => props.$width};
  height: ${props => props.$height};
  background: ${props => props.$background};
  transform: rotate(${props => props.$rotation || '0deg'}) translateY(-50%);
  z-index: 3;
`

const CityImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1555503948-782bb37419df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80') center/cover no-repeat;
  filter: blur(1px) brightness(1.1);
  opacity: 0.8;
  z-index: 1;
  clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
`

const ContentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
`

const LayoutConstructionBackground: React.FC<LayoutConstructionBackgroundProps> = ({
  className,
  showImage = true
}) => {
  return (
    <BackgroundWrapper className={className}>
      <GeometricLayer>
        {/* Main diagonal shapes - following the style guide pattern */}
        <DiagonalShape
          $right="0%"
          $width="45%"
          $height="100%"
          $opacity={0.3}
          $clipPath="polygon(30% 0, 100% 0, 100% 100%, 0% 100%)"
          $background="linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)"
        />
        
        <DiagonalShape
          $right="10%"
          $width="35%"
          $height="100%"
          $opacity={0.2}
          $clipPath="polygon(40% 0, 100% 0, 100% 100%, 10% 100%)"
          $background="linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)"
        />
        
        <DiagonalShape
          $right="20%"
          $width="25%"
          $height="100%"
          $opacity={0.15}
          $clipPath="polygon(50% 0, 100% 0, 100% 100%, 20% 100%)"
          $background="linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)"
        />

        {/* Geometric lines */}
        <GeometricLine
          $right="5%"
          $top="25%"
          $width="200px"
          $height="2px"
          $rotation="-15deg"
          $background="rgba(255, 255, 255, 0.3)"
        />
        
        <GeometricLine
          $right="15%"
          $top="60%"
          $width="150px"
          $height="1px"
          $rotation="-15deg"
          $background="rgba(255, 255, 255, 0.25)"
        />
        
        <GeometricLine
          $right="25%"
          $top="40%"
          $width="100px"
          $height="1px"
          $rotation="-15deg"
          $background="rgba(255, 255, 255, 0.2)"
        />

        {/* Additional subtle geometric elements */}
        <DiagonalShape
          $left="10%"
          $top="20%"
          $width="15%"
          $height="60%"
          $opacity={0.08}
          $clipPath="polygon(0% 0, 70% 0, 100% 100%, 0% 100%)"
          $background="linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%)"
        />
        
        <DiagonalShape
          $left="20%"
          $top="30%"
          $width="12%"
          $height="40%"
          $opacity={0.06}
          $clipPath="polygon(0% 0, 80% 0, 100% 100%, 0% 100%)"
          $background="linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, transparent 100%)"
        />
      </GeometricLayer>
      
      {showImage && <CityImage />}
      
      <ContentOverlay>
        {/* This allows content to be placed on top */}
      </ContentOverlay>
    </BackgroundWrapper>
  )
}

export { LayoutConstructionBackground }
