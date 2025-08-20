import Image from 'next/image'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { Container, Button, Typography } from '@/components/ui'
import { urlFor } from '@/lib/sanity'
import { SanityImage } from '@/types/sanity'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaUrl?: string
  backgroundImage?: SanityImage
  overlay?: boolean
  height?: 'sm' | 'md' | 'lg' | 'xl'
  textAlign?: 'left' | 'center' | 'right'
  campaignColors?: {
    primary: string
    secondary: string
  }
}

const getHeight = (height: HeroSectionProps['height']) => {
  switch (height) {
    case 'sm':
      return '400px'
    case 'md':
      return '500px'
    case 'lg':
      return '600px'
    case 'xl':
      return '700px'
    default:
      return '600px'
  }
}

const HeroContainer = styled.section<{ $height: HeroSectionProps['height']; $hasImage: boolean }>`
  position: relative;
  min-height: ${({ $height = 'lg' }) => getHeight($height)};
  display: flex;
  align-items: center;
  overflow: hidden;
  
  ${({ $hasImage }) =>
    $hasImage
      ? css`
          background: linear-gradient(
            135deg,
            ${theme.colors.primary.blue} 0%,
            ${theme.colors.primary.teal} 100%
          );
        `
      : css`
          background: linear-gradient(
            135deg,
            ${theme.colors.primary.blue} 0%,
            ${theme.colors.primary.teal} 50%,
            ${theme.colors.primary.carmin} 100%
          );
        `}
  
  @media (max-width: ${theme.breakpoints.md}) {
    min-height: ${({ $height = 'lg' }) => 
      $height === 'xl' ? '600px' : 
      $height === 'lg' ? '500px' : 
      $height === 'md' ? '400px' : '350px'};
  }
`

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Overlay = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(72, 185, 202, 0.8) 0%,
    rgba(35, 117, 126, 0.9) 100%
  );
  z-index: 2;
  
  ${({ $show }) => !$show && css`
    display: none;
  `}
`

const HeroContent = styled(Container)<{ $textAlign: HeroSectionProps['textAlign'] }>`
  position: relative;
  z-index: 3;
  color: ${theme.colors.text.white};
  text-align: ${({ $textAlign = 'left' }) => $textAlign};
  
  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
  }
`

const HeroTitle = styled(motion.h1)`
  font-size: ${theme.fontSizes['6xl']};
  font-weight: ${theme.fontWeights.black};
  line-height: 1.1;
  margin-bottom: ${theme.spacing[6]};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.fontSizes['5xl']};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['4xl']};
    margin-bottom: ${theme.spacing[4]};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`

const HeroSubtitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing[4]};
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
    margin-bottom: ${theme.spacing[3]};
  }
`

const HeroDescription = styled(motion.p)`
  font-size: ${theme.fontSizes.lg};
  line-height: 1.6;
  margin-bottom: ${theme.spacing[8]};
  opacity: 0.9;
  max-width: 600px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.base};
    margin-bottom: ${theme.spacing[6]};
    margin-left: auto;
    margin-right: auto;
  }
`

const HeroCTA = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing[4]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    > * {
      min-width: 200px;
    }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    > * {
      min-width: 100%;
    }
  }
`

const DecorativeElement = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &:nth-child(1) {
    top: 10%;
    right: 10%;
    z-index: 2;
  }
  
  &:nth-child(2) {
    bottom: 20%;
    left: 5%;
    width: 150px;
    height: 150px;
    z-index: 2;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaUrl,
  backgroundImage,
  overlay = true,
  height = 'lg',
  textAlign = 'left',
  campaignColors,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const decorativeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  }

  return (
    <HeroContainer $height={height} $hasImage={!!backgroundImage}>
      {backgroundImage && (
        <BackgroundImage>
          <Image
            src={urlFor(backgroundImage).width(1920).height(1080).quality(90).url()}
            alt={backgroundImage.alt || ''}
            fill
            priority
            sizes="100vw"
          />
        </BackgroundImage>
      )}
      
      <Overlay $show={overlay || !!backgroundImage} />
      
      <DecorativeElement
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      />
      <DecorativeElement
        variants={decorativeVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
      />

      <HeroContent $textAlign={textAlign}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroTitle variants={itemVariants}>
            {title}
          </HeroTitle>
          
          {subtitle && (
            <HeroSubtitle variants={itemVariants}>
              {subtitle}
            </HeroSubtitle>
          )}
          
          {description && (
            <HeroDescription variants={itemVariants}>
              {description}
            </HeroDescription>
          )}
          
          {ctaText && ctaUrl && (
            <HeroCTA variants={itemVariants}>
              <Button
                href={ctaUrl}
                size="lg"
                variant="secondary"
              >
                {ctaText}
              </Button>
              <Button
                href="/propostas"
                size="lg"
                variant="outline"
              >
                Ver Propostas
              </Button>
            </HeroCTA>
          )}
        </motion.div>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
