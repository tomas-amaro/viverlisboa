import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Container, Typography, Button, Grid } from '@/components/ui'
import { ProposalCard } from '@/components/content'
import { theme } from '@/styles/theme'
import { ProposalsShowcaseBlockProps, BlockComponentProps } from './types'

interface Props extends BlockComponentProps {
  block: ProposalsShowcaseBlockProps
}

const ShowcaseSection = styled.section`
  padding: ${theme.spacing[12]} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[8]} 0;
  }
`

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[8]};
`

const Title = styled(Typography)`
  margin-bottom: ${theme.spacing[4]};
`

const Description = styled(Typography)`
  max-width: 600px;
  margin: 0 auto;
`
export const ProposalsShowcaseBlock: React.FC<Props> = ({ block }) => {
  return (
    <ShowcaseSection>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Header>
            <Title variant="h2">
              {block.title || 'Nossas Propostas'}
            </Title>
            
            {block.description && (
              <Description variant="body1" color="secondary">
                {block.description}
              </Description>
            )}
          </Header>
          {/* Grid de propostas */}
          <Grid 
            columns={{ 
              sm: 1, 
              md: block.layout === 'list' ? 1 : 2, 
              lg: block.layout === 'list' ? 2 : 3 
            }} 
            gap={6}
          >
            {block.proposals.map((proposal, index) => (
              <motion.div
                key={proposal._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: 'easeOut' 
                }}
              >
                <ProposalCard 
                  proposal={proposal} 
                  featured={proposal.featured}
                  compact={block.layout === 'list'}
                />
              </motion.div>
            ))}
          </Grid>

          {/* Link para ver todas as propostas */}
          {block.proposals && block.proposals.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: theme.spacing[8] }}>
              <Button href="/propostas" size="lg">
                Ver todas as propostas
              </Button>
            </div>
          )}
        </motion.div>
      </Container>
    </ShowcaseSection>
  )
}
