import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { Layout } from '../../components/layout'
import { Container, Typography, Button } from '../../components/ui'
import { ContentRenderer } from '../../components/content'
import { getBuildConfiguration, getCampaignNews, CampaignWithContent } from '../../lib/campaignUtils'
import { client } from '../../lib/sanity'
import { ContentBlock } from '../../types/sanity'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  content: ContentBlock[]
  publishedAt: string
  featuredImage?: { asset: { url: string }; alt?: string }
  categories?: string[]
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: { asset: { url: string }; alt?: string }
  }
}

interface PostPageProps {
  post: Post
  campaign: CampaignWithContent
}

export default function PostPage({ post, campaign }: PostPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const categoryColors = {
    propostas: campaign.mainColor || '#48B9CA',
    eventos: campaign.secondaryColor || '#FF394C',
    comunicados: '#9333EA',
    imprensa: '#059669',
    campanha: '#DC2626'
  }

  return (
    <>
      <Head>
        <title>{post.seo?.title || post.title} | {campaign.title}</title>
        <meta 
          name="description" 
          content={post.seo?.description || post.excerpt || ''} 
        />
        {post.seo?.keywords && (
          <meta name="keywords" content={post.seo.keywords.join(', ')} />
        )}
      </Head>
      <Layout campaign={campaign}>
        <Container>
          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '2rem' }}>
              <Typography variant="body2" color="secondary">
                <Link href="/noticias" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {campaign.navigationLabels?.news || 'Notícias'}
                </Link>
                {' / '}
                <span>{post.title}</span>
              </Typography>
            </div>

            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              {post.categories && post.categories.length > 0 && (
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {post.categories.map((category, index) => (
                    <span 
                      key={index}
                      style={{
                        background: categoryColors[category as keyof typeof categoryColors] || campaign.mainColor || '#48B9CA',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'capitalize'
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              <Typography variant="h1" margin={true}>
                {post.title}
              </Typography>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #eee'
              }}>
                <Typography variant="body2" color="secondary">
                  Publicado em {formatDate(post.publishedAt)}
                </Typography>
              </div>

              {post.excerpt && (
                <Typography 
                  variant="h3" 
                  color="secondary" 
                  margin={true}
                >
                  {post.excerpt}
                </Typography>
              )}
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div style={{ marginBottom: '3rem' }}>
                <img 
                  src={post.featuredImage.asset.url}
                  alt={post.featuredImage.alt || post.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px'
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div style={{ marginBottom: '3rem' }}>
              <ContentRenderer content={post.content} campaign={campaign} />
            </div>

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
                href="/noticias"
              >
                ← Todas as {campaign.navigationLabels?.news || 'Notícias'}
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
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { campaign, shouldGenerate } = await getBuildConfiguration()

    // Only generate paths if news are enabled and exist
    if (!shouldGenerate.news) {
      return {
        paths: [],
        fallback: false
      }
    }

    const posts = await getCampaignNews(campaign._id, 100)
    
    const paths = posts.map((post: { slug: { current: string } }) => ({
      params: { slug: post.slug.current }
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

    const post = await client.fetch(`
      *[_type == "post" && slug.current == $slug && references($campaignId)][0]{
        _id,
        title,
        slug,
        excerpt,
        content,
        publishedAt,
        featuredImage{
          asset->{
            _id,
            url
          },
          alt
        },
        categories,
        seo
      }
    `, { slug, campaignId: campaign._id })

    if (!post) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        post,
        campaign
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
