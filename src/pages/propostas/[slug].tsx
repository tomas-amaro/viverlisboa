import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '../../components/layout'
import { Container, Typography, Button } from '../../components/ui'
import { ContentRenderer } from '../../components/content'
import { getBuildConfiguration, getCampaignProposals, CampaignWithContent } from '../../lib/campaignUtils'
import { client } from '../../lib/sanity'
import { ContentBlock } from '../../types/sanity'

interface Proposal {
  _id: string
  title: string
  slug: { current: string }
  summary: string
  content: ContentBlock[]
  category: string
  priority: string
  featured: boolean
  icon?: { asset: { url: string }; alt?: string }
  tags?: string[]
}

interface ProposalPageProps {
  proposal: Proposal
  campaign: CampaignWithContent
}

export default function ProposalPage({ proposal, campaign }: ProposalPageProps) {
  const categoryLabels = {
    habitacao: "Habitação",
    transportes: "Transportes", 
    ambiente: "Ambiente",
    cultura: "Cultura",
    educacao: "Educação",
    saude: "Saúde",
    economia: "Economia",
    participacao: "Participação Cidadã",
    igualdade: "Igualdade",
    juventude: "Juventude",
    idosos: "Idosos",
    urbanismo: "Urbanismo",
  }

  const priorityLabels = {
    high: "Alta Prioridade",
    medium: "Prioridade Média",
    low: "Baixa Prioridade"
  }

  return (
    <>
      <Head>
        <title>{proposal.title} | {campaign.title}</title>
        <meta name="description" content={proposal.summary} />
      </Head>
      <Layout campaign={campaign}>
        <Container>
          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '2rem' }}>
              <Typography variant="body2" color="secondary">
                <Link href="/propostas" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {campaign.navigationLabels?.proposals || 'Propostas'}
                </Link>
                {' / '}
                <span>{proposal.title}</span>
              </Typography>
            </div>

            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{
                  background: campaign.mainColor || '#48B9CA',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  {categoryLabels[proposal.category as keyof typeof categoryLabels] || proposal.category}
                </span>
                <span style={{
                  background: proposal.priority === 'high' ? '#FF394C' : 
                           proposal.priority === 'medium' ? '#FFA500' : '#48B9CA',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  {priorityLabels[proposal.priority as keyof typeof priorityLabels]}
                </span>
                {proposal.featured && (
                  <span style={{
                    background: '#FFD700',
                    color: '#333',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    Proposta Destacada
                  </span>
                )}
              </div>

              <Typography variant="h1" margin={true}>
                {proposal.title}
              </Typography>

              {proposal.summary && (
                <Typography 
                  variant="h3" 
                  color="secondary" 
                  margin={true}
                >
                  {proposal.summary}
                </Typography>
              )}
            </div>

            {/* Content */}
            <div style={{ marginBottom: '3rem' }}>
              <ContentRenderer content={proposal.content} campaign={campaign} />
            </div>

            {/* Tags */}
            {proposal.tags && proposal.tags.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <Typography variant="h4" margin={true}>
                  Tags
                </Typography>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {proposal.tags.map((tag, index) => (
                    <span 
                      key={index}
                      style={{
                        background: 'rgba(72, 185, 202, 0.1)',
                        color: campaign.mainColor || '#48B9CA',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        border: `1px solid ${campaign.mainColor || '#48B9CA'}20`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ 
              borderTop: '1px solid #eee',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Button 
                variant="outline" 
                href="/propostas"
              >
                ← Todas as {campaign.navigationLabels?.proposals || 'Propostas'}
              </Button>
              <Button 
                variant="primary" 
                href="/contacto"
              >
                Fale Connosco
              </Button>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { campaign, shouldGenerate } = await getBuildConfiguration()

    // Only generate paths if proposals are enabled and exist
    if (!shouldGenerate.proposals) {
      return {
        paths: [],
        fallback: false
      }
    }

    const proposals = await getCampaignProposals(campaign._id, 100)
    
    const paths = proposals.map((proposal: { slug: { current: string } }) => ({
      params: { slug: proposal.slug.current }
    }))

    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return {
      paths: [],
      fallback: false
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { campaign } = await getBuildConfiguration()
    const slug = params?.slug as string

    const proposal = await client.fetch(`
      *[_type == "proposal" && slug.current == $slug && references($campaignId)][0]{
        _id,
        title,
        slug,
        summary,
        content,
        category,
        priority,
        featured,
        icon,
        tags
      }
    `, { slug, campaignId: campaign._id })

    if (!proposal) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        proposal,
        campaign
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
  }
}
