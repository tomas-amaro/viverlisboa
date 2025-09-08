import React from 'react'
import { CampaignWithContent } from '@/lib/campaignUtils'
import {
  HeroBlock,
  TextBlock,
  ImageBlock,
  GalleryBlock,
  CtaBlock,
  VideoBlock,
  ProposalsShowcaseBlock,
  SpacerBlock,
} from './'
import { ContentBlock } from './types'

interface PageBuilderProps {
  blocks: ContentBlock[]
  campaign: CampaignWithContent
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ blocks, campaign }) => {
  const renderBlock = (block: ContentBlock) => {
    const commonProps = { campaign }

    switch (block._type) {
      case 'heroBlock':
        return <HeroBlock key={block._key} block={block} {...commonProps} />
      
      case 'textBlock':
        return <TextBlock key={block._key} block={block} {...commonProps} />
      
      case 'imageBlock':
        return <ImageBlock key={block._key} block={block} {...commonProps} />
      
      case 'galleryBlock':
        return <GalleryBlock key={block._key} block={block} {...commonProps} />
      
      case 'ctaBlock':
        return <CtaBlock key={block._key} block={block} {...commonProps} />
      
      case 'videoBlock':
        return <VideoBlock key={block._key} block={block} {...commonProps} />
      
      case 'proposalsShowcaseBlock':
        return <ProposalsShowcaseBlock key={block._key} block={block} {...commonProps} />
      
      case 'spacerBlock':
        return <SpacerBlock key={block._key} block={block} {...commonProps} />
      
      default:
        console.warn(`Unknown block type: ${(block as ContentBlock)._type}`)
        return null
    }
  }

  return (
    <>
      {blocks.map(renderBlock)}
    </>
  )
}
