import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { theme } from '@/styles/theme'
import { Header } from './Header'
import { Footer } from './Footer'
import { Campaign } from '@/types/sanity'

interface LayoutProps {
  children: ReactNode
  campaign: Campaign
  navigation?: Array<{
    href: string
    label: string
    count?: number
  }>
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
  max-width: 100dvw;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  display: flex;
  flex-direction: column;
  
  /* Handle safe areas on mobile devices */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`

const MainContent = styled.main`
  flex: 1;
  padding-top: 60px; /* Height of fixed header */
  position: relative;
  
  /* Mobile adjustments */
  @media (max-width: ${theme.breakpoints.md}) {
    padding-top: 56px; /* Smaller header height on mobile */
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding-top: 52px; /* Even smaller on small mobile */
  }
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
  font-size: 0.875rem;
  
  &:focus {
    top: 6px;
  }
  
  /* Mobile improvements */
  @media (max-width: ${theme.breakpoints.md}) {
    left: ${theme.spacing[2]};
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    font-size: 1rem;
    min-height: 44px; /* Minimum touch target size */
    display: flex;
    align-items: center;
    
    &:focus {
      top: ${theme.spacing[2]};
    }
  }
`

const BackToTop = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: ${theme.spacing[6]};
  right: ${theme.spacing[6]};
  width: 52px;
  height: 52px;
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
  
  &:active {
    transform: ${({ $visible }) => 
      $visible ? 'translateY(0) scale(0.95)' : 'translateY(100%)'};
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.primary.teal};
    outline-offset: 2px;
  }
  
  svg {
    width: 22px;
    height: 22px;
  }
  
  /* Tablet adjustments */
  @media (max-width: ${theme.breakpoints.lg}) {
    bottom: ${theme.spacing[5]};
    right: ${theme.spacing[5]};
    width: 48px;
    height: 48px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  /* Mobile adjustments */
  @media (max-width: ${theme.breakpoints.md}) {
    bottom: ${theme.spacing[4]};
    right: ${theme.spacing[4]};
    width: 48px;
    height: 48px;
    box-shadow: ${theme.shadows.xl};
    
    /* Ensure minimum touch target size */
    min-width: 44px;
    min-height: 44px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  /* Small mobile adjustments */
  @media (max-width: ${theme.breakpoints.sm}) {
    bottom: calc(${theme.spacing[3]} + env(safe-area-inset-bottom));
    right: ${theme.spacing[3]};
    width: 44px;
    height: 44px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  /* Handle landscape orientation on mobile */
  @media (max-width: ${theme.breakpoints.md}) and (orientation: landscape) {
    bottom: ${theme.spacing[2]};
    right: ${theme.spacing[3]};
  }
`

export const Layout: React.FC<LayoutProps> = ({
  children,
  campaign,
  navigation,
  seo,
  className,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button earlier on mobile for better UX
      const threshold = window.innerWidth <= 768 ? 200 : 300
      setShowBackToTop(window.scrollY > threshold)
    }

    // Throttle scroll events for better performance on mobile
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
        
        {/* Mobile-specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={campaign.title} />
        <meta name="mobile-web-app-capable" content="yes" />
        
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
        
        <Header campaign={campaign} navigation={navigation} />
        
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
