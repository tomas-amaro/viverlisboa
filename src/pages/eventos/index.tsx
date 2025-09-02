import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { EventCard } from '../../components/content'
import { Container, Grid, Typography, Button } from '../../components/ui'
import { getBuildConfiguration, CampaignWithContent } from '../../lib/campaignUtils'
import { Event } from '../../types/sanity'

interface EventsPageProps {
  events: Event[]
  campaign: CampaignWithContent
  navigation: Array<{
    href: string
    label: string
    count?: number
  }>
  navigationLabel: string
}

export default function EventsPage({ events, campaign, navigationLabel }: EventsPageProps) {
  // Separate past and upcoming events
  const now = new Date()
  const upcomingEvents = events.filter(event => new Date(event.date) >= now)
  const pastEvents = events.filter(event => new Date(event.date) < now)

  return (
    <>
      <Head>
        <title>{navigationLabel} | {campaign.title}</title>
        <meta 
          name="description" 
          content={`Participe nos ${navigationLabel.toLowerCase()} da campanha ${campaign.title}`}
        />
      </Head>
        <Container>
          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                              <Typography variant="h1" margin={true}>
                  {navigationLabel}
                </Typography>
              <Typography variant="body1" color="secondary">
                Participe nos nossos eventos e ajude a construir o futuro da nossa comunidade
              </Typography>
            </div>

            {events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <Typography variant="h3" margin={true}>
                  Em breve
                </Typography>
                <Typography variant="body1" color="secondary" margin={true}>
                  Os nossos eventos serão anunciados em breve. Fique atento!
                </Typography>
                <Button href="/">Voltar ao Início</Button>
              </div>
            ) : (
              <>
                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                  <section style={{ marginBottom: '4rem' }}>
                                         <Typography variant="h2" color="primary" margin={true}>
                       Próximos Eventos
                     </Typography>
                    <Grid columns={3} gap={2}>
                      {upcomingEvents.map((event) => (
                        <EventCard
                          key={event._id}
                          event={event}
                          featured={event.featured}
                        />
                      ))}
                    </Grid>
                  </section>
                )}

                {/* Past Events */}
                {pastEvents.length > 0 && (
                  <section>
                                         <Typography variant="h2" margin={true} color="primary">
                       Eventos Passados
                     </Typography>
                    <Grid columns={3} gap={2}>
                      {pastEvents.map((event) => (
                        <div key={event._id} style={{ opacity: 0.7 }}>
                          <EventCard
                            event={event}
                            featured={event.featured}
                          />
                        </div>
                      ))}
                    </Grid>
                  </section>
                )}
              </>
            )}
            </div>
          </Container>
      </>
    )
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async () => {
  try {
    const { campaign, navigation, shouldGenerate } = await getBuildConfiguration()

    // Only generate this page if events are enabled and exist
    if (!shouldGenerate.events) {
      return {
        notFound: true
      }
    }

    const { getCampaignEvents } = await import('../../lib/campaignUtils')
    const events = await getCampaignEvents(campaign._id, 50)

    return {
      props: {
        events,
        campaign,
        navigation,
        navigationLabel: campaign.navigationLabels?.events || 'Eventos'
      },

    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}
