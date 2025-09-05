import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Typography, PortableTextRenderer } from '../components/ui'
import { getBuildConfiguration, CampaignWithContent } from '../lib/campaignUtils'
import { client } from '../lib/sanity'
import { PortableTextBlock } from '@portabletext/types'

interface CustomPage {
  _id: string
  title: string
  slug: { current: string }
  content: PortableTextBlock[]
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
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
      </Head>
        <Container>
          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <Typography variant="h1" margin={true}>
                {page.title}
              </Typography>
            </div>

            {/* Content */}
            <div style={{ marginBottom: '3rem' }}>
              <PortableTextRenderer content={page.content} campaign={campaign} />
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
          _type == "image" => {
            ...,
            asset->{
              _id,
              _ref,
              _type,
              url
            }
          }
        },
        seo
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