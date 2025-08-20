import Link from 'next/link'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { Card, Typography, Button } from '@/components/ui'
import { Event } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'

interface EventCardProps {
  event: Event
  featured?: boolean
  layout?: 'vertical' | 'horizontal'
}

const StyledCard = styled(Card)<{ $featured?: boolean; $layout: string }>`
  height: 100%;
  display: flex;
  flex-direction: ${({ $layout }) => $layout === 'horizontal' ? 'row' : 'column'};
  transition: all ${theme.transitions.base};
  position: relative;
  overflow: hidden;
  
  ${({ $featured }) =>
    $featured &&
    css`
      border: 2px solid ${theme.colors.primary.red};
      box-shadow: ${theme.shadows.lg};
      
      &::before {
        content: 'Destaque';
        position: absolute;
        top: ${theme.spacing[4]};
        right: -${theme.spacing[6]};
        background: ${theme.colors.primary.red};
        color: ${theme.colors.text.white};
        padding: ${theme.spacing[1]} ${theme.spacing[8]};
        font-size: ${theme.fontSizes.xs};
        font-weight: ${theme.fontWeights.bold};
        text-transform: uppercase;
        transform: rotate(45deg);
        z-index: 2;
      }
    `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div<{ $layout: string }>`
  position: relative;
  ${({ $layout }) =>
    $layout === 'horizontal'
      ? css`
          width: 200px;
          min-height: 150px;
          
          @media (max-width: ${theme.breakpoints.md}) {
            width: 100%;
            height: 200px;
          }
        `
      : css`
          width: 100%;
          height: 200px;
        `}
  
  img {
    object-fit: cover;
    border-radius: ${theme.borderRadius.md};
  }
`

const EventContent = styled.div<{ $layout: string }>`
  ${({ $layout }) =>
    $layout === 'horizontal'
      ? css`
          flex: 1;
          padding: ${theme.spacing[4]};
          display: flex;
          flex-direction: column;
        `
      : css`
          padding: ${theme.spacing[4]};
          display: flex;
          flex-direction: column;
          flex: 1;
        `}
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[3]};
  color: ${theme.colors.primary.blue};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
`

const DateIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.md};
  background: linear-gradient(135deg, ${theme.colors.primary.blue}, ${theme.colors.primary.teal});
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.white};
  
  svg {
    width: 18px;
    height: 18px;
  }
`

const EventTypeBadge = styled.span<{ $eventType: string }>`
  display: inline-block;
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${theme.spacing[3]};
  
  ${({ $eventType }) => {
    switch ($eventType) {
      case 'comicio':
        return css`
          background-color: rgba(255, 57, 76, 0.1);
          color: ${theme.colors.primary.red};
        `
      case 'debate':
        return css`
          background-color: rgba(72, 185, 202, 0.1);
          color: ${theme.colors.primary.blue};
        `
      case 'encontro':
        return css`
          background-color: rgba(125, 60, 75, 0.1);
          color: ${theme.colors.primary.carmin};
        `
      default:
        return css`
          background-color: rgba(125, 60, 75, 0.1);
          color: ${theme.colors.primary.carmin};
        `
    }
  }}
`

const EventTitle = styled(Typography)`
  margin-bottom: ${theme.spacing[2]};
  line-height: 1.3;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${theme.colors.primary.blue};
    }
  }
`

const EventMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[1]};
  margin-bottom: ${theme.spacing[3]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  
  svg {
    width: 16px;
    height: 16px;
    color: ${theme.colors.primary.blue};
  }
`

const EventDescription = styled(Typography)`
  flex: 1;
  margin-bottom: ${theme.spacing[4]};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-top: auto;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const getEventTypeLabel = (eventType: string): string => {
  const labels: Record<string, string> = {
    comicio: 'Comício',
    debate: 'Debate',
    encontro: 'Encontro',
    apresentacao: 'Apresentação',
    conferencia: 'Conferência',
    arruada: 'Arruada',
    outro: 'Evento',
  }
  return labels[eventType] || 'Evento'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const formatTime = (timeString?: string): string => {
  if (!timeString) return ''
  return `às ${timeString}`
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  featured = false,
  layout = 'vertical',
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const eventDate = new Date(event.date)
  const isUpcoming = eventDate > new Date()

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <StyledCard
        $featured={featured}
        $layout={layout}
        hover
        clickable
        onClick={() => window.location.href = `/eventos/${event.slug.current}`}
      >
        {event.image && (
          <ImageContainer $layout={layout}>
            <Image
              src={urlFor(event.image).width(400).height(300).quality(85).url()}
              alt={event.image.alt || event.title}
              fill
              sizes={layout === 'horizontal' ? '200px' : '(max-width: 768px) 100vw, 400px'}
            />
          </ImageContainer>
        )}
        
        <EventContent $layout={layout}>
          <EventTypeBadge $eventType={event.eventType}>
            {getEventTypeLabel(event.eventType)}
          </EventTypeBadge>
          
          <DateContainer>
            <DateIcon>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </DateIcon>
            <div>
              <div>{formatDate(event.date)}</div>
              {event.time && <div>{formatTime(event.time)}</div>}
            </div>
          </DateContainer>
          
          <EventTitle variant="h4" margin={false}>
            <Link href={`/eventos/${event.slug.current}`}>
              {event.title}
            </Link>
          </EventTitle>
          
          <EventMeta>
            {event.location && (
              <MetaItem>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {event.location}
              </MetaItem>
            )}
          </EventMeta>
          
          <EventDescription variant="body2" color="secondary" margin={false}>
            {/* Simplified description extraction - in real implementation would parse portable text */}
            Junte-se a nós neste importante evento da nossa campanha. Venha conhecer as nossas propostas e dialogar connosco sobre o futuro de Lisboa.
          </EventDescription>
          
          <CardFooter>
            <div>
              {isUpcoming ? (
                <Typography variant="caption" color="blue" weight="semibold">
                  Próximo evento
                </Typography>
              ) : (
                <Typography variant="caption" color="light">
                  Evento realizado
                </Typography>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
              <Button
                variant="ghost"
                size="sm"
                href={`/eventos/${event.slug.current}`}
              >
                Ver detalhes
              </Button>
              
              {event.registrationUrl && isUpcoming && (
                <Button
                  variant="primary"
                  size="sm"
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inscrever
                </Button>
              )}
            </div>
          </CardFooter>
        </EventContent>
      </StyledCard>
    </motion.div>
  )
}

export default EventCard
