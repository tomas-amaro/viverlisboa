import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { Layout } from '@/components/layout'
import { Campaign } from '@/types/sanity'
import { client } from '@/lib/sanity'

// Mock campaign data - in real implementation would be fetched based on domain
const mockCampaign: Campaign = {
  _id: '1',
  _type: 'campaign',
  title: 'Viver Lisboa',
  slug: { current: 'viver-lisboa' },
  description: 'Coligação de esquerda para uma Lisboa mais justa, sustentável e democrática.',
  domain: 'viverlisboa.pt',
  location: 'Lisboa',
  mainColor: '#48B9CA',
  secondaryColor: '#FF394C',
  logo: {
    _type: 'image',
    asset: {
      _ref: 'image-logo',
      _type: 'reference',
    },
    alt: 'Logo Viver Lisboa',
  },
  socialMedia: {
    facebook: 'https://facebook.com/viverlisboa',
    instagram: 'https://instagram.com/viverlisboa',
    twitter: 'https://twitter.com/viverlisboa',
  },
}

interface CustomAppProps extends AppProps {
  campaign?: Campaign
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [campaign, setCampaign] = useState<Campaign>(mockCampaign)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        // In real implementation, determine campaign based on domain
        const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
        
        // For development, use mock data
        if (hostname.includes('localhost') || hostname.includes('vercel.app')) {
          setCampaign(mockCampaign)
          setLoading(false)
          return
        }

        // Fetch campaign data from Sanity based on domain
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
          // Fallback to default campaign if no specific campaign found
          setCampaign(mockCampaign)
        }
      } catch (error) {
        console.error('Error fetching campaign data:', error)
        setCampaign(mockCampaign)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaignData()
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

  return (
    <Layout campaign={campaign}>
      <Component {...pageProps} campaign={campaign} />
    </Layout>
  )
}

export default MyApp
