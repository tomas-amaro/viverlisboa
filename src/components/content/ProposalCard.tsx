import Link from 'next/link'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { Card, Typography, Button } from '@/components/ui'
import { Proposal } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'
import { getCategoryLabel } from '@/lib/categoryUtils'

interface ProposalCardProps {
  proposal: Proposal
  featured?: boolean
  compact?: boolean
}

const StyledCard = styled(Card)<{ $featured?: boolean; $priority: string }>`
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  transition: all ${theme.transitions.base};
  position: relative;
  overflow: hidden;
  
  ${({ $featured }) =>
    $featured &&
    css`
      border: 2px solid ${theme.colors.primary.blue};
      box-shadow: ${theme.shadows.lg};
      
      &::before {
        content: 'Destaque';
        position: absolute;
        top: ${theme.spacing[4]};
        right: -${theme.spacing[6]};
        background: ${theme.colors.primary.red};
        color: ${theme.colors.text.white};
        padding: ${theme.spacing[1]} ${theme.spacing[8]};
        font-size: ${theme.fontSizes.xs};
        font-weight: ${theme.fontWeights.bold};
        text-transform: uppercase;
        transform: rotate(45deg);
        z-index: 2;
      }
    `}
  
  ${({ $priority }) =>
    $priority === 'high' &&
    css`
      border-left: 4px solid ${theme.colors.primary.red};
    `}
  
  ${({ $priority }) =>
    $priority === 'medium' &&
    css`
      border-left: 4px solid ${theme.colors.primary.blue};
    `}
  
  ${({ $priority }) =>
    $priority === 'low' &&
    css`
      border-left: 4px solid ${theme.colors.gray[400]};
    `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
`

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: linear-gradient(135deg, ${theme.colors.primary.blue}, ${theme.colors.primary.teal});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing[3]};
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }
  
  svg {
    width: 24px;
    height: 24px;
    color: ${theme.colors.text.white};
  }
`

const CategoryBadge = styled.span<{ $category: string }>`
  display: inline-block;
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${theme.spacing[3]};
  
  ${({ $category }) => {
    switch ($category) {
      case 'habitacao':
        return css`
          background-color: rgba(255, 57, 76, 0.1);
          color: ${theme.colors.primary.red};
        `
      case 'transportes':
        return css`
          background-color: rgba(72, 185, 202, 0.1);
          color: ${theme.colors.primary.blue};
        `
      case 'ambiente':
        return css`
          background-color: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        `
      case 'cultura':
        return css`
          background-color: rgba(168, 85, 247, 0.1);
          color: #a855f7;
        `
      default:
        return css`
          background-color: rgba(125, 60, 75, 0.1);
          color: ${theme.colors.primary.carmin};
        `
    }
  }}
`

const ProposalTitle = styled(Typography)`
  margin-bottom: ${theme.spacing[3]};
  line-height: 1.3;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${theme.colors.primary.blue};
    }
  }
`

const ProposalSummary = styled(Typography)`
  flex: 1;
  margin-bottom: ${theme.spacing[4]};
  line-height: 1.5;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing[3]};
`

const PriorityIndicator = styled.div<{ priority: string }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  
  ${({ priority }) =>
    priority === 'high' &&
    css`
      color: ${theme.colors.primary.red};
    `}
  
  ${({ priority }) =>
    priority === 'medium' &&
    css`
      color: ${theme.colors.primary.blue};
    `}
  
  ${({ priority }) =>
    priority === 'low' &&
    css`
      color: ${theme.colors.gray[600]};
    `}
`

const PriorityDot = styled.span<{ priority: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  
  ${({ priority }) =>
    priority === 'high' &&
    css`
      background-color: ${theme.colors.primary.red};
    `}
  
  ${({ priority }) =>
    priority === 'medium' &&
    css`
      background-color: ${theme.colors.primary.blue};
    `}
  
  ${({ priority }) =>
    priority === 'low' &&
    css`
      background-color: ${theme.colors.gray[400]};
    `}
`

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[1]};
  margin-top: ${theme.spacing[3]};
`

const Tag = styled.span`
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  background-color: ${theme.colors.gray[100]};
  color: ${theme.colors.text.secondary};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
`


const getPriorityLabel = (priority: string): string => {
  const labels: Record<string, string> = {
    high: 'Transformadora',
    medium: 'Essencial',
    low: 'Importante',
  }
  return labels[priority] || priority
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  featured = false,
}) => {
  // Handle missing or invalid proposal data
  if (!proposal || !proposal.title) {
    console.warn('ProposalCard: Missing proposal data or title', proposal)
    return null
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <StyledCard
        $featured={featured}
        $priority={proposal.priority || 'medium'}
        hover
        clickable
        onClick={() => window.location.href = `/propostas/${proposal.slug.current}`}
      >
        <div>
          <CategoryBadge $category={proposal.category}>
            {getCategoryLabel(proposal.category)}
          </CategoryBadge>
          
          {proposal.icon && (
            <IconContainer>
              <Image
                src={urlFor(proposal.icon).width(48).height(48).url()}
                alt={proposal.icon.alt || ''}
                width={24}
                height={24}
              />
            </IconContainer>
          )}
          
          <ProposalTitle variant="h4" margin={false}>
            <Link href={`/propostas/${proposal.slug.current}`}>
              {proposal.title}
            </Link>
          </ProposalTitle>
          
          <ProposalSummary variant="body2" color="secondary" margin={false}>
            {proposal.summary}
          </ProposalSummary>
          
          {proposal.tags && proposal.tags.length > 0 && (
            <TagsList>
              {proposal.tags.slice(0, 3).map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
              {proposal.tags.length > 3 && (
                <Tag>+{proposal.tags.length - 3}</Tag>
              )}
            </TagsList>
          )}
        </div>
        
        <CardFooter>
          {proposal.priority && ( 
            <PriorityIndicator priority={proposal.priority}>
              <PriorityDot priority={proposal.priority} />
              {getPriorityLabel(proposal.priority)}
            </PriorityIndicator>  
          )}
          <Button
            variant="ghost"
            size="sm"
            href={`/propostas/${proposal.slug.current}`}
          >
            Ler mais
          </Button>
        </CardFooter>
      </StyledCard>
    </motion.div>
  )
}

export default ProposalCard
