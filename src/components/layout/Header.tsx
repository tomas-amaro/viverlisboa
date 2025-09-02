import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'
import { Container, CampaignName } from '@/components/ui'
import { Campaign } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'

interface HeaderProps {
  campaign: Campaign
}

interface NavigationItem {
  label: string
  href: string
}

const StyledHeader = styled.header<{ $translateY: number; $isScrolled: boolean }>`
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: transform 0.3s ease-in-out, background-color 0.2s ease;
  transform: translateY(${({ $translateY }) => $translateY}px);
  
  ${({ $isScrolled }) =>
    $isScrolled
      && css`
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: ${theme.shadows.sm};
        `}
`

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${theme.spacing[4]};
  padding-bottom: ${theme.spacing[4]};
  min-height: 80px;
`

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: ${theme.transitions.fast};
  
  &:hover {
    opacity: 0.9;
  }
`

const Logo = styled.div`
  position: relative;
  height: 48px;
  width: auto;
  align-content: center;
  img {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 40px;
  }
`

const Navigation = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[6]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background-color: ${theme.colors.background.primary};
    flex-direction: column;
    padding: ${theme.spacing[6]};
    box-shadow: ${theme.shadows.lg};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition: all ${theme.transitions.base};
    gap: ${theme.spacing[4]};
  }
`

const NavLink = styled(Link)`
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.primary};
  text-decoration: none;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transitions.fast};
  position: relative;
  
  &:hover {
    color: ${theme.colors.primary.blue};
    background-color: rgba(72, 185, 202, 0.1);
  }
  
  &.active {
    color: ${theme.colors.primary.blue};
    font-weight: ${theme.fontWeights.semibold};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background-color: ${theme.colors.primary.blue};
      border-radius: 2px;
    }
  }
`

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`

const MenuLine = styled.span<{ $isOpen: boolean; $lineNumber: number }>`
  display: block;
  width: 24px;
  height: 2px;
  background-color: ${theme.colors.text.primary};
  border-radius: 2px;
  transition: all ${theme.transitions.fast};
  transform-origin: center;
  
  &:not(:last-child) {
    margin-bottom: 4px;
  }
  
  ${({ $isOpen, $lineNumber }) =>
    $isOpen &&
    css`
      ${$lineNumber === 1 &&
      css`
        transform: rotate(45deg) translate(5px, 5px);
      `}
      
      ${$lineNumber === 2 &&
      css`
        opacity: 0;
      `}
      
      ${$lineNumber === 3 &&
      css`
        transform: rotate(-45deg) translate(7px, -6px);
      `}
    `}
`

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin-top: ${theme.spacing[4]};
  }
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.full};
  background-color: ${theme.colors.primary.blue};
  color: ${theme.colors.text.white};
  text-decoration: none;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background-color: ${theme.colors.primary.teal};
    transform: translateY(-1px);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`

const navigationItems: NavigationItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Propostas', href: '/propostas' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Contacto', href: '/contacto' },
]

export const Header: React.FC<HeaderProps> = ({ campaign }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [translateY, setTranslateY] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const headerHeight = 80 // Match min-height from HeaderContainer

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingUp = currentScrollY < lastScrollY
      
      // Set background/blur effects when scrolled past 40px
      setIsScrolled(currentScrollY > 40)
      
      // Handle translateY based on scroll direction and position
      if (currentScrollY <= 40) {
        // Always show header when near top
        setTranslateY(0)
      } else if (isScrollingUp) {
        // Show header when scrolling up
        setTranslateY(0)
      } else {
        // Hide header when scrolling down past 40px
        setTranslateY(-headerHeight)
      }
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <StyledHeader $translateY={translateY} $isScrolled={isScrolled}>
      <HeaderContainer>
        <LogoContainer href="/">
          <Logo>
            {campaign.logo && campaign.logo.asset ? (
              <Image
                src={urlFor(campaign.logo).width(200).height(96).url()}
                alt={campaign.logo.alt || `Logo ${campaign.title}`}
                width={200}
                height={96}
                priority
              />
            ) : (
              <CampaignName 
                mainTitle={campaign.title}
                variant="default"
                size="sm"
              />
            )}
          </Logo>
        </LogoContainer>

        <Navigation $isOpen={isMenuOpen}>
          {navigationItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          
          {campaign.socialMedia && (
            <SocialLinks>
              {campaign.socialMedia.facebook && (
                <SocialLink
                  href={campaign.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </SocialLink>
              )}
              
              {campaign.socialMedia.instagram && (
                <SocialLink
                  href={campaign.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </SocialLink>
              )}
              
              {campaign.socialMedia.twitter && (
                <SocialLink
                  href={campaign.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </SocialLink>
              )}
            </SocialLinks>
          )}
        </Navigation>

        <MobileMenuButton onClick={toggleMenu} aria-label="Toggle menu">
          <MenuLine $isOpen={isMenuOpen} $lineNumber={1} />
          <MenuLine $isOpen={isMenuOpen} $lineNumber={2} />
          <MenuLine $isOpen={isMenuOpen} $lineNumber={3} />
        </MobileMenuButton>
      </HeaderContainer>
    </StyledHeader>
  )
}

export default Header
