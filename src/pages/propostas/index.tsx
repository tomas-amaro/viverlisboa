import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { ProposalCard } from '../../components/content'
import { Container, Typography, Button, ResponsiveCarousel } from '../../components/ui'
import { getBuildConfiguration, CampaignWithContent } from '../../lib/campaignUtils'
import { Proposal } from '../../types/sanity'
import { theme } from '../../styles/theme'
import { getCategoryLabel } from '../../lib/categoryUtils'

const CategoryHeading = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid ${theme.colors.primary};
  padding-bottom: 0.5rem;
  font-family: ${theme.fonts.primary};
`


interface ProposalsPageProps {
  proposals: Proposal[]
  campaign: CampaignWithContent
  navigation: Array<{
    href: string
    label: string
    count?: number
  }>
  navigationLabel: string
}

export default function ProposalsPage({ proposals, campaign, navigationLabel }: ProposalsPageProps) {
  return (
    <>
      <Head>
        <title>{navigationLabel} | {campaign.title}</title>
        <meta 
          name="description" 
          content={`Conheça as ${navigationLabel.toLowerCase()} da campanha ${campaign.title}`}
        />
      </Head>
        <Container>
          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <Typography variant="h1" margin={true}>
                {navigationLabel}
              </Typography>
              <Typography variant="body1" color="secondary">
                Conheça as nossas propostas para transformar a nossa comunidade
              </Typography>
            </div>

            {proposals.length > 0 ? (
              (() => {
              // Group proposals by category
              const proposalsByCategory = proposals.reduce((acc, proposal) => {
                const category = proposal.category || 'Outras';
                if (!acc[category]) {
                  acc[category] = [];
                }
                  acc[category].push(proposal);
                return acc;
              }, {} as Record<string, typeof proposals>);

              // Sort categories alphabetically and render each group
              return Object.keys(proposalsByCategory)
                .sort()
                .map((category) => (
                  <div key={category} style={{ marginBottom: '3rem' }}>
                    <CategoryHeading>
                      {getCategoryLabel(category)}
                    </CategoryHeading>
                    <ResponsiveCarousel
                      items={proposalsByCategory[category].sort((a, b) => {
                        // Sort by priority (high, medium, low), then by title
                        const priorityOrder = { high: 3, medium: 2, low: 1 };
                        const aPriority = priorityOrder[a.priority || 'medium'];
                        const bPriority = priorityOrder[b.priority || 'medium'];
                        
                        if (aPriority !== bPriority) {
                          return bPriority - aPriority; // Higher priority first
                        }
                        return a.title.localeCompare(b.title);
                      })}
                      renderItem={(proposal) => (
                        <ProposalCard
                          key={proposal._id}
                          proposal={proposal}
                          featured={proposal.featured}
                        />
                      )}
                    />
                  </div>
                ));
              })()
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <Typography variant="h3" margin={true}>
                  Em breve
                </Typography>
                <Typography variant="body1" color="secondary" margin={true}>
                  As nossas propostas estão a ser preparadas e serão publicadas em breve.
                </Typography>
                <Button href="/">Voltar ao Início</Button>
              </div>
            )}
          </div>
        </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<ProposalsPageProps> = async () => {
  try {
    const { campaign, navigation, shouldGenerate } = await getBuildConfiguration()

    // Only generate this page if proposals are enabled and exist
    if (!shouldGenerate.proposals) {
      return {
        notFound: true
      }
    }

    const { getCampaignProposals } = await import('../../lib/campaignUtils')
    const proposals = await getCampaignProposals(campaign._id, 50)

    return {
      props: {
        proposals,
        campaign,
        navigation,
        navigationLabel: campaign.navigationLabels?.proposals || 'Propostas'
      },

    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}
