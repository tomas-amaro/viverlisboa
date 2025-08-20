import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'

interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  centerContent?: boolean
  children: React.ReactNode
  className?: string
}

const getMaxWidth = (maxWidth: ContainerProps['maxWidth']) => {
  switch (maxWidth) {
    case 'sm':
      return '640px'
    case 'md':
      return '768px'
    case 'lg':
      return '1024px'
    case 'xl':
      return '1280px'
    case '2xl':
      return '1536px'
    case 'full':
      return '100%'
    default:
      return '1280px'
  }
}

const StyledContainer = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth = 'xl' }) => getMaxWidth(maxWidth)};
  margin: 0 auto;
  
  ${({ padding = true }) =>
    padding &&
    css`
      padding-left: ${theme.spacing[4]};
      padding-right: ${theme.spacing[4]};
      
      @media (min-width: ${theme.breakpoints.sm}) {
        padding-left: ${theme.spacing[6]};
        padding-right: ${theme.spacing[6]};
      }
      
      @media (min-width: ${theme.breakpoints.lg}) {
        padding-left: ${theme.spacing[8]};
        padding-right: ${theme.spacing[8]};
      }
    `}
  
  ${({ centerContent }) =>
    centerContent &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    `}
`

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>
}

export default Container
