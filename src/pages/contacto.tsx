import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { Container, Grid, Typography, Button, Card } from '../components/ui'
import { getBuildConfiguration, CampaignWithContent } from '../lib/campaignUtils'
import { theme } from '../styles/theme'

interface ContactPageProps {
  campaign: CampaignWithContent
  navigation: Array<{
    href: string
    label: string
    count?: number
  }>
}

const ContactSection = styled.section`
  padding: 2rem 0 4rem 0;
`

const ContactCard = styled(Card)`
  height: 100%;
  padding: 2rem;
  text-align: center;
  
  h3 {
    color: ${theme.colors.primary.blue};
    margin-bottom: 1rem;
  }
  
  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${theme.colors.primary.red};
  }
`

const ContactForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${theme.shadows.md};
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.text.primary};
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.blue};
      box-shadow: 0 0 0 2px ${theme.colors.primary.blue}20;
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`

const MapContainer = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  
  .map-placeholder {
    background: #e9ecef;
    height: 300px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    font-size: 1.1rem;
  }
`

export default function ContactPage({ campaign }: ContactPageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - could integrate with email service
    alert('Obrigado pela sua mensagem! Entraremos em contacto brevemente.')
  }

  return (
    <>
      <Head>
        <title>Contacto | {campaign.title}</title>
        <meta 
          name="description" 
          content={`Entre em contacto com a equipa ${campaign.title}. Estamos aqui para ouvir as suas ideias e responder às suas questões.`}
        />
      </Head>
        <Container>
          <ContactSection>
            {/* Header */}
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <Typography variant="h1" margin={true}>
                Entre em Contacto
              </Typography>
              <Typography variant="body1" color="secondary">
                Estamos aqui para ouvir as suas ideias, responder às suas questões e trabalhar juntos por uma freguesia melhor.
              </Typography>
            </div>

            {/* Contact Methods */}
            <div style={{ marginBottom: '4rem' }}>
              <Grid columns={3} gap={2}>
                <ContactCard>
                  <div className="icon">📧</div>
                  <Typography variant="h3" margin={false}>
                    Email
                  </Typography>
                  <Typography variant="body1" color="secondary" margin={true}>
                    Para questões gerais e propostas
                  </Typography>
                  <a 
                    href="mailto:geral@viveravenidas.pt"
                    style={{ 
                      color: theme.colors.primary.blue,
                      textDecoration: 'none',
                      fontWeight: theme.fontWeights.medium
                    }}
                  >
                    geral@viveravenidas.pt
                  </a>
                </ContactCard>

                <ContactCard>
                  <div className="icon">📞</div>
                  <Typography variant="h3" margin={false}>
                    Telefone
                  </Typography>
                  <Typography variant="body1" color="secondary" margin={true}>
                    Linha de apoio ao cidadão
                  </Typography>
                  <a 
                    href="tel:+351210123456"
                    style={{ 
                      color: theme.colors.primary.blue,
                      textDecoration: 'none',
                      fontWeight: theme.fontWeights.medium
                    }}
                  >
                    210 123 456
                  </a>
                </ContactCard>

                <ContactCard>
                  <div className="icon">📍</div>
                  <Typography variant="h3" margin={false}>
                    Morada
                  </Typography>
                  <Typography variant="body1" color="secondary" margin={true}>
                    Sede da campanha
                  </Typography>
                  <Typography variant="body2" color="primary">
                    Rua das Avenidas Novas, 123<br />
                    1000-001 Lisboa
                  </Typography>
                </ContactCard>
              </Grid>
            </div>

            {/* Contact Form and Map */}
            <Grid columns={2} gap={3}>
              <div>
                <Typography variant="h2" margin={true}>
                  Envie-nos uma Mensagem
                </Typography>
                <ContactForm onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nome Completo *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Telefone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Assunto</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Mensagem *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      placeholder="Conte-nos sobre as suas ideias, sugestões ou questões..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    style={{ width: '100%' }}
                  >
                    Enviar Mensagem
                  </Button>
                </ContactForm>
              </div>

              <div>
                <Typography variant="h2" margin={true}>
                  Como nos Encontrar
                </Typography>
                <MapContainer>
                  <div className="map-placeholder">
                    🗺️ Mapa interativo em breve
                  </div>
                  <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                    <Typography variant="h4" margin={false}>
                      Horário de Atendimento:
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      <strong>Segunda a Sexta:</strong> 9h00 - 18h00<br />
                      <strong>Sábados:</strong> 9h00 - 13h00<br />
                      <strong>Domingos:</strong> Encerrado
                    </Typography>
                  </div>
                </MapContainer>

                <div style={{ marginTop: '2rem' }}>
                  <Typography variant="h4" margin={true}>
                    Redes Sociais
                  </Typography>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {campaign.socialMedia?.facebook && (
                      <Button
                        variant="outline"
                        size="sm"
                        href={campaign.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Facebook
                      </Button>
                    )}
                    {campaign.socialMedia?.instagram && (
                      <Button
                        variant="outline"
                        size="sm"
                        href={campaign.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </Button>
                    )}
                    {campaign.socialMedia?.twitter && (
                      <Button
                        variant="outline"
                        size="sm"
                        href={campaign.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          </ContactSection>
        </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  try {
    const { campaign, navigation } = await getBuildConfiguration()

    return {
      props: {
        campaign,
        navigation
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}
