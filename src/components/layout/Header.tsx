import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { theme } from '@/styles/theme'
import { Container, CampaignName, Typography } from '@/components/ui'
import { Campaign } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'

interface HeaderProps {
  campaign: Campaign
  navigation?: Array<{
    href: string
    label: string
    count?: number
  }>
}

interface NavigationItem {
  label: string
  href: string
  count?: number
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

const MobileMenuButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }
  
  /* Main line (middle line) */
  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: ${theme.colors.text.primary};
    border-radius: 2px;
    transition: all ${theme.transitions.fast};
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg)' : 'translateY(0)'};
  }
  
  /* Top and bottom lines */
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: ${theme.colors.text.primary};
    border-radius: 2px;
    transition: all ${theme.transitions.fast};
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg)' : 'translateY(0)'};
    box-shadow: ${({ $isOpen }) => 
      $isOpen 
        ? 'none' 
        : `0 -8px 0 ${theme.colors.text.primary}, 0 8px 0 ${theme.colors.text.primary}`
    };
  }
`



const TaglineContainer = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[4]} 0;
  text-align: center;
  border-top: 1px solid ${theme.colors.gray[200]};
  margin-top: ${theme.spacing[4]};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[3]} ${theme.spacing[3]} 0;
  }
`

// Default navigation (fallback)
const defaultNavigationItems: NavigationItem[] = [
  { label: 'Início', href: '/' },
]

export const Header: React.FC<HeaderProps> = ({ campaign, navigation = defaultNavigationItems }) => {
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
          {navigation.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
              {item.count && item.count > 0 && (
                <span style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.75rem',
                  background: 'rgba(72, 185, 202, 0.2)',
                  color: '#48B9CA',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600
                }}>
                  {item.count}
                </span>
              )}
            </NavLink>
          ))}
          
          {/* Tagline for mobile menu */}
          {campaign.headerContent?.tagline && (
            <TaglineContainer>
              <Typography variant="body2" color="secondary">
                {campaign.headerContent.tagline}
              </Typography>
            </TaglineContainer>
          )}
        </Navigation>

        <MobileMenuButton 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          $isOpen={isMenuOpen}
        />
      </HeaderContainer>
    </StyledHeader>
  )
}

export default Header
