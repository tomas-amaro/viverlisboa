import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'

interface GridProps {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  gap?: number
  children: React.ReactNode
  className?: string
}

interface GridItemProps {
  span?: number | { sm?: number; md?: number; lg?: number; xl?: number }
  children: React.ReactNode
  className?: string
}

const getColumnsCSS = (columns: GridProps['columns']) => {
  if (typeof columns === 'number') {
    return css`
      grid-template-columns: repeat(${columns}, 1fr);
    `
  }

  if (typeof columns === 'object') {
    return css`
      grid-template-columns: repeat(1, 1fr);
      
      ${columns.sm &&
      css`
        @media (min-width: ${theme.breakpoints.sm}) {
          grid-template-columns: repeat(${columns.sm}, 1fr);
        }
      `}
      
      ${columns.md &&
      css`
        @media (min-width: ${theme.breakpoints.md}) {
          grid-template-columns: repeat(${columns.md}, 1fr);
        }
      `}
      
      ${columns.lg &&
      css`
        @media (min-width: ${theme.breakpoints.lg}) {
          grid-template-columns: repeat(${columns.lg}, 1fr);
        }
      `}
      
      ${columns.xl &&
      css`
        @media (min-width: ${theme.breakpoints.xl}) {
          grid-template-columns: repeat(${columns.xl}, 1fr);
        }
      `}
    `
  }

  return css`
    grid-template-columns: repeat(1, 1fr);
  `
}

const getSpanCSS = (span: GridItemProps['span']) => {
  if (typeof span === 'number') {
    return css`
      grid-column: span ${span};
    `
  }

  if (typeof span === 'object') {
    return css`
      grid-column: span 1;
      
      ${span.sm &&
      css`
        @media (min-width: ${theme.breakpoints.sm}) {
          grid-column: span ${span.sm};
        }
      `}
      
      ${span.md &&
      css`
        @media (min-width: ${theme.breakpoints.md}) {
          grid-column: span ${span.md};
        }
      `}
      
      ${span.lg &&
      css`
        @media (min-width: ${theme.breakpoints.lg}) {
          grid-column: span ${span.lg};
        }
      `}
      
      ${span.xl &&
      css`
        @media (min-width: ${theme.breakpoints.xl}) {
          grid-column: span ${span.xl};
        }
      `}
    `
  }

  return ''
}

const StyledGrid = styled.div<{ $columns: GridProps['columns']; $gap: number }>`
  display: grid;
  gap: ${({ $gap }) => theme.spacing[$gap as keyof typeof theme.spacing]};
  ${({ $columns }) => getColumnsCSS($columns)}
`

const StyledGridItem = styled.div<{ $span?: GridItemProps['span'] }>`
  ${({ $span }) => $span && getSpanCSS($span)}
`

export const Grid: React.FC<GridProps> = ({ children, columns = 1, gap = 4, ...props }) => {
  return <StyledGrid $columns={columns} $gap={gap} {...props}>{children}</StyledGrid>
}

export const GridItem: React.FC<GridItemProps> = ({ children, span, ...props }) => {
  return <StyledGridItem $span={span} {...props}>{children}</StyledGridItem>
}

export default Grid
