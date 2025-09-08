import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Typography } from '../components/ui'
import { PageBuilder } from '../components/content/blocks'
import { getBuildConfiguration, CampaignWithContent } from '../lib/campaignUtils'
import { client } from '../lib/sanity'
import { ContentBlock } from '../components/content/blocks/types'

interface CustomPage {
  _id: string
  title: string
  slug: { current: string }
  content: ContentBlock[]
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
  }
}

interface CustomPageProps {
  page: CustomPage
  campaign: CampaignWithContent
  navigation: Array<{
    href: string
    label: string
    count?: number
  }>
}

export default function CustomPagePage({ page, campaign }: CustomPageProps) {
  // Check if page has content blocks or needs fallback
  const hasBlocks = page.content && Array.isArray(page.content) && page.content.length > 0
  
  return (
    <>
      <Head>
        <title>{page.seo?.title || page.title} | {campaign.title}</title>
        <meta 
          name="description" 
          content={page.seo?.description || `${page.title} - ${campaign.title}`} 
        />
        {page.seo?.keywords && (
          <meta name="keywords" content={page.seo.keywords.join(', ')} />
        )}
        {page.seo?.ogImage && (
          <>
            <meta property="og:image" content={page.seo.ogImage.asset.url} />
            <meta property="og:image:alt" content={page.seo.ogImage.alt || page.title} />
          </>
        )}
      </Head>
      
      {hasBlocks ? (
        // Render using PageBuilder for modular content
        <>
          <PageBuilder blocks={page.content} campaign={campaign} />
          
          {/* Navigation Footer */}
              <Link 
                href="/"
                style={{
                  textDecoration: 'none',
                  color: campaign.mainColor || '#48B9CA',
                  fontWeight: 500
                }}
              >
                ← Voltar ao Início
              </Link>
        </>
      ) : (
        // Fallback for pages without blocks (legacy support)
        <Container>
          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <Typography variant="h1" margin={true}>
                {page.title}
              </Typography>
            </div>

            {/* Empty state */}
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              color: '#666',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              marginBottom: '3rem'
            }}>
              <Typography variant="h3" margin={true}>
                Página em Construção
              </Typography>
              <Typography variant="body1">
                Esta página ainda não possui conteúdo configurado. 
                Use o editor do Sanity para adicionar blocos de conteúdo.
              </Typography>
            </div>

            {/* Navigation */}
            <div style={{ 
              borderTop: '1px solid #eee',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Link 
                href="/"
                style={{
                  textDecoration: 'none',
                  color: campaign.mainColor || '#48B9CA',
                  fontWeight: 500
                }}
              >
                ← Voltar ao Início
              </Link>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { campaign } = await getBuildConfiguration()

    // Only generate paths for custom pages that exist and are meant for navigation
    const customPages = await client.fetch(`
      *[_type == "page" && references($campaignId)]{
        slug
      }
    `, { campaignId: campaign._id })
    
    // Filter out reserved static page paths to avoid conflicts
    const reservedPaths = ['propostas', 'eventos', 'noticias', 'studio', '404']
    
    const paths = customPages
      .filter((page: { slug: { current: string } }) => 
        !reservedPaths.includes(page.slug.current)
      )
      .map((page: { slug: { current: string } }) => ({
        params: { slug: page.slug.current }
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
    const { campaign, navigation } = await getBuildConfiguration()
    const slug = params?.slug as string

    const page = await client.fetch(`
      *[_type == "page" && slug.current == $slug && references($campaignId)][0]{
        _id,
        title,
        slug,
        content[]{
          ...,
          _type == "heroBlock" => {
            ...,
            backgroundImage{
              asset->{
                _id,
                url
              },
              alt
            }
          },
          _type == "textBlock" => {
            ...,
            content[]{
              ...,
              _type == "image" => {
                ...,
                asset->{
                  _id,
                  url
                }
              }
            }
          },
          _type == "imageBlock" => {
            ...,
            image{
              asset->{
                _id,
                url
              },
              alt,
              caption
            }
          },
          _type == "galleryBlock" => {
            ...,
            images[]{
              asset->{
                _id,
                url
              },
              alt,
              caption
            }
          },
          _type == "videoBlock" => {
            ...,
            thumbnail{
              asset->{
                _id,
                url
              },
              alt
            }
          },
          _type == "proposalsShowcaseBlock" => {
            ...,
            proposals[]->{
              _id,
              title,
              slug,
              summary,
              category,
              priority,
              featured,
              tags,
              icon{
                asset->{
                  _id,
                  url
                },
                alt
              }
            }
          }
        },
        seo{
          ...,
          ogImage{
            asset->{
              _id,
              url
            },
            alt
          }
        }
      }
    `, { slug, campaignId: campaign._id })

    if (!page) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        page,
        campaign,
        navigation
      },

    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}