import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { PortableText } from '@portabletext/react'
import { theme } from '@/styles/theme'
import { Container, Grid, Typography } from '@/components/ui'
import { HeroSection, ProposalCard, EventCard } from '@/components/content'
import { urlFor } from '@/lib/sanity'
import { 
  ContentBlock, 
  HeroBlock, 
  ProposalsBlock, 
  EventsBlock, 
  ImageBlock, 
  PortableTextBlock,
  Proposal,
  Event,
  Campaign
} from '@/types/sanity'

interface ContentRendererProps {
  content: ContentBlock[]
  campaign: Campaign
}

interface ContentBlockProps {
  block: ContentBlock
  campaign: Campaign
}

const Section = styled.section`
  padding: ${theme.spacing[12]} 0;
  
  &:nth-child(even) {
    background-color: ${theme.colors.background.secondary};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[8]} 0;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[8]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing[6]};
  }
`

const ImageContainer = styled.div`
  margin: ${theme.spacing[8]} 0;
  text-align: center;
  
  img {
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.lg};
  }
`

const ImageCaption = styled.p`
  margin-top: ${theme.spacing[4]};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  font-style: italic;
`

const PortableTextContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${theme.spacing[4]};
    margin-top: ${theme.spacing[6]};
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  h1 { font-size: ${theme.fontSizes['3xl']}; }
  h2 { font-size: ${theme.fontSizes['2xl']}; }
  h3 { font-size: ${theme.fontSizes.xl}; }
  h4 { font-size: ${theme.fontSizes.lg}; }
  
  p {
    margin-bottom: ${theme.spacing[4]};
    line-height: 1.7;
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.text.primary};
  }
  
  ul, ol {
    margin-bottom: ${theme.spacing[4]};
    padding-left: ${theme.spacing[6]};
    
    li {
      margin-bottom: ${theme.spacing[2]};
      line-height: 1.6;
    }
  }
  
  blockquote {
    border-left: 4px solid ${theme.colors.primary.blue};
    padding-left: ${theme.spacing[4]};
    margin: ${theme.spacing[6]} 0;
    font-style: italic;
    color: ${theme.colors.text.secondary};
  }
  
  strong {
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.text.primary};
  }
`

// Portable Text components
const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <Typography variant="h1" margin={false}>{children}</Typography>,
    h2: ({ children }: { children?: React.ReactNode }) => <Typography variant="h2" margin={false}>{children}</Typography>,
    h3: ({ children }: { children?: React.ReactNode }) => <Typography variant="h3" margin={false}>{children}</Typography>,
    h4: ({ children }: { children?: React.ReactNode }) => <Typography variant="h4" margin={false}>{children}</Typography>,
    normal: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong>{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: { alt?: string; caption?: string; asset: { _ref: string } } }) => (
      <ImageContainer>
        <Image
          src={urlFor(value).width(800).height(600).quality(90).url()}
          alt={value.alt || ''}
          width={800}
          height={600}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {value.caption && <ImageCaption>{value.caption}</ImageCaption>}
      </ImageContainer>
    ),
  },
}

// Hero Block Component
const HeroBlockComponent: React.FC<{ block: HeroBlock; campaign: Campaign }> = ({ 
  block, 
  campaign 
}) => (
  <HeroSection
    title={block.title || campaign.title}
    subtitle={block.subtitle}
    ctaText={block.ctaText}
    ctaUrl={block.ctaUrl}
    backgroundImage={block.image}
    height="lg"
    campaignColors={{
      primary: campaign.mainColor,
      secondary: campaign.secondaryColor,
    }}
  />
)

// Proposals Block Component
const ProposalsBlockComponent: React.FC<{ 
  block: ProposalsBlock; 
  proposals: Proposal[] 
}> = ({ block, proposals }) => (
  <Section>
    <Container>
      {block.title && (
        <SectionHeader>
          <Typography variant="h2" align="center">
            {block.title}
          </Typography>
        </SectionHeader>
      )}
      
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={6}>
        {proposals.map((proposal) => (
          <ProposalCard 
            key={proposal._id}
            proposal={proposal}
          />
        ))}
      </Grid>
    </Container>
  </Section>
)

// Events Block Component
const EventsBlockComponent: React.FC<{ 
  block: EventsBlock; 
  events: Event[] 
}> = ({ block, events }) => (
  <Section>
    <Container>
      {block.title && (
        <SectionHeader>
          <Typography variant="h2" align="center">
            {block.title}
          </Typography>
        </SectionHeader>
      )}
      
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={6}>
        {events.map((event) => (
          <EventCard 
            key={event._id}
            event={event}
          />
        ))}
      </Grid>
    </Container>
  </Section>
)

// Image Block Component
const ImageBlockComponent: React.FC<{ block: ImageBlock }> = ({ block }) => (
  <Section>
    <Container>
      <ImageContainer>
        <Image
          src={urlFor(block).width(1200).height(800).quality(90).url()}
          alt={block.alt || ''}
          width={1200}
          height={800}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {block.caption && <ImageCaption>{block.caption}</ImageCaption>}
      </ImageContainer>
    </Container>
  </Section>
)

// Portable Text Block Component
const PortableTextBlockComponent: React.FC<{ 
  blocks: PortableTextBlock[] 
}> = ({ blocks }) => (
  <Section>
    <Container>
      <PortableTextContainer>
        <PortableText 
          value={blocks} 
          components={portableTextComponents}
        />
      </PortableTextContainer>
    </Container>
  </Section>
)

// Content Block Router
const ContentBlockComponent: React.FC<ContentBlockProps & { 
  proposals: Proposal[];
  events: Event[];
}> = ({ block, campaign, proposals, events }) => {
  switch (block._type) {
    case 'hero':
      return <HeroBlockComponent block={block as HeroBlock} campaign={campaign} />
    
    case 'proposals':
      return <ProposalsBlockComponent block={block as ProposalsBlock} proposals={proposals} />
    
    case 'events':
      return <EventsBlockComponent block={block as EventsBlock} events={events} />
    
    case 'image':
      return <ImageBlockComponent block={block as ImageBlock} />
    
    default:
      // Handle regular text blocks - collect them and render together
      return null
  }
}

// Main Content Renderer
export const ContentRenderer: React.FC<ContentRendererProps & {
  proposals?: Proposal[];
  events?: Event[];
}> = ({ content, campaign, proposals = [], events = [] }) => {
  // Group consecutive text blocks together
  const groupedContent: (ContentBlock | PortableTextBlock[])[] = []
  let currentTextGroup: PortableTextBlock[] = []
  
  content.forEach((block) => {
    if (block._type === 'block') {
      currentTextGroup.push(block as PortableTextBlock)
    } else {
      if (currentTextGroup.length > 0) {
        groupedContent.push([...currentTextGroup])
        currentTextGroup = []
      }
      groupedContent.push(block)
    }
  })
  
  // Don't forget the last text group
  if (currentTextGroup.length > 0) {
    groupedContent.push(currentTextGroup)
  }
  
  return (
    <>
      {groupedContent.map((item, index) => {
        if (Array.isArray(item)) {
          // Render grouped text blocks
          return (
            <PortableTextBlockComponent 
              key={`text-${index}`}
              blocks={item}
            />
          )
        } else {
          // Render other content blocks
          return (
            <ContentBlockComponent
              key={item._key || `block-${index}`}
              block={item}
              campaign={campaign}
              proposals={proposals}
              events={events}
            />
          )
        }
      })}
    </>
  )
}

export default ContentRenderer
