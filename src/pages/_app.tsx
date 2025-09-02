import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { Layout } from '@/components/layout'
import { Campaign } from '@/types/sanity'
import { client } from '@/lib/sanity'
import { getBuildConfigSync, isDevelopment, getDevelopmentCampaign } from '@/lib/buildConfig'

interface CustomAppProps extends AppProps {
  campaign?: Campaign
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeCampaign = async () => {
      try {
        // In production, use build-time configuration
        if (!isDevelopment()) {
          const buildConfig = getBuildConfigSync()
          const campaignData: Campaign = {
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
          setCampaign(campaignData)
          setLoading(false)
          return
        }

        // In development, try to fetch from Sanity or use development config
        const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
        
        try {
          // Try to fetch campaign data from Sanity in development
          const query = `*[_type == "campaign" && domain == $domain][0]{
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
          }`

          const campaignData = await client.fetch(query, { domain: hostname })
          
          if (campaignData) {
            setCampaign(campaignData)
          } else {
            // Fallback to development configuration
            const devConfig = getDevelopmentCampaign(hostname)
            const fallbackCampaign: Campaign = {
              _id: `campaign-${devConfig.slug}`,
              _type: 'campaign',
              title: devConfig.title,
              slug: { current: devConfig.slug },
              description: devConfig.description,
              domain: devConfig.domain,
              location: devConfig.location,
              mainColor: devConfig.mainColor,
              secondaryColor: devConfig.secondaryColor,
              socialMedia: devConfig.socialMedia,
            }
            setCampaign(fallbackCampaign)
          }
        } catch (sanityError) {
          console.warn('Could not fetch from Sanity in development, using local config:', sanityError)
          // Use development configuration as fallback
          const devConfig = getDevelopmentCampaign(hostname)
          const fallbackCampaign: Campaign = {
            _id: `campaign-${devConfig.slug}`,
            _type: 'campaign',
            title: devConfig.title,
            slug: { current: devConfig.slug },
            description: devConfig.description,
            domain: devConfig.domain,
            location: devConfig.location,
            mainColor: devConfig.mainColor,
            secondaryColor: devConfig.secondaryColor,
            socialMedia: devConfig.socialMedia,
          }
          setCampaign(fallbackCampaign)
        }
      } catch (error) {
        console.error('Error initializing campaign:', error)
        // Final fallback
        const devConfig = getDevelopmentCampaign()
        const fallbackCampaign: Campaign = {
          _id: `campaign-${devConfig.slug}`,
          _type: 'campaign',
          title: devConfig.title,
          slug: { current: devConfig.slug },
          description: devConfig.description,
          domain: devConfig.domain,
          location: devConfig.location,
          mainColor: devConfig.mainColor,
          secondaryColor: devConfig.secondaryColor,
          socialMedia: devConfig.socialMedia,
        }
        setCampaign(fallbackCampaign)
      } finally {
        setLoading(false)
      }
    }

    initializeCampaign()
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #48B9CA 0%, #23757E 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p>A carregar...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  if (!campaign) {
    return <div>Error loading campaign data</div>
  }

  return (
    <Layout campaign={campaign} navigation={pageProps.navigation}>
      <Component {...pageProps} campaign={campaign} />
    </Layout>
  )
}

export default MyApp
