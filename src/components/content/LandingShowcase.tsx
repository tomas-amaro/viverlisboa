import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'
import { 
  Container, 
  Button, 
  Grid, 
  GridItem, 
  GeometricBackground,
  InfoCallout,
  StyledSection,
  CallToActionSection,
  HighlightSection,
  ContentSection,
  SectionTitle,
  SectionSubtitle
} from '../ui'

const LandingHero = styled(motion.section)`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary.blue} 0%,
    ${theme.colors.primary.teal} 30%,
    ${theme.colors.primary.carmin} 65%,
    ${theme.colors.primary.red} 100%
  );
  color: ${theme.colors.text.white};
  overflow: hidden;
`

const HeroBrand = styled(motion.div)`
  position: absolute;
  top: ${theme.spacing[8]};
  right: ${theme.spacing[8]};
  z-index: 4;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
  
  @media (max-width: ${theme.breakpoints.md}) {
    top: ${theme.spacing[4]};
    right: ${theme.spacing[4]};
    font-size: ${theme.fontSizes.xs};
  }
`

const HeroContent = styled(Container)`
  position: relative;
  z-index: 3;
  text-align: center;
`

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: ${theme.fontWeights.black};
  line-height: 0.9;
  margin-bottom: ${theme.spacing[6]};
  text-transform: uppercase;
  letter-spacing: -0.03em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  span {
    display: block;
    
    &:first-child {
      font-size: 0.6em;
      opacity: 0.9;
      margin-bottom: ${theme.spacing[2]};
    }
    
    &:last-child {
      background: linear-gradient(
        45deg,
        ${theme.colors.text.white} 0%,
        rgba(255, 255, 255, 0.8) 50%,
        ${theme.colors.text.white} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
`

const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing[8]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.xl};
  }
`

const HeroActions = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing[6]};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing[4]};
    
    > * {
      min-width: 250px;
    }
  }
`

const StatCard = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing[6]};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius['2xl']};
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  h3 {
    font-size: ${theme.fontSizes['4xl']};
    font-weight: ${theme.fontWeights.black};
    color: ${theme.colors.text.white};
    margin-bottom: ${theme.spacing[2]};
  }
  
  p {
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.medium};
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.15);
  }
`

const FeatureGrid = styled(Grid)`
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[6]};
  }
`

const FeatureCard = styled(motion.div)`
  text-align: center;
  
  .icon {
    width: 80px;
    height: 80px;
    margin: 0 auto ${theme.spacing[6]};
    background: linear-gradient(135deg, ${theme.colors.primary.blue}, ${theme.colors.primary.teal});
    border-radius: ${theme.borderRadius['2xl']};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.text.white};
    box-shadow: ${theme.shadows.lg};
  }
  
  h3 {
    font-size: ${theme.fontSizes['2xl']};
    font-weight: ${theme.fontWeights.bold};
    text-transform: uppercase;
    letter-spacing: 0.02em;
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.primary.blue};
  }
  
  p {
    font-size: ${theme.fontSizes.lg};
    line-height: 1.6;
    color: ${theme.colors.text.secondary};
  }
`

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${theme.spacing[8]};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: rgba(255, 255, 255, 0.7);
  font-size: ${theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  &::after {
    content: '';
    width: 2px;
    height: 30px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent);
  }
`

export const LandingShowcase: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <LandingHero
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <GeometricBackground variant="hero" />
        
        <HeroBrand
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          VIVER LISBOA — Alexandra Leitão 2025
        </HeroBrand>

        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle variants={itemVariants}>
              <span>Viver</span>
              <span>Lisboa</span>
            </HeroTitle>
            
            <HeroSubtitle variants={itemVariants}>
              A não deixar ninguém para trás. Uma candidatura para toda a cidade, 
              com propostas concretas para os desafios de hoje.
            </HeroSubtitle>
            
            <HeroActions variants={itemVariants}>
              <Button variant="secondary" size="lg" href="/propostas">
                Ver Propostas
              </Button>
              <Button variant="outline" size="lg" href="/sobre">
                Conhecer Alexandra
              </Button>
            </HeroActions>
          </motion.div>
        </HeroContent>

        <ScrollIndicator
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        >
          Descobrir
        </ScrollIndicator>
      </LandingHero>

      {/* Stats Section */}
      <StyledSection variant="primary" backgroundPattern padding="lg">
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: theme.spacing[12] }}
          >
            Lisboa em Números
          </SectionTitle>
          
          <Grid columns={3} gap={8}>
            <GridItem>
              <StatCard
                variants={statsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3>500K+</h3>
                <p>Residentes</p>
              </StatCard>
            </GridItem>
            <GridItem>
              <StatCard
                variants={statsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3>50+</h3>
                <p>Propostas</p>
              </StatCard>
            </GridItem>
            <GridItem>
              <StatCard
                variants={statsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3>24</h3>
                <p>Freguesias</p>
              </StatCard>
            </GridItem>
          </Grid>
        </Container>
      </StyledSection>

      {/* Features Section */}
      <ContentSection padding="xl">
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: theme.spacing[4] }}
          >
            As Nossas Prioridades
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: theme.spacing[16] }}
          >
            Propostas concretas para os grandes desafios de Lisboa
          </SectionSubtitle>
          
          <FeatureGrid columns={3} gap={10}>
            <GridItem>
              <FeatureCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="icon">🏠</div>
                <h3>Habitação</h3>
                <p>Mais habitação pública e apoio aos jovens para o primeiro arrendamento</p>
              </FeatureCard>
            </GridItem>
            <GridItem>
              <FeatureCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="icon">🚊</div>
                <h3>Transportes</h3>
                <p>Mobilidade sustentável e acessível para toda a cidade</p>
              </FeatureCard>
            </GridItem>
            <GridItem>
              <FeatureCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="icon">🌱</div>
                <h3>Ambiente</h3>
                <p>Mais espaços verdes e sustentabilidade ambiental</p>
              </FeatureCard>
            </GridItem>
          </FeatureGrid>
        </Container>
      </ContentSection>

      {/* Info Callout Section */}
      <HighlightSection padding="lg">
        <Container>
          <InfoCallout
            variant="primary"
            title="Este device gráfico pode ser usado para destacar assuntos"
            subtitle="Tema da Informação"
          >
            <p>
              Esta é uma demonstração do sistema de design inspirado no kit gráfico 
              da campanha &quot;Viver Lisboa&quot;. O design incorpora as cores, tipografia 
              e elementos geométricos definidos no guia de estilo.
            </p>
          </InfoCallout>
        </Container>
      </HighlightSection>

      {/* Call to Action */}
      <CallToActionSection padding="xl">
        <Container>
          <motion.div
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionTitle style={{ marginBottom: theme.spacing[6] }}>
              Juntos por Lisboa
            </SectionTitle>
            <SectionSubtitle style={{ marginBottom: theme.spacing[8] }}>
              Conheça todas as nossas propostas e junte-se ao movimento
            </SectionSubtitle>
            <HeroActions
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="secondary" size="lg" href="/propostas">
                Ver Todas as Propostas
              </Button>
            </HeroActions>
          </motion.div>
        </Container>
      </CallToActionSection>
    </>
  )
}

export default LandingShowcase
