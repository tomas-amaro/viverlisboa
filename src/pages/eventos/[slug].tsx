import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { Container, Typography, Button } from '../../components/ui'
import { ContentRenderer } from '../../components/content'
import { getBuildConfiguration, getCampaignEvents, CampaignWithContent } from '../../lib/campaignUtils'
import { client } from '../../lib/sanity'
import { ContentBlock } from '../../types/sanity'
import Link from 'next/link'

interface Event {
  _id: string
  title: string
  slug: { current: string }
  date: string
  time?: string
  location?: string
  description?: ContentBlock[]
  image?: { asset: { url: string }; alt?: string }
  registrationUrl?: string
  eventType: string
  featured: boolean
}

interface EventPageProps {
  event: Event
  campaign: CampaignWithContent
}

export default function EventPage({ event, campaign }: EventPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isUpcoming = new Date(event.date) >= new Date()

  const eventTypeLabels = {
    comicio: "Comício",
    debate: "Debate",
    encontro: "Encontro", 
    apresentacao: "Apresentação",
    conferencia: "Conferência",
    arruada: "Arruada",
    outro: "Evento"
  }

  return (
    <>
      <Head>
        <title>{event.title} | {campaign.title}</title>
        <meta 
          name="description" 
          content={`${eventTypeLabels[event.eventType as keyof typeof eventTypeLabels]} - ${formatDate(event.date)}`}
        />
      </Head>
        <Container>
          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '2rem' }}>
              <Typography variant="body2" color="secondary">
                <Link href="/eventos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {campaign.navigationLabels?.events || 'Eventos'}
                </Link>
                {' / '}
                <span>{event.title}</span>
              </Typography>
            </div>

            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{
                  background: campaign.mainColor || '#48B9CA',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  {eventTypeLabels[event.eventType as keyof typeof eventTypeLabels]}
                </span>
                {event.featured && (
                  <span style={{
                    background: '#FFD700',
                    color: '#333',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    Evento Destacado
                  </span>
                )}
                <span style={{
                  background: isUpcoming ? '#059669' : '#6B7280',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  {isUpcoming ? 'Próximo' : 'Passado'}
                </span>
              </div>

              <Typography variant="h1" margin={true}>
                {event.title}
              </Typography>

              {/* Event Details */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'rgba(72, 185, 202, 0.05)',
                borderRadius: '8px',
                border: `1px solid ${campaign.mainColor || '#48B9CA'}20`
              }}>
                <div>
                  <Typography variant="body2" color="primary" margin={false}>
                    📅 Data
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(event.date)}
                  </Typography>
                </div>

                {event.time && (
                  <div>
                    <Typography variant="body2" color="primary" margin={false}>
                      🕐 Hora
                    </Typography>
                    <Typography variant="body1">
                      {event.time}
                    </Typography>
                  </div>
                )}

                {event.location && (
                  <div>
                    <Typography variant="body2" color="primary" margin={false}>
                      📍 Local
                    </Typography>
                    <Typography variant="body1">
                      {event.location}
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            {/* Event Image */}
            {event.image && (
              <div style={{ marginBottom: '3rem' }}>
                <img 
                  src={event.image.asset.url}
                  alt={event.image.alt || event.title}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
            )}

            {/* Event Description */}
            {event.description && (
              <div style={{ marginBottom: '3rem' }}>
                <Typography variant="h3" margin={true}>
                  Sobre o Evento
                </Typography>
                <ContentRenderer content={event.description} campaign={campaign} />
              </div>
            )}

            {/* Registration CTA */}
            {event.registrationUrl && isUpcoming && (
              <div style={{ 
                padding: '2rem',
                background: `linear-gradient(135deg, ${campaign.mainColor || '#48B9CA'}10, ${campaign.secondaryColor || '#FF394C'}10)`,
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
                <Typography variant="h3" margin={true}>
                  Participe neste evento
                </Typography>
                <Typography variant="body1" margin={true}>
                  Junte-se a nós neste evento e ajude a construir o futuro da nossa comunidade.
                </Typography>
                <Button 
                  variant="primary" 
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Inscrever-se no Evento
                </Button>
              </div>
            )}

            {/* Navigation */}
            <div style={{ 
              borderTop: '1px solid #eee',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Button 
                variant="outline" 
                href="/eventos"
              >
                ← Todos os {campaign.navigationLabels?.events || 'Eventos'}
              </Button>
              <Button 
                variant="primary" 
                href="/contacto"
              >
                Fale Connosco
              </Button>
            </div>
          </div>
        </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { campaign, shouldGenerate } = await getBuildConfiguration()

    // Only generate paths if events are enabled and exist
    if (!shouldGenerate.events) {
      return {
        paths: [],
        fallback: false
      }
    }

    const events = await getCampaignEvents(campaign._id, 100)
    
    const paths = events.map((event: { slug: { current: string } }) => ({
      params: { slug: event.slug.current }
    }))

    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { campaign } = await getBuildConfiguration()
    const slug = params?.slug as string

    const event = await client.fetch(`
      *[_type == "event" && slug.current == $slug && references($campaignId)][0]{
        _id,
        title,
        slug,
        date,
        time,
        location,
        description,
        image{
          asset->{
            _id,
            url
          },
          alt
        },
        registrationUrl,
        eventType,
        featured
      }
    `, { slug, campaignId: campaign._id })

    if (!event) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        event,
        campaign
      },

    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}
