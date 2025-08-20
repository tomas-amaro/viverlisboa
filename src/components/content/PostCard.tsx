import Link from 'next/link'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { Card, Typography, Button } from '@/components/ui'
import { Post } from '@/types/sanity'
import { urlFor } from '@/lib/sanity'

interface PostCardProps {
  post: Post
  featured?: boolean
  layout?: 'vertical' | 'horizontal'
  showCategories?: boolean
}

const StyledCard = styled(Card)<{ $featured?: boolean; $layout: string }>`
  height: 100%;
  display: flex;
  flex-direction: ${({ $layout }) => $layout === 'horizontal' ? 'row' : 'column'};
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
        background: ${theme.colors.primary.blue};
        color: ${theme.colors.text.white};
        padding: ${theme.spacing[1]} ${theme.spacing[8]};
        font-size: ${theme.fontSizes.xs};
        font-weight: ${theme.fontWeights.bold};
        text-transform: uppercase;
        transform: rotate(45deg);
        z-index: 2;
      }
    `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const ImageContainer = styled.div<{ $layout: string }>`
  position: relative;
  ${({ $layout }) =>
    $layout === 'horizontal'
      ? css`
          width: 250px;
          min-height: 180px;
          
          @media (max-width: ${theme.breakpoints.md}) {
            width: 100%;
            height: 200px;
          }
        `
      : css`
          width: 100%;
          height: 220px;
        `}
  
  img {
    object-fit: cover;
    border-radius: ${theme.borderRadius.md};
  }
`

const PostContent = styled.div<{ $layout: string }>`
  ${({ $layout }) =>
    $layout === 'horizontal'
      ? css`
          flex: 1;
          padding: ${theme.spacing[4]};
          display: flex;
          flex-direction: column;
        `
      : css`
          padding: ${theme.spacing[4]};
          display: flex;
          flex-direction: column;
          flex: 1;
        `}
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[3]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const CategoriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[1]};
  margin-bottom: ${theme.spacing[3]};
`

const CategoryBadge = styled.span<{ $category: string }>`
  display: inline-block;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  ${({ $category }) => {
    switch ($category) {
      case 'propostas':
        return css`
          background-color: rgba(72, 185, 202, 0.1);
          color: ${theme.colors.primary.blue};
        `
      case 'eventos':
        return css`
          background-color: rgba(255, 57, 76, 0.1);
          color: ${theme.colors.primary.red};
        `
      case 'comunicados':
        return css`
          background-color: rgba(125, 60, 75, 0.1);
          color: ${theme.colors.primary.carmin};
        `
      case 'imprensa':
        return css`
          background-color: rgba(168, 85, 247, 0.1);
          color: #a855f7;
        `
      case 'campanha':
        return css`
          background-color: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        `
      default:
        return css`
          background-color: rgba(125, 60, 75, 0.1);
          color: ${theme.colors.primary.carmin};
        `
    }
  }}
`

const PostTitle = styled(Typography)`
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

const PostExcerpt = styled(Typography)`
  flex: 1;
  margin-bottom: ${theme.spacing[4]};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-top: auto;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const ReadingTime = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  color: ${theme.colors.text.light};
  font-size: ${theme.fontSizes.xs};
  
  svg {
    width: 14px;
    height: 14px;
  }
`

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    propostas: 'Propostas',
    eventos: 'Eventos',
    comunicados: 'Comunicados',
    imprensa: 'Imprensa',
    campanha: 'Campanha',
  }
  return labels[category] || category
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const calculateReadingTime = (content: any[]): number => {
  // Simplified calculation - in real implementation would traverse portable text
  const averageWordsPerMinute = 200
  const estimatedWords = content.length * 50 // rough estimate
  return Math.ceil(estimatedWords / averageWordsPerMinute)
}

const getTimeAgo = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Há menos de 1 hora'
  if (diffInHours < 24) return `Há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `Há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `Há ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`
  
  return formatDate(dateString)
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  featured = false,
  layout = 'vertical',
  showCategories = true,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const readingTime = calculateReadingTime(post.content)

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <StyledCard
        $featured={featured}
        $layout={layout}
        hover
        clickable
        onClick={() => window.location.href = `/noticias/${post.slug.current}`}
      >
        {post.featuredImage && (
          <ImageContainer $layout={layout}>
            <Image
              src={urlFor(post.featuredImage).width(500).height(300).quality(85).url()}
              alt={post.featuredImage.alt || post.title}
              fill
              sizes={layout === 'horizontal' ? '250px' : '(max-width: 768px) 100vw, 500px'}
            />
          </ImageContainer>
        )}
        
        <PostContent $layout={layout}>
          {showCategories && post.categories && post.categories.length > 0 && (
            <CategoriesList>
              {post.categories.slice(0, 2).map((category, index) => (
                <CategoryBadge key={index} $category={category}>
                  {getCategoryLabel(category)}
                </CategoryBadge>
              ))}
            </CategoriesList>
          )}
          
          <PostMeta>
            <DateContainer>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {getTimeAgo(post.publishedAt)}
            </DateContainer>
          </PostMeta>
          
          <PostTitle variant="h4" margin={false}>
            <Link href={`/noticias/${post.slug.current}`}>
              {post.title}
            </Link>
          </PostTitle>
          
          {post.excerpt && (
            <PostExcerpt variant="body2" color="secondary" margin={false}>
              {post.excerpt}
            </PostExcerpt>
          )}
          
          <CardFooter>
            <ReadingTime>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {readingTime} min de leitura
            </ReadingTime>
            
            <Button
              variant="ghost"
              size="sm"
              href={`/noticias/${post.slug.current}`}
            >
              Ler mais
            </Button>
          </CardFooter>
        </PostContent>
      </StyledCard>
    </motion.div>
  )
}

export default PostCard
