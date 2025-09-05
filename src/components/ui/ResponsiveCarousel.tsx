import React from 'react'
import styled from 'styled-components'
import { theme } from '@/styles/theme'

interface ResponsiveCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

const CarouselContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

const CarouselTrack = styled.div`
  /* Mobile: Horizontal carousel */
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0.5rem 0 1rem 0;
  
  /* Custom scrollbar styling for mobile carousel */
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.primary} ${theme.colors.gray[200]};
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.gray[200]};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
    transition: background-color ${theme.transitions.fast};
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary.red};
  }
  
  /* Smooth momentum scrolling on iOS */
  -webkit-overflow-scrolling: touch;
  
  /* Desktop: Grid layout */
  @media (min-width: ${theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    overflow-x: visible;
    padding: 0.5rem 0;
    
    /* Hide scrollbar on desktop grid */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2.5rem;
  }
`

const CarouselCard = styled.div`
  /* Mobile: Fixed width cards for carousel */
  flex: 0 0 auto;
  width: 320px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 280px;
  }
  
  @media (max-width: 400px) {
    width: 260px;
  }
  
  /* Desktop: Full width grid items */
  @media (min-width: ${theme.breakpoints.md}) {
    width: auto;
    flex: none;
  }
`

export function ResponsiveCarousel<T>({ 
  items, 
  renderItem, 
  className 
}: ResponsiveCarouselProps<T>) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <CarouselContainer className={className}>
      <CarouselTrack>
        {items.map((item, index) => (
          <CarouselCard key={index}>
            {renderItem(item, index)}
          </CarouselCard>
        ))}
      </CarouselTrack>
    </CarouselContainer>
  )
}
