import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Layout } from '@/components/layout'
import { ContentRenderer } from '@/components/content/ContentRenderer'
import { Page, Campaign, Proposal, Event } from '@/types/sanity'
import { client, urlFor } from '@/lib/sanity'
import { getBuildConfig, isDevelopment, getDevelopmentCampaign } from '@/lib/buildConfig'

interface DynamicPageProps {
  page: Page
  campaign: Campaign
  proposals: Proposal[]
  events: Event[]
}

const DynamicPage: React.FC<DynamicPageProps> = ({ 
  page, 
  campaign, 
  proposals, 
  events 
}) => {
  // Generate SEO meta tags
  const seoTitle = page.seo?.title || page.title
  const seoDescription = page.seo?.description || campaign.description || `${page.title} - ${campaign.title}`
  const seoKeywords = page.seo?.keywords?.join(', ') || `${campaign.location}, política, eleições, ${campaign.title.toLowerCase()}`
  const canonicalUrl = `https://${campaign.domain}/${page.slug.current}`
  
  // OpenGraph image
  const ogImageUrl = page.seo?.ogImage 
    ? urlFor(page.seo.ogImage).width(1200).height(630).quality(90).url()
    : campaign.heroImage
    ? urlFor(campaign.heroImage).width(1200).height(630).quality(90).url()
    : `https://${campaign.domain}/og-default.jpg`

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>{seoTitle} | {campaign.title}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={campaign.title} />
        <meta property="og:locale" content="pt_PT" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        
        {/* Additional meta tags */}
        <meta name="author" content={campaign.title} />
        <meta name="robots" content="index, follow" />
        
        {/* Favicon and theme colors based on campaign */}
        <meta name="theme-color" content={campaign.mainColor} />
        <meta name="msapplication-TileColor" content={campaign.mainColor} />
        
        {/* Structured Data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": seoTitle,
              "description": seoDescription,
              "url": canonicalUrl,
              "inLanguage": "pt-PT",
              "isPartOf": {
                "@type": "WebSite",
                "name": campaign.title,
                "url": `https://${campaign.domain}`,
                "description": campaign.description
              },
              "about": {
                "@type": "Organization",
                "name": campaign.title,
                "description": campaign.description,
                "url": `https://${campaign.domain}`,
                "sameAs": [
                  campaign.socialMedia?.facebook,
                  campaign.socialMedia?.instagram,
                  campaign.socialMedia?.twitter
                ].filter(Boolean)
              }
            })
          }}
        />
      </Head>
      
      <Layout campaign={campaign}>
        <main>
          <ContentRenderer 
            content={page.content}
            campaign={campaign}
            proposals={proposals}
            events={events}
          />
        </main>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // In production builds, only generate paths for the current campaign domain
  // In development, generate paths for all domains for flexibility
  
  if (!isDevelopment()) {
    // Production: Generate paths for the current campaign domain only
    const buildConfig = await getBuildConfig()
    const campaignDomain = buildConfig.campaign.domain
    
    try {
      const pages = await client.fetch(
        `*[_type == "page" && campaign->domain == $domain]{ slug }`,
        { domain: campaignDomain }
      )
      
      const paths = pages.map((page: { slug: { current: string } }) => ({
        params: { slug: page.slug.current }
      }))
      
      return {
        paths,
        fallback: false, // Static generation only
      }
    } catch (error) {
      console.error('Error fetching page paths:', error)
      return {
        paths: [],
        fallback: false,
      }
    }
  } else {
    // Development: Generate paths for all campaigns for testing
    try {
      const pages = await client.fetch(
        `*[_type == "page"]{ slug }`
      )
      
      const paths = pages.map((page: { slug: { current: string } }) => ({
        params: { slug: page.slug.current }
      }))
      
      return {
        paths,
        fallback: 'blocking', // Allow ISR in development
      }
    } catch (error) {
      console.error('Error fetching page paths in development:', error)
      return {
        paths: [],
        fallback: 'blocking',
      }
    }
  }
}

export const getStaticProps: GetStaticProps<DynamicPageProps> = async ({ params }) => {
  const slug = params?.slug as string
  
  if (!slug) {
    return { notFound: true }
  }
  
  try {
    // Determine campaign domain
    let campaignDomain: string
    
    if (!isDevelopment()) {
      // Production: Use build-time configuration
      const buildConfig = await getBuildConfig()
      campaignDomain = buildConfig.campaign.domain
    } else {
      // Development: Try to get from environment or default
      const devConfig = getDevelopmentCampaign()
      campaignDomain = devConfig.domain
    }
    
    // Fetch the page data
    const page = await client.fetch(
      `*[_type == "page" && slug.current == $slug && campaign->domain == $domain][0]{
        _id,
        _type,
        title,
        slug,
        campaign,
        seo{
          title,
          description,
          keywords,
          ogImage{
            _type,
            asset,
            alt
          }
        },
        content[]{
          ...,
          _type == "proposals" => {
            ...,
            proposals[]->{
              _id,
              _type,
              title,
              slug,
              category,
              summary,
              priority,
              featured,
              tags,
              featuredImage{
                _type,
                asset,
                alt
              }
            }
          },
          _type == "events" => {
            ...,
            events[]->{
              _id,
              _type,
              title,
              slug,
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
            }
          }
        }
      }`,
      { slug, domain: campaignDomain }
    )
    
    if (!page) {
      return { notFound: true }
    }
    
    // Get campaign data
    const [campaignData, allProposals, allEvents] = await Promise.all([
      // Get full campaign data
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
      
      // Get all proposals for this campaign (for proposals blocks)
      client.fetch(
        `*[_type == "proposal" && campaign->domain == $domain]{
          _id,
          _type,
          title,
          slug,
          category,
          summary,
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
      
      // Get all events for this campaign (for events blocks)
      client.fetch(
        `*[_type == "event" && campaign->domain == $domain]{
          _id,
          _type,
          title,
          slug,
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
      )
    ])
    
    // Fallback campaign data from build config if Sanity data unavailable
    let finalCampaign = campaignData
    if (!campaignData) {
      if (!isDevelopment()) {
        const buildConfig = await getBuildConfig()
        finalCampaign = {
          _id: `campaign-${buildConfig.campaign.slug}`,
          _type: 'campaign' as const,
          title: buildConfig.campaign.title,
          slug: { current: buildConfig.campaign.slug },
          description: buildConfig.campaign.description,
          domain: buildConfig.campaign.domain,
          location: buildConfig.campaign.location,
          mainColor: buildConfig.campaign.mainColor,
          secondaryColor: buildConfig.campaign.secondaryColor,
          socialMedia: buildConfig.campaign.socialMedia,
        }
      } else {
        const devConfig = getDevelopmentCampaign()
        finalCampaign = {
          _id: `campaign-${devConfig.slug}`,
          _type: 'campaign' as const,
          title: devConfig.title,
          slug: { current: devConfig.slug },
          description: devConfig.description,
          domain: devConfig.domain,
          location: devConfig.location,
          mainColor: devConfig.mainColor,
          secondaryColor: devConfig.secondaryColor,
          socialMedia: devConfig.socialMedia,
        }
      }
    }
    
    return {
      props: {
        page,
        campaign: finalCampaign,
        proposals: allProposals || [],
        events: allEvents || [],
      },
      // No revalidate in production builds since they're static per domain
      ...(isDevelopment() && { revalidate: 60 })
    }
    
  } catch (error) {
    console.error('Error fetching page data:', error)
    return { notFound: true }
  }
}

export default DynamicPage
