import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { PostCard } from '../../components/content'
import { Container, Grid, Typography, Button } from '../../components/ui'
import { getBuildConfiguration, CampaignWithContent } from '../../lib/campaignUtils'
import { Post } from '../../types/sanity'

interface NewsPageProps {
  posts: Post[]
  campaign: CampaignWithContent
  navigation: Array<{
    href: string
    label: string
    count?: number
  }>
  navigationLabel: string
}

export default function NewsPage({ posts, campaign, navigationLabel }: NewsPageProps) {
  return (
    <>
      <Head>
        <title>{navigationLabel} | {campaign.title}</title>
        <meta 
          name="description" 
          content={`Acompanhe as ${navigationLabel.toLowerCase()} da campanha ${campaign.title}`}
        />
      </Head>
        <Container>
          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <Typography variant="h1" margin={true}>
                {navigationLabel}
              </Typography>
              <Typography variant="body1" color="secondary">
                Mantenha-se informado sobre as últimas atualizações da nossa campanha
              </Typography>
            </div>

            {posts.length > 0 ? (
              <Grid columns={3} gap={2}>
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                  />
                ))}
              </Grid>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <Typography variant="h3" margin={true}>
                  Em breve
                </Typography>
                <Typography variant="body1" color="secondary" margin={true}>
                  As nossas notícias e atualizações serão publicadas em breve.
                </Typography>
                <Button href="/">Voltar ao Início</Button>
              </div>
            )}
          </div>
        </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<NewsPageProps> = async () => {
  try {
    const { campaign, navigation, shouldGenerate } = await getBuildConfiguration()

    // Only generate this page if news are enabled and exist
    if (!shouldGenerate.news) {
      return {
        notFound: true
      }
    }

    const { getCampaignNews } = await import('../../lib/campaignUtils')
    const posts = await getCampaignNews(campaign._id, 50)

    return {
      props: {
        posts,
        campaign,
        navigation,
        navigationLabel: campaign.navigationLabels?.news || 'Notícias'
      },

    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}
