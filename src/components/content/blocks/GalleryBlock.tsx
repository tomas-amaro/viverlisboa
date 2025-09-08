import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { Container, Typography } from '@/components/ui'
import { theme } from '@/styles/theme'
import { urlFor } from '@/lib/sanity'
import { GalleryBlockProps, BlockComponentProps } from './types'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

interface Props extends BlockComponentProps {
  block: GalleryBlockProps
}

const GallerySection = styled.section`
  padding: ${theme.spacing[12]} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[8]} 0;
  }
`

const Title = styled(Typography)`
  margin-bottom: ${theme.spacing[8]};
  text-align: center;
`

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${theme.transitions.base};
  
  &:hover {
    transform: scale(1.05);
  }
`

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: ${theme.spacing[4]} ${theme.spacing[3]} ${theme.spacing[3]};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  opacity: 0;
  transition: opacity ${theme.transitions.base};
  
  ${ImageContainer}:hover & {
    opacity: 1;
  }
`

const CarouselContainer = styled.div`
  .swiper {
    padding: ${theme.spacing[4]} 0 ${theme.spacing[8]};
  }
  
  .swiper-slide {
    height: auto;
  }
  
  .swiper-pagination {
    bottom: 0 !important;
  }
  
  .swiper-pagination-bullet {
    background: ${theme.colors.primary.blue};
    opacity: 0.3;
    
    &.swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: ${theme.colors.primary.blue};
    
    &:after {
      font-size: 20px;
    }
  }
`

const PlaceholderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[4]};
`

const PlaceholderItem = styled.div`
  aspect-ratio: 4/3;
  background: ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.lg};
  text-align: center;
  padding: ${theme.spacing[4]};
`

const renderImageItem = (image: GalleryBlockProps['images'][0], index: number) => (
  <ImageContainer key={index}>
    <StyledImage
      src={urlFor(image).width(800).height(600).url()}
      alt={image.alt}
      width={800}
      height={600}
      priority={index < 3}
    />
    {image.caption && (
      <ImageCaption>
        {image.caption}
      </ImageCaption>
    )}
  </ImageContainer>
)

export const GalleryBlock: React.FC<Props> = ({ block }) => {
  // Se não há imagens, mostrar placeholder
  if (!block.images || block.images.length === 0) {
    return (
      <GallerySection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {block.title && (
              <Title variant="h2">
                {block.title}
              </Title>
            )}
            
            <PlaceholderGrid>
              {Array.from({ length: 3 }).map((_, index) => (
                <PlaceholderItem key={index}>
                  📸 Galeria de Imagens
                  <br />
                  <small>Adicione imagens no Sanity Studio</small>
                </PlaceholderItem>
              ))}
            </PlaceholderGrid>
          </motion.div>
        </Container>
      </GallerySection>
    )
  }

  return (
    <GallerySection>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {block.title && (
            <Title variant="h2">
              {block.title}
            </Title>
          )}
          
            <CarouselContainer>
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                }}
              >
                {block.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    {renderImageItem(image, index)}
                  </SwiperSlide>
                ))}
              </Swiper>
            </CarouselContainer>
        </motion.div>
      </Container>
    </GallerySection>
  )
}
