import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { theme } from '@/styles/theme'
import Header from './Header'
import Footer from './Footer'
import { Campaign } from '@/types/sanity'

interface LayoutProps {
  children: ReactNode
  campaign: Campaign
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    canonical?: string
    noindex?: boolean
  }
  className?: string
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; /* Height of fixed header */
  position: relative;
`

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  background: ${theme.colors.primary.blue};
  color: ${theme.colors.text.white};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  z-index: 100;
  transition: ${theme.transitions.fast};
  
  &:focus {
    top: 6px;
  }
`

const BackToTop = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: ${theme.spacing[6]};
  right: ${theme.spacing[6]};
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.full};
  background-color: ${theme.colors.primary.blue};
  color: ${theme.colors.text.white};
  border: none;
  cursor: pointer;
  z-index: 40;
  transition: all ${theme.transitions.base};
  box-shadow: ${theme.shadows.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(100%)')};
  
  &:hover {
    background-color: ${theme.colors.primary.teal};
    transform: ${({ $visible }) => 
      $visible ? 'translateY(-2px)' : 'translateY(100%)'};
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.primary.blue};
    outline-offset: 2px;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    bottom: ${theme.spacing[4]};
    right: ${theme.spacing[4]};
    width: 44px;
    height: 44px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`

export const Layout: React.FC<LayoutProps> = ({
  children,
  campaign,
  seo,
  className,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // SEO defaults
  const defaultTitle = `${campaign.title} - ${campaign.location} 2025`
  const defaultDescription = campaign.description || 
    `${campaign.title} - Coligação de esquerda para ${campaign.location}. Juntos por uma cidade mais justa, sustentável e democrática.`
  
  const pageTitle = seo?.title ? `${seo.title} | ${defaultTitle}` : defaultTitle
  const pageDescription = seo?.description || defaultDescription
  const pageKeywords = seo?.keywords?.join(', ') || 
    `${campaign.location}, política, eleições, PS, Livre, BE, PAN, coligação, esquerda, 2025`

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content={seo?.noindex ? 'noindex,nofollow' : 'index,follow'} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={campaign.title} />
        <meta property="og:locale" content="pt_PT" />
        {seo?.ogImage && <meta property="og:image" content={seo.ogImage} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {seo?.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Canonical URL */}
        {seo?.canonical && <link rel="canonical" href={seo.canonical} />}
        
        {/* Theme color based on campaign */}
        <meta name="theme-color" content={campaign.mainColor} />
        <meta name="msapplication-TileColor" content={campaign.mainColor} />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PoliticalParty",
              "name": campaign.title,
              "url": `https://${campaign.domain}`,
              "description": pageDescription,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": campaign.location,
                "addressCountry": "PT"
              },
              "sameAs": [
                campaign.socialMedia?.facebook,
                campaign.socialMedia?.instagram,
                campaign.socialMedia?.twitter,
              ].filter(Boolean),
            }),
          }}
        />
      </Head>
      
      <GlobalStyles />
      
      <LayoutContainer className={className}>
        <SkipLink href="#main-content" className="skip-link">
          Saltar para o conteúdo principal
        </SkipLink>
        
        <Header campaign={campaign} />
        
        <MainContent id="main-content" role="main">
          {children}
        </MainContent>
        
        <Footer campaign={campaign} />
        
        <BackToTop
          $visible={showBackToTop}
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </BackToTop>
      </LayoutContainer>
    </ThemeProvider>
  )
}

export default Layout
