import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Campaign } from '@/types/sanity'

interface SocialLinksProps {
  socialMedia?: Campaign['socialMedia']
  variant?: 'header' | 'footer'
  className?: string
}

interface SocialLinkData {
  platform: string
  url: string
  iconPath: string
  ariaLabel: string
}

const SocialLinksContainer = styled.div<{ $variant: 'header' | 'footer' }>`
  display: flex;
  gap: ${({ $variant }) => $variant === 'header' ? theme.spacing[3] : theme.spacing[4]};
  
  ${({ $variant }) => $variant === 'footer' && `
    @media (max-width: ${theme.breakpoints.md}) {
      justify-content: center;
    }
  `}
  
  ${({ $variant }) => $variant === 'header' && `
    padding: ${theme.spacing[4]} ${theme.spacing[4]} 0;
    border-top: 1px solid ${theme.colors.gray[200]};
    margin-top: ${theme.spacing[4]};
    justify-content: center;
    
    @media (min-width: ${theme.breakpoints.md + 1}px) {
      display: none;
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
      gap: ${theme.spacing[2]};
      padding: ${theme.spacing[3]} ${theme.spacing[3]} 0;
    }
  `}
`

const SocialLinkStyled = styled(Link)<{ $variant: 'header' | 'footer' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: ${theme.transitions.fast};
  
  ${({ $variant }) => $variant === 'header' ? `
    width: 44px;
    height: 44px;
    border-radius: ${theme.borderRadius.md};
    
    &:hover,
    &:focus {
      background-color: ${theme.colors.gray[100]};
    }
    
    &:active {
      background-color: ${theme.colors.background.secondary};
      transform: scale(0.95);
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
      width: 40px;
      height: 40px;
    }
  ` : `
    width: 40px;
    height: 40px;
    border-radius: ${theme.borderRadius.full};
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`

const SocialIcon = styled(Image)<{ $variant: 'header' | 'footer' }>`
  ${({ $variant }) => $variant === 'header' ? `
    width: 20px;
    height: 20px;
  ` : `
    width: 20px;
    height: 20px;
  `}
`

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  socialMedia, 
  variant = 'footer',
  className 
}) => {
  if (!socialMedia) return null

  const socialPlatforms: SocialLinkData[] = [
    {
      platform: 'facebook',
      url: socialMedia.facebook || '',
      iconPath: '/assets/social-icons/facebook.svg',
      ariaLabel: 'Facebook'
    },
    {
      platform: 'instagram',
      url: socialMedia.instagram || '',
      iconPath: '/assets/social-icons/instagram.svg',
      ariaLabel: 'Instagram'
    },
    {
      platform: 'twitter',
      url: socialMedia.twitter || '',
      iconPath: '/assets/social-icons/twitter.svg',
      ariaLabel: 'Twitter/X'
    },
    {
      platform: 'linkedin',
      url: socialMedia.linkedin || '',
      iconPath: '/assets/social-icons/linkedin.svg',
      ariaLabel: 'LinkedIn'
    }
  ].filter(platform => platform.url) // Only show platforms with URLs

  if (socialPlatforms.length === 0) return null

  return (
    <SocialLinksContainer $variant={variant} className={className}>
      {socialPlatforms.map(({ platform, url, iconPath, ariaLabel }) => (
        <SocialLinkStyled
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          title={ariaLabel}
          $variant={variant}
        >
          <SocialIcon
            src={iconPath}
            alt={ariaLabel}
            width={20}
            height={20}
            $variant={variant}
          />
        </SocialLinkStyled>
      ))}
    </SocialLinksContainer>
  )
}

export default SocialLinks
