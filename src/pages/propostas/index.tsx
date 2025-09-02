import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ProposalCard } from '../../components/content'
import { Container, Grid, Typography, Button } from '../../components/ui'
import { getBuildConfiguration, CampaignWithContent } from '../../lib/campaignUtils'
import { Proposal } from '../../types/sanity'

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
              <Grid columns={3} gap={2}>
                {proposals.map((proposal) => (
                  <ProposalCard
                    key={proposal._id}
                    proposal={proposal}
                    featured={proposal.featured}
                  />
                ))}
              </Grid>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <Typography variant="h3" margin={true}>
                  Em breve
                </Typography>
                <Typography variant="body1" color="secondary" margin={true}>
                  As nossas propostas estão sendo preparadas e serão publicadas em breve.
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
      revalidate: 60 // Revalidate every minute
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}
