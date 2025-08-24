# Dynamic Pages Setup

Your project now supports dynamic page generation from Sanity CMS with the multi-domain build system.

## ✅ What's Been Added

### 1. **Enhanced Type System**
- Added content block types: `HeroBlock`, `ProposalsBlock`, `EventsBlock`, `ImageBlock`
- Updated `Page` interface with proper content block typing
- Supports rich content with references to proposals and events

### 2. **Content Renderer System**
- **`ContentRenderer.tsx`** - Main component that renders all content blocks
- Supports Portable Text for rich text content
- Handles hero sections, proposal grids, event grids, and images
- Groups consecutive text blocks for better rendering

### 3. **Dynamic Page Route**
- **`[slug].tsx`** - Dynamic route for all Sanity pages
- Static generation with `getStaticPaths` and `getStaticProps`
- Domain-specific page generation (only generates pages for current campaign domain)
- Full SEO support with OpenGraph and structured data

### 4. **SEO & Performance Features**
- Complete meta tag setup (title, description, keywords)
- OpenGraph tags for social sharing
- Twitter Card support
- Structured data (JSON-LD) for better search visibility
- Canonical URLs per domain
- Campaign-specific theme colors

## 🎯 How It Works

### **Development Mode**
```bash
npm run dev:lisboa    # Test Lisboa pages
npm run dev:avenidas  # Test Avenidas pages
npm run dev:alvalade  # Test Alvalade pages
```

- Generates paths for all pages across all campaigns
- Supports ISR (Incremental Static Regeneration)
- Falls back to build config if Sanity is unavailable

### **Production Builds**
```bash
npm run build:domain viverlisboa.pt
```

- Only generates pages for the specific campaign domain
- Completely static - no runtime domain detection
- Optimized for SEO and performance

## 📄 Content Block Types Supported

Based on your Sanity page schema:

### **1. Hero Sections**
```javascript
{
  _type: "hero",
  title: "Page Title",
  subtitle: "Subtitle text",
  image: { /* Sanity image */ },
  ctaText: "Call to Action",
  ctaUrl: "/link"
}
```

### **2. Proposals Sections**
```javascript
{
  _type: "proposals", 
  title: "Section Title",
  proposals: [
    { _ref: "proposal-id-1" },
    { _ref: "proposal-id-2" }
  ]
}
```

### **3. Events Sections**
```javascript
{
  _type: "events",
  title: "Upcoming Events", 
  events: [
    { _ref: "event-id-1" },
    { _ref: "event-id-2" }
  ]
}
```

### **4. Rich Text Content**
- Standard Portable Text blocks
- Headings (H1-H4)
- Paragraphs, lists, blockquotes
- Inline formatting (bold, italic, links)
- Embedded images with captions

### **5. Standalone Images**
```javascript
{
  _type: "image",
  asset: { /* Sanity image */ },
  alt: "Alternative text",
  caption: "Image caption"
}
```

## 🔧 Usage Examples

### **Create Pages in Sanity**

1. **Go to Sanity Studio**: `/studio`
2. **Create a new Page**:
   - Title: "About Us"
   - Slug: "about"
   - Campaign: Select campaign (viverlisboa.pt, etc.)
   - Content: Add blocks (hero, text, proposals, etc.)

3. **SEO Setup**:
   - SEO Title: "About Us - Fighting for Lisboa"
   - SEO Description: "Learn about our mission..."
   - Keywords: ["lisboa", "política", "eleições"]
   - OG Image: Upload social sharing image

### **URL Structure**
```
viverlisboa.pt/about        ← Lisboa campaign
viveravenidas.pt/about      ← Avenidas campaign  
viveralvalade.pt/about      ← Alvalade campaign
```

### **SEO Benefits**
- Each page gets unique meta tags per domain
- Campaign-specific structured data
- Optimized OpenGraph images
- Theme colors matching campaign branding

## 📊 Performance Features

### **Static Generation**
- All pages pre-rendered at build time
- No runtime database queries
- Perfect Lighthouse scores possible

### **Image Optimization**
- Next.js Image component with automatic optimization
- WebP/AVIF format conversion
- Responsive image sizes
- Lazy loading

### **Code Splitting**
- Content renderer components only loaded when needed
- Optimized bundle sizes per domain

## 🚀 Deployment Workflow

### **1. Create Content**
```bash
# Start Sanity Studio
npm run studio

# Create pages, proposals, events for your campaigns
```

### **2. Build Specific Domain**
```bash
# Build Lisboa campaign with all its pages
npm run build:domain viverlisboa.pt

# Build includes:
# - Homepage (index.tsx) 
# - All dynamic pages ([slug].tsx)
# - Campaign-specific content
```

### **3. Deploy**
```bash
# Deploy to Vercel
npm run deploy:domain viverlisboa.pt vercel

# Deploy to Netlify
npm run deploy:domain viverlisboa.pt netlify
```

## 🐛 Troubleshooting

### **Page Not Found**
```bash
# Check if page exists for the domain
# In Sanity Studio, ensure:
# 1. Page is published
# 2. Correct campaign is selected
# 3. Slug is correct
```

### **Content Not Rendering**
```bash
# Check Sanity query in browser console
# Verify content blocks have correct _type values
# Ensure referenced proposals/events exist
```

### **SEO Issues** 
```bash
# Check page source for meta tags
# Verify OpenGraph image URLs are working
# Test with Facebook Debugger / Twitter Card Validator
```

## 🔄 Migration Notes

- Existing pages in Sanity should work automatically
- No changes needed to existing content structure
- SEO fields are optional - will use defaults if not provided
- Campaign association is required for proper domain building

## 🎉 Benefits Summary

- ✅ **SEO Optimized**: Full meta tags, structured data, social sharing
- ✅ **Performance**: Static generation, image optimization  
- ✅ **Multi-Domain**: Domain-specific builds and content
- ✅ **Flexible Content**: Rich blocks with proposals/events integration
- ✅ **Developer Friendly**: TypeScript support, clear component structure
- ✅ **Content Editor Friendly**: Visual editing in Sanity Studio

Your dynamic pages are now fully integrated with the multi-domain build system! 🚀
