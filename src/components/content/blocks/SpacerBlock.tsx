import React from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { SpacerBlockProps, BlockComponentProps } from './types'

interface Props extends BlockComponentProps {
  block: SpacerBlockProps
}

const Spacer = styled.div<{ $height: string }>`
  ${({ $height }) => {
    switch ($height) {
      case 'sm':
        return `height: ${theme.spacing[4]};`
      case 'md':
        return `height: ${theme.spacing[8]};`
      case 'lg':
        return `height: ${theme.spacing[16]};`
      case 'xl':
        return `height: ${theme.spacing[24]};`
      default:
        return `height: ${theme.spacing[8]};`
    }
  }}
`

export const SpacerBlock: React.FC<Props> = ({ block }) => {
  return <Spacer $height={block.height} />
}
