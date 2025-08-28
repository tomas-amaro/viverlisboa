import { GetStaticProps } from 'next'
import { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Container, Grid, Typography, Button } from '@/components/ui'
import { HeroSection, ProposalCard, EventCard, PostCard } from '@/components/content'
import { Campaign, Proposal, Event, Post } from '@/types/sanity'
import { client } from '@/lib/sanity'
import { getBuildConfig } from '@/lib/buildConfig'

interface HomePageProps {
  campaign: Campaign
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

const StatsSection = styled(Section)`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary.blue} 0%,
    ${theme.colors.primary.teal} 50%,
    ${theme.colors.primary.carmin} 100%
  );
  color: ${theme.colors.text.white};
  text-align: center;
`

const StatsGrid = styled(Grid)`
  max-width: 800px;
  margin: 0 auto;
`

const StatCard = styled.div`
  text-align: center;
  
  h3 {
    font-size: ${theme.fontSizes['4xl']};
    font-weight: ${theme.fontWeights.black};
    margin-bottom: ${theme.spacing[2]};
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['3xl']};
    }
  }
  
  p {
    font-size: ${theme.fontSizes.lg};
    opacity: 0.9;
    margin: 0;
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
    <>
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

      {/* Stats Section */}
      <StatsSection>
        <Container>
          <SectionHeader>
            <Typography variant="h2" color="white" align="center">
              A nossa força em números
            </Typography>
          </SectionHeader>
          
          <StatsGrid columns={{ sm: 2, lg: 4 }} gap={8}>
            <StatCard>
              <h3>4</h3>
              <p>Partidos Unidos</p>
            </StatCard>
            <StatCard>
              <h3>50+</h3>
              <p>Propostas Concretas</p>
            </StatCard>
            <StatCard>
              <h3>100+</h3>
              <p>Candidatos</p>
            </StatCard>
            <StatCard>
              <h3>24</h3>
              <p>Freguesias</p>
            </StatCard>
          </StatsGrid>
        </Container>
      </StatsSection>

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
            <Button variant="outline" size="lg" href="/apoiar">
              Como apoiar
            </Button>
            <Button variant="secondary" size="lg" href="/contacto">
              Entrar em contacto
            </Button>
          </CTAButtons>
        </Container>
      </CTASection>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    // Get build-time campaign configuration
    const buildConfig = await getBuildConfig()
    const campaignDomain = buildConfig.campaign.domain
    
    // Create campaign object from build config
    const campaign: Campaign = {
      _id: `campaign-${buildConfig.campaign.slug}`,
      _type: 'campaign',
      title: buildConfig.campaign.title,
      slug: { current: buildConfig.campaign.slug },
      description: buildConfig.campaign.description,
      domain: buildConfig.campaign.domain,
      location: buildConfig.campaign.location,
      mainColor: buildConfig.campaign.mainColor,
      secondaryColor: buildConfig.campaign.secondaryColor,
      socialMedia: buildConfig.campaign.socialMedia,
    }

    // Fetch campaign-specific data from Sanity
    const [campaignData, proposalsData, eventsData, postsData] = await Promise.all([
      // Get full campaign data from Sanity (for logo, heroImage, etc.)
      client.fetch(
        `*[_type == "campaign" && domain == $domain][0]{
          _id,
          _type,
          title,
          slug,
          description,
          domain,
          location,
          mainColor,
          secondaryColor,
          logo{
            _type,
            asset,
            alt
          },
          heroImage{
            _type,
            asset,
            alt
          },
          socialMedia
        }`,
        { domain: campaignDomain }
      ),
      
      // Get featured proposals for this campaign
      client.fetch(
        `*[_type == "proposal" && campaign->domain == $domain && featured == true] | order(priority desc, _createdAt desc)[0...6]{
          _id,
          _type,
          title,
          slug,
          campaign,
          category,
          summary,
          content,
          priority,
          featured,
          tags,
          featuredImage{
            _type,
            asset,
            alt
          }
        }`,
        { domain: campaignDomain }
      ),
      
      // Get upcoming events for this campaign
      client.fetch(
        `*[_type == "event" && campaign->domain == $domain && date >= now()] | order(date asc)[0...3]{
          _id,
          _type,
          title,
          slug,
          campaign,
          date,
          time,
          location,
          eventType,
          featured,
          featuredImage{
            _type,
            asset,
            alt
          }
        }`,
        { domain: campaignDomain }
      ),
      
      // Get recent posts for this campaign
      client.fetch(
        `*[_type == "post" && campaign->domain == $domain] | order(publishedAt desc)[0...3]{
          _id,
          _type,
          title,
          slug,
          campaign,
          publishedAt,
          excerpt,
          content,
          categories,
          featuredImage{
            _type,
            asset,
            alt
          }
        }`,
        { domain: campaignDomain }
      ),
    ])

    // Merge Sanity data with build config (Sanity takes precedence for images, etc.)
    const finalCampaign = campaignData ? { ...campaign, ...campaignData } : campaign

    return {
      props: {
        campaign: finalCampaign,
        featuredProposals: proposalsData || [],
        upcomingEvents: eventsData || [],
        recentPosts: postsData || [],
      },
      // Static generation - no revalidation needed since builds are domain-specific
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    
    // Fallback to build config data
    const buildConfig = await getBuildConfig()
    const fallbackCampaign: Campaign = {
      _id: `campaign-${buildConfig.campaign.slug}`,
      _type: 'campaign',
      title: buildConfig.campaign.title,
      slug: { current: buildConfig.campaign.slug },
      description: buildConfig.campaign.description,
      domain: buildConfig.campaign.domain,
      location: buildConfig.campaign.location,
      mainColor: buildConfig.campaign.mainColor,
      secondaryColor: buildConfig.campaign.secondaryColor,
      socialMedia: buildConfig.campaign.socialMedia,
    }
    
    return {
      props: {
        campaign: fallbackCampaign,
        featuredProposals: [],
        upcomingEvents: [],
        recentPosts: [],
      },
    }
  }
}

export default HomePage
