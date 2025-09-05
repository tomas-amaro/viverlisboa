# ResponsiveCarousel Component

A reusable responsive carousel component that displays items in a horizontal scrollable carousel on mobile and a CSS grid on desktop.

## Features

- 📱 **Mobile**: Touch-friendly horizontal carousel with visible scrollbar
- 💻 **Desktop**: CSS grid layout showing all items at once
- 🎨 **Branded**: Uses campaign colors for scrollbar styling
- ⚡ **Performance**: Pure CSS implementation, no JavaScript needed
- ♿ **Accessible**: Keyboard navigation and screen reader friendly

## API

```typescript
interface ResponsiveCarouselProps<T> {
  items: T[]                                    // Array of items to display
  renderItem: (item: T, index: number) => React.ReactNode  // Render function for each item
  className?: string                            // Optional CSS class
}
```

## Usage Examples

### Proposals Page
```tsx
import { ResponsiveCarousel } from '@/components/ui'

<ResponsiveCarousel
  items={proposals}
  renderItem={(proposal) => (
    <ProposalCard
      key={proposal._id}
      proposal={proposal}
      featured={proposal.featured}
    />
  )}
/>
```

### Events Page
```tsx
import { ResponsiveCarousel } from '@/components/ui'

<ResponsiveCarousel
  items={events}
  renderItem={(event) => (
    <EventCard
      key={event._id}
      event={event}
    />
  )}
/>
```

### News Page
```tsx
import { ResponsiveCarousel } from '@/components/ui'

<ResponsiveCarousel
  items={posts}
  renderItem={(post) => (
    <PostCard
      key={post._id}
      post={post}
    />
  )}
/>
```

## Responsive Behavior

### Mobile (< 768px)
- Horizontal scrollable carousel
- Fixed card widths: 320px → 280px → 260px (responsive)
- Visible scrollbar with campaign colors
- Smooth momentum scrolling on iOS

### Desktop (≥ 768px)
- CSS Grid layout
- Auto-fill columns with min 320px width
- Larger columns (350px) on large screens (≥ 1024px)
- No scrollbar (not needed)
- Larger gaps for comfortable viewing

## Styling

The component uses theme colors and breakpoints:
- Scrollbar thumb: `theme.colors.primary`
- Scrollbar hover: `theme.colors.primary.red`
- Track background: `theme.colors.gray[200]`
- Breakpoints: `theme.breakpoints.md` and `theme.breakpoints.lg`

## Generic Design

The component is fully generic and works with any data type. Just provide:
1. An array of items
2. A render function that knows how to display each item
3. Optionally, a CSS class for custom styling

This makes it reusable across proposals, events, news, team members, or any other card-based content!
