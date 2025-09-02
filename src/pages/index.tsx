import { GetStaticProps } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Container, Grid, Typography, Button } from '@/components/ui'
import { HeroSection, ProposalCard, EventCard, PostCard } from '@/components/content'
import { Layout } from '@/components/layout'
import { Proposal, Event, Post } from '@/types/sanity'
import { getBuildConfiguration, CampaignWithContent } from '@/lib/campaignUtils'

interface HomePageProps {
  campaign: CampaignWithContent
  navigation: Array<{
    href: string
    label: string
    count?: number
  }>
  featuredProposals: Proposal[]
  upcomingEvents: Event[]
  recentPosts: Post[]
}

const Section = styled.section`
  padding: ${theme.spacing[16]} 0;
  
  &:nth-child(even) {
    background-color: ${theme.colors.background.secondary};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} 0;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[12]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing[8]};
  }
`

const CTASection = styled(Section)`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary.red} 0%,
    ${theme.colors.primary.carmin} 100%
  );
  color: ${theme.colors.text.white};
  text-align: center;
`

const CTAButtons = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  justify-content: center;
  margin-top: ${theme.spacing[8]};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    
    > * {
      min-width: 250px;
    }
  }
`

const HomePage: React.FC<HomePageProps> = ({
  campaign,
  navigation,
  featuredProposals,
  upcomingEvents,
  recentPosts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProposals = selectedCategory === 'all' 
    ? featuredProposals 
    : featuredProposals.filter(proposal => proposal.category === selectedCategory)

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'habitacao', label: 'Habitação' },
    { value: 'transportes', label: 'Transportes' },
    { value: 'ambiente', label: 'Ambiente' },
    { value: 'cultura', label: 'Cultura' },
  ]

  return (
    <Layout campaign={campaign} navigation={navigation}>
      {/* Hero Section */}
      <HeroSection
        title={`${campaign.title}`}
        subtitle="Juntos por uma cidade mais justa"
        description="Uma coligação de esquerda comprometida com o futuro de Lisboa. Propostas concretas para habitação, transportes, ambiente e cultura. Participe na construção de uma Lisboa para todos."
        ctaText="Conhecer Propostas"
        ctaUrl="/propostas"
        height="xl"
        campaignColors={{
          primary: campaign.mainColor,
          secondary: campaign.secondaryColor,
        }}
      />

      {/* Featured Proposals Section */}
      <Section>
        <Container>
          <SectionHeader>
            <Typography variant="h2" align="center" margin={false}>
              As nossas propostas principais
            </Typography>
            <Typography variant="body1" color="secondary" align="center">
              Soluções concretas para os problemas reais de Lisboa
            </Typography>
          </SectionHeader>

          {/* Category Filter */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: theme.spacing[2], 
            marginBottom: theme.spacing[8],
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={6}>
            {filteredProposals.slice(0, 6).map((proposal) => (
              <ProposalCard 
                key={proposal._id} 
                proposal={proposal} 
                featured={proposal.featured}
              />
            ))}
          </Grid>

          <div style={{ textAlign: 'center', marginTop: theme.spacing[8] }}>
            <Button href="/propostas" size="lg">
              Ver todas as propostas
            </Button>
          </div>
        </Container>
      </Section>

      {/* Upcoming Events Section */}
      <Section>
        <Container>
          <SectionHeader>
            <Typography variant="h2" align="center" margin={false}>
              Próximos eventos
            </Typography>
            <Typography variant="body1" color="secondary" align="center">
              Junte-se a nós e participe na construção do futuro de Lisboa
            </Typography>
          </SectionHeader>

          <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={6}>
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventCard 
                key={event._id} 
                event={event} 
                featured={event.featured}
              />
            ))}
          </Grid>

          <div style={{ textAlign: 'center', marginTop: theme.spacing[8] }}>
            <Button href="/eventos" variant="secondary" size="lg">
              Ver todos os eventos
            </Button>
          </div>
        </Container>
      </Section>

      {/* Recent News Section */}
      <Section>
        <Container>
          <SectionHeader>
            <Typography variant="h2" align="center" margin={false}>
              Últimas notícias
            </Typography>
            <Typography variant="body1" color="secondary" align="center">
              Fique a par das últimas novidades da nossa campanha
            </Typography>
          </SectionHeader>

          <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={6}>
            {recentPosts.slice(0, 3).map((post) => (
              <PostCard 
                key={post._id} 
                post={post}
              />
            ))}
          </Grid>

          <div style={{ textAlign: 'center', marginTop: theme.spacing[8] }}>
            <Button href="/noticias" variant="outline" size="lg">
              Ver todas as notícias
            </Button>
          </div>
        </Container>
      </Section>

      {/* Call to Action Section */}
      <CTASection>
        <Container>
          <Typography variant="h2" color="white" align="center">
            Juntos podemos fazer a diferença
          </Typography>
          <Typography variant="body1" color="white" align="center" opacity={0.9}>
            A sua participação é fundamental para construirmos uma Lisboa mais justa, 
            sustentável e democrática. Descubra como pode apoiar a nossa campanha.
          </Typography>
          <CTAButtons>
            <Button variant="primary" size="lg" href="/apoiar">
              Como apoiar
            </Button>
            <Button variant="secondary" size="lg" href="/contacto">
              Entrar em contacto
            </Button>
          </CTAButtons>
        </Container>
      </CTASection>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    // Get build-time campaign configuration
    const { campaign, navigation } = await getBuildConfiguration()

    // Fetch campaign-specific content using campaign utilities  
    const { getCampaignProposals, getCampaignEvents, getCampaignNews } = await import('@/lib/campaignUtils')
    
    const [proposalsData, eventsData, postsData] = await Promise.all([
      getCampaignProposals(campaign._id, 6),
      getCampaignEvents(campaign._id, 3), 
      getCampaignNews(campaign._id, 3)
    ])

    return {
      props: {
        campaign,
        navigation,
        featuredProposals: proposalsData || [],
        upcomingEvents: eventsData || [],
        recentPosts: postsData || [],
      },
      revalidate: 60, // Revalidate every minute
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      notFound: true
    }
  }
}

export default HomePage
