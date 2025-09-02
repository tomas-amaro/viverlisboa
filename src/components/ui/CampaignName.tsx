import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

interface CampaignNameProps {
  mainTitle?: string
  candidateName?: string
  year?: string
  variant?: 'default' | 'white' | 'mixed' | 'custom'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  mainTitleColor?: string
  candidateColor?: string
  yearColor?: string
  className?: string
  style?: React.CSSProperties
}

const CampaignContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.primary};
  text-transform: uppercase;
  line-height: 0.85;
  letter-spacing: -0.02em;
  text-align: left;
  align-items: flex-start;
`

const MainTitle = styled.h1<{ $color?: string; $size: string }>`
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 0.75;
  color: ${props => props.$color || theme.colors.primary.blue};
  
  .viver-italic {
    transform: skew(-8deg);
    display: inline-block;
  }
  
  ${({ $size }) => {
    switch ($size) {
      case 'xs':
        return `
          font-size: clamp(0.9rem, 3vw, 1.2rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.8rem, 4vw, 1rem);
          }
        `
      case 'sm':
        return `
          font-size: clamp(1.2rem, 4vw, 1.8rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(1rem, 5vw, 1.5rem);
          }
        `
      case 'md':
        return `
          font-size: clamp(1.8rem, 6vw, 3rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(1.5rem, 7vw, 2.5rem);
          }
        `
      case 'lg':
        return `
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(2rem, 9vw, 3.5rem);
          }
        `
      case 'xl':
        return `
          font-size: clamp(3.5rem, 10vw, 6rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(2.5rem, 11vw, 4.5rem);
          }
        `
      case 'hero':
        return `
          font-size: clamp(4rem, 12vw, 8rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(3rem, 13vw, 6rem);
          }
        `
      default: // md
        return `
          font-size: clamp(1.8rem, 6vw, 3rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(1.5rem, 7vw, 2.5rem);
          }
        `
    }
  }}
`

const CandidateName = styled.h2<{ $color?: string; $size: string }>`
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 0.9;
  margin-top: 0.1em;
  color: ${props => props.$color || theme.colors.primary.red};
  
  ${({ $size }) => {
    switch ($size) {
      case 'xs':
        return `
          font-size: clamp(0.6rem, 2vw, 0.8rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.5rem, 2.5vw, 0.7rem);
          }
        `
      case 'sm':
        return `
          font-size: clamp(0.8rem, 2.5vw, 1.2rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.7rem, 3vw, 1rem);
          }
        `
      case 'md':
        return `
          font-size: clamp(1rem, 3vw, 1.8rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.9rem, 3.5vw, 1.5rem);
          }
        `
      case 'lg':
        return `
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(1.2rem, 4.5vw, 2rem);
          }
        `
      case 'xl':
        return `
          font-size: clamp(2rem, 5vw, 3.2rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(1.6rem, 5.5vw, 2.8rem);
          }
        `
      case 'hero':
        return `
          font-size: clamp(2.5rem, 6vw, 4rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(2rem, 6.5vw, 3.5rem);
          }
        `
      default: // md
        return `
          font-size: clamp(1rem, 3vw, 1.8rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.9rem, 3.5vw, 1.5rem);
          }
        `
    }
  }}
`

const Year = styled.span<{ $color?: string; $size: string }>`
  font-weight: 400;
  margin: 0;
  letter-spacing: 0;
  line-height: 1;
  margin-top: 0.2em;
  opacity: 0.8;
  color: ${props => props.$color || theme.colors.primary.red};
  
  ${({ $size }) => {
    switch ($size) {
      case 'xs':
        return `
          font-size: clamp(0.5rem, 1.5vw, 0.7rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.4rem, 2vw, 0.6rem);
          }
        `
      case 'sm':
        return `
          font-size: clamp(0.7rem, 2vw, 1rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.6rem, 2.5vw, 0.9rem);
          }
        `
      case 'md':
        return `
          font-size: clamp(0.9rem, 2.5vw, 1.4rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.8rem, 3vw, 1.2rem);
          }
        `
      case 'lg':
        return `
          font-size: clamp(1.2rem, 3vw, 2rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(1rem, 3.5vw, 1.7rem);
          }
        `
      case 'xl':
        return `
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(1.3rem, 4.5vw, 2.2rem);
          }
        `
      case 'hero':
        return `
          font-size: clamp(2rem, 5vw, 3.2rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(1.6rem, 5.5vw, 2.8rem);
          }
        `
      default: // md
        return `
          font-size: clamp(0.9rem, 2.5vw, 1.4rem);
          @media (max-width: ${theme.breakpoints.md}) {
            font-size: clamp(0.8rem, 3vw, 1.2rem);
          }
        `
    }
  }}
`

const CampaignName: React.FC<CampaignNameProps> = ({
  mainTitle = "VIVER LISBOA",
  candidateName,
  year,
  variant = 'default',
  size = 'md',
  mainTitleColor,
  candidateColor,
  yearColor,
  className,
  style
}) => {
  // Define color variants based on style guide
  const getColors = () => {
    switch (variant) {
      case 'white':
        // All white for colored backgrounds (red/teal)
        return {
          main: 'white',
          candidate: 'white',
          year: 'white'
        }
      case 'mixed':
        // Teal main title, red candidate/year for light backgrounds
        return {
          main: theme.colors.primary.teal,
          candidate: theme.colors.primary.red,
          year: theme.colors.primary.red
        }
      case 'default':
        // Blue main title, red candidate/year
        return {
          main: theme.colors.primary.blue,
          candidate: theme.colors.primary.red,
          year: theme.colors.primary.red
        }
      case 'custom':
        // Use custom colors if provided
        return {
          main: mainTitleColor || theme.colors.primary.blue,
          candidate: candidateColor || theme.colors.primary.red,
          year: yearColor || theme.colors.primary.red
        }
      default:
        return {
          main: theme.colors.primary.blue,
          candidate: theme.colors.primary.red,
          year: theme.colors.primary.red
        }
    }
  }

  const colors = getColors()

  // Function to style "VIVER" differently when it appears in the title
  const formatTitle = (title: string) => {
    if (title.toUpperCase().includes('VIVER')) {
      return title.replace(/VIVER/gi, '<span class="viver-italic">VIVER</span>')
    }
    return title
  }

  return (
    <CampaignContainer className={className} style={style}>
      <MainTitle 
        $color={colors.main}
        $size={size}
        dangerouslySetInnerHTML={{ __html: formatTitle(mainTitle) }}
      />
      {candidateName && (
        <CandidateName $color={colors.candidate} $size={size}>{candidateName}</CandidateName>
      )}
      {year && (
        <Year $color={colors.year} $size={size}>{year}</Year>
      )}
    </CampaignContainer>
  )
}

export { CampaignName }
