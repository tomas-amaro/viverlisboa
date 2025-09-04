import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Container, Typography, CampaignName, SocialLinks } from '@/components/ui'
import { Campaign } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import { resolveQuickLink } from '@/lib/campaignUtils'

interface FooterProps {
  campaign: Campaign
}

interface PartyData {
  name: string
  abbreviation: string
  logoPath: string
  title: string
  website: string
}

const StyledFooter = styled.footer`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary.blue} 0%,
    ${theme.colors.primary.teal} 50%,
    ${theme.colors.primary.carmin} 100%
  );
  color: ${theme.colors.text.white};
  padding-top: ${theme.spacing[16]};
  padding-bottom: ${theme.spacing[8]};
  margin-top: ${theme.spacing[16]};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${theme.colors.primary.red} 0%,
      ${theme.colors.primary.blue} 25%,
      ${theme.colors.primary.teal} 50%,
      ${theme.colors.primary.carmin} 75%,
      ${theme.colors.primary.red} 100%
    );
  }
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${theme.spacing[8]};
  margin-bottom: ${theme.spacing[8]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[6]};
  }
`

const FooterSection = styled.div`
  h3 {
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.text.white};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: ${theme.spacing[2]};
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.text.white};
    text-decoration: underline;
  }
`

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: ${theme.breakpoints.md}) {
    align-items: center;
    text-align: center;
  }
`

const Logo = styled.div`
  margin-bottom: ${theme.spacing[4]};
  max-width: 180px;

  img {
    height: auto;
  }
`

const CampaignDescription = styled(Typography)`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: ${theme.spacing[6]};
  max-width: 300px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
    max-width: none;
  }
`



const PartiesSection = styled.div`
  h3 {
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.text.white};
  }
`

const PartiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[6]};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const PartyIconContainer = styled(Link)`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes.sm};
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: ${theme.transitions.fast};
  text-decoration: none;
  color: white;
  
  &:hover {
    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.2);
    }
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const PartyIcon: React.FC<PartyData> = ({ name, abbreviation, logoPath, title, website }) => {
  const [imageError, setImageError] = useState(false)
  
  return (
    <PartyIconContainer 
      href={website} 
      target="_blank" 
      rel="noopener noreferrer" 
      title={`${title} - Visitar website oficial`}
    >
      {!imageError ? (
        <Image
          src={logoPath}
          alt={`${name} logo`}
          width={48}
          height={48}
          onError={() => setImageError(true)}
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <span>{abbreviation}</span>
      )}
    </PartyIconContainer>
  )
}

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: ${theme.spacing[6]};
  text-align: center;
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: ${theme.fontSizes.sm};
    margin: 0;
  }
`

const ContactInfo = styled.div`
  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: ${theme.spacing[2]};
    font-size: ${theme.fontSizes.sm};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    color: ${theme.colors.text.white};
  }
`

const Footer: React.FC<FooterProps> = ({ campaign }) => {
  const currentYear = new Date().getFullYear()
  
  const parties: PartyData[] = [
    {
      name: "Partido Socialista",
      abbreviation: "PS",
      logoPath: "/assets/party-logos/ps.svg",
      title: "Partido Socialista",
      website: "https://www.ps.pt"
    },
    {
      name: "Livre",
      abbreviation: "L",
      logoPath: "/assets/party-logos/livre.svg", 
      title: "Livre",
      website: "https://partidolivre.pt"
    },
    {
      name: "Bloco de Esquerda",
      abbreviation: "BE",
      logoPath: "/assets/party-logos/be.svg",
      title: "Bloco de Esquerda",
      website: "https://www.bloco.org"
    },
    {
      name: "Pessoas-Animais-Natureza",
      abbreviation: "PAN", 
      logoPath: "/assets/party-logos/pan.svg",
      title: "Pessoas-Animais-Natureza",
      website: "https://www.pan.com.pt"
    }
  ]

  return (
    <StyledFooter>
      <Container>
        <FooterContent>
          <FooterSection>
            <LogoSection>
              <Logo>
                {campaign.logo && campaign.logo.asset ? (
                  <Image
                    src={urlFor(campaign.logo).width(360).height(180).url()}
                    alt={`${campaign.title} logo`}
                    width={180}
                    height={90}
                    style={{ objectFit: 'contain' }}
                  />
                ) : (
                  <CampaignName 
                    mainTitle={campaign.title}
                    year="2025"
                    variant="white"
                    size="md"
                  />
                )}
              </Logo>
              
              <CampaignDescription>
                {campaign.footerContent?.description || campaign.description || "Juntos construímos uma cidade melhor para todos. Uma cidade mais justa, sustentável e próspera."}
              </CampaignDescription>
              
              <SocialLinks socialMedia={campaign.socialMedia} variant="footer" />
            </LogoSection>
          </FooterSection>

          <FooterSection>
            <h3>Links Rápidos</h3>
            <ul>
                          {campaign.footerContent?.quickLinks ? (
              campaign.footerContent.quickLinks.map((link, index) => {
                const { url, label, isExternal } = resolveQuickLink(link);
                return (
                  <li key={index}>
                    <FooterLink 
                      href={url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      {label}
                    </FooterLink>
                  </li>
                );
              })
            ) : (
                <>
                  <li>
                    <FooterLink href="/propostas">Propostas</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/eventos">Eventos</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/noticias">Notícias</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/sobre">Sobre Nós</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/apoiar">Como Apoiar</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/contacto">Contacto</FooterLink>
                  </li>
                </>
              )}
            </ul>
          </FooterSection>

          <FooterSection>
            <PartiesSection>
              <h3>Coligação</h3>
              <PartiesGrid>
                {parties.map((party, index) => (
                  <PartyIcon
                    key={index}
                    name={party.name}
                    abbreviation={party.abbreviation}
                    logoPath={party.logoPath}
                    title={party.title}
                    website={party.website}
                  />
                ))}
              </PartiesGrid>
            </PartiesSection>

            <ContactInfo>
              <h3>Contacto</h3>
              <p>
                <strong>Email:</strong> {campaign.footerContent?.contactInfo?.email || `geral@${campaign.domain}`}
              </p>
              {campaign.footerContent?.contactInfo?.phone && (
                <p>
                  <strong>Telefone:</strong> {campaign.footerContent.contactInfo.phone}
                </p>
              )}
              <p>
                <strong>Morada:</strong> {campaign.footerContent?.contactInfo?.address || campaign.location}
              </p>
            </ContactInfo>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <p>
            © {currentYear} {campaign.title}. Todos os direitos reservados. |{' '}
            <FooterLink href="/privacidade">Política de Privacidade</FooterLink> |{' '}
            <FooterLink href="/termos">Termos de Uso</FooterLink>
          </p>
        </FooterBottom>
      </Container>
    </StyledFooter>
  )
}

export { Footer }