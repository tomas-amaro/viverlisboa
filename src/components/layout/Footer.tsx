import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Container, Grid, GridItem, Typography } from '@/components/ui'
import { Campaign } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'

interface FooterProps {
  campaign: Campaign
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
  margin-top: ${theme.spacing[20]};
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

const FooterLogo = styled.div`
  position: relative;
  height: 60px;
  width: auto;
  margin-bottom: ${theme.spacing[4]};
  
  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  margin-top: ${theme.spacing[4]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.text.white};
  text-decoration: none;
  transition: ${theme.transitions.fast};
  backdrop-filter: blur(10px);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const PartiesSection = styled.div`
  h3 {
    margin-bottom: ${theme.spacing[4]};
  }
`

const PartiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing[3]};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const PartyIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes.sm};
  backdrop-filter: blur(10px);
`

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

export const Footer: React.FC<FooterProps> = ({ campaign }) => {
  const currentYear = new Date().getFullYear()

  return (
    <StyledFooter>
      <Container>
        <FooterContent>
          <LogoSection>
            {campaign.logo && campaign.logo.asset ? (
              <FooterLogo>
                <Image
                  src={urlFor(campaign.logo).width(200).height(120).url()}
                  alt={campaign.logo.alt || `Logo ${campaign.title}`}
                  width={200}
                  height={120}
                />
              </FooterLogo>
            ) : (
              <div style={{ 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: theme.spacing[4]
              }}>
                {campaign.title}
              </div>
            )}
            
            <Typography variant="body2" color="white" margin={false}>
              Uma coligação de esquerda comprometida com o futuro de {campaign.location}.
              Juntos por uma cidade mais justa, sustentável e democrática.
            </Typography>

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
          </LogoSection>

          <FooterSection>
            <h3>Links Úteis</h3>
            <ul>
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
                <FooterLink href="/candidatos">Candidatos</FooterLink>
              </li>
              <li>
                <FooterLink href="/apoiar">Como Apoiar</FooterLink>
              </li>
              <li>
                <FooterLink href="/contacto">Contacto</FooterLink>
              </li>
            </ul>
          </FooterSection>

          <FooterSection>
            <PartiesSection>
              <h3>Coligação</h3>
              <PartiesGrid>
                <PartyIcon title="Partido Socialista">PS</PartyIcon>
                <PartyIcon title="Livre">L</PartyIcon>
                <PartyIcon title="Bloco de Esquerda">BE</PartyIcon>
                <PartyIcon title="Pessoas-Animais-Natureza">PAN</PartyIcon>
              </PartiesGrid>
            </PartiesSection>

            <ContactInfo>
              <h3>Contacto</h3>
              <p>
                <strong>Email:</strong> geral@{campaign.domain}
              </p>
              <p>
                <strong>Telefone:</strong> +351 XXX XXX XXX
              </p>
              <p>
                <strong>Morada:</strong> {campaign.location}
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

export default Footer
