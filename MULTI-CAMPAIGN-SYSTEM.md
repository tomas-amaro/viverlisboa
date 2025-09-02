# 🗳️ Multi-Campaign System Guide

This political campaign website supports multiple isolated campaigns with conditional content generation and dynamic navigation. Each campaign can have its own content types, branding, and navigation structure.

## 📊 **Current Sample Data**

### **Campaign: Viver Avenidas**
- **Domain**: `viveravenidas.pt`
- **Content Created**:
  - ✅ **8 Proposals** covering all categories (habitação, transportes, ambiente, cultura, educação, saúde, economia, participação)
  - ✅ **6 Events** with different types (comício, debate, arruada, conferência, apresentação, encontro)  
  - ✅ **6 News Posts** with various categories (campanha, propostas, comunicados, imprensa, eventos)
  - ✅ **3 Custom Pages** (Equipa, Apoiar, Programa Completo)
- **Features Enabled**: All content types active, custom pages enabled
- **Navigation**: Dynamic menu showing only active content with counts

---

## 🏗️ **System Architecture**

### **1. Campaign-Based Content Isolation**
```typescript
// Each campaign gets its own isolated content
Campaign {
  domain: "viveravenidas.pt"
  contentTypes: {
    proposals: true      // Enable/disable proposals
    news: true          // Enable/disable news  
    events: true        // Enable/disable events
    customPages: true   // Enable/disable custom pages
  }
  navigationLabels: {
    proposals: "Propostas"  // Customize menu labels
    news: "Notícias"       
    events: "Eventos"      
  }
}
```

### **2. Conditional Page Generation**
Pages are only generated if:
- Campaign has the content type **enabled** (`contentTypes.proposals: true`)
- Campaign has **actual content** of that type (`proposalsCount > 0`)

### **3. Dynamic Navigation**  
Navigation menu automatically adapts based on:
- Available content types
- Content count per type
- Custom page visibility settings
- Campaign-specific labels

---

## 🚀 **Getting Started**

### **1. Environment Setup**
```bash
# Set campaign domain (required)
export DEV_CAMPAIGN_DOMAIN=viveravenidas.pt

# Or for production builds
export CAMPAIGN_DOMAIN=viveravenidas.pt
```

### **2. Initialize Sample Data**
```bash
# Create comprehensive sample content
node scripts/create-default-campaign.js
```

### **3. Start Development**
```bash
pnpm dev
```

### **4. Access Your Campaign**
- **Website**: `http://localhost:3000`
- **Sanity Studio**: `http://localhost:3000/studio`

---

## 📋 **Content Management**

### **Adding a New Campaign**

1. **Create Campaign in Sanity Studio**
   ```javascript
   {
     title: "Viver Lisboa",
     domain: "viverlisboa.pt", 
     contentTypes: {
       proposals: true,
       news: false,        // This campaign doesn't use news
       events: true,
       customPages: false
     },
     navigationLabels: {
       proposals: "Programa",  // Custom label
       events: "Agenda"       // Custom label
     }
   }
   ```

2. **Build for New Campaign**
   ```bash
   export CAMPAIGN_DOMAIN=viverlisboa.pt
   pnpm build
   ```

### **Content Types Overview**

| Content Type | Purpose | Generated Pages |
|--------------|---------|----------------|
| **Proposals** | Political proposals/program | `/propostas`, `/propostas/[slug]` |
| **News** | Campaign news/updates | `/noticias`, `/noticias/[slug]` |
| **Events** | Campaign events/agenda | `/eventos`, `/eventos/[slug]` |
| **Custom Pages** | Additional pages | `/[slug]` (based on slug) |

### **Managing Content per Campaign**

**In Sanity Studio:**
1. Go to "📋 Campanhas"
2. Select your campaign
3. Use "Conteúdo da Campanha" view to see campaign-specific content
4. All content is automatically filtered by campaign

---

## 🎨 **Customization**

### **Campaign Branding**
```javascript
// In campaign document
{
  mainColor: "#48B9CA",      // Primary brand color
  secondaryColor: "#FF394C", // Secondary brand color
  logo: { /* image object */ },
  socialMedia: {
    facebook: "https://...",
    instagram: "https://...",
    twitter: "https://..."
  }
}
```

### **Content Type Configuration**
```javascript
// Enable/disable entire content types
contentTypes: {
  proposals: false,  // ❌ Disables proposals completely
  news: true,       // ✅ Enables news (if content exists)
  events: true,     // ✅ Enables events (if content exists)
  customPages: false // ❌ Disables custom pages
}
```

### **Navigation Customization**
```javascript
// Customize navigation labels per campaign
navigationLabels: {
  proposals: "Programa",      // Instead of "Propostas"
  news: "Atualizações",      // Instead of "Notícias"
  events: "Agenda"           // Instead of "Eventos"
}
```

---

## 🔧 **Development Features**

### **Smart Fallbacks**
- If no campaign found → Creates fallback campaign
- If missing schema fields → Uses safe defaults
- If no content → Shows "Em breve" message

### **Error Handling**
- Graceful campaign loading failures
- Content count validation
- Navigation item filtering
- Build-time domain validation

### **SEO Optimization**
- Campaign-specific meta tags
- Dynamic page titles
- Social media optimization
- Structured data per campaign

---

## 📖 **Available Routes**

### **Static Routes** (Always Available)
- `/` - Homepage with campaign content
- `/contacto` - Contact page  
- `/studio` - Sanity CMS (development only)

### **Dynamic Routes** (Conditional)
- `/propostas` - Proposals list (if enabled + content exists)
- `/propostas/[slug]` - Individual proposal
- `/noticias` - News list (if enabled + content exists)  
- `/noticias/[slug]` - Individual news article
- `/eventos` - Events list (if enabled + content exists)
- `/eventos/[slug]` - Individual event
- `/[slug]` - Custom pages (if enabled + page exists)

---

## 🎯 **Example Campaigns**

### **Comprehensive Campaign**
```javascript
// Uses everything
{
  title: "Viver Avenidas",
  domain: "viveravenidas.pt",
  contentTypes: { proposals: true, news: true, events: true, customPages: true },
  // Navigation: Início | Propostas (8) | Notícias (6) | Eventos (6) | Equipa | Apoiar | Contacto
}
```

### **Simple Campaign**  
```javascript
// Minimal setup
{
  title: "Viver Benfica", 
  domain: "viverbenfica.pt",
  contentTypes: { proposals: true, news: false, events: true, customPages: false },
  // Navigation: Início | Propostas | Eventos | Contacto
}
```

### **Program-Only Campaign**
```javascript
// Just proposals
{
  title: "Viver Cascais",
  domain: "vivercascais.pt", 
  contentTypes: { proposals: true, news: false, events: false, customPages: false },
  navigationLabels: { proposals: "Programa" },
  // Navigation: Início | Programa | Contacto
}
```

---

## 🚢 **Deployment**

### **Single Campaign Build**
```bash
# Build for specific campaign
export CAMPAIGN_DOMAIN=viveravenidas.pt
pnpm build

# Deploy to campaign-specific subdomain/domain
# viveravenidas.pt → contains only Viver Avenidas content
```

### **Multi-Domain Strategy**
1. **Separate Builds**: Each campaign gets its own optimized build
2. **Domain Routing**: Different domains point to different builds  
3. **Content Isolation**: Each build contains only relevant content
4. **Independent Deployments**: Campaigns can be updated separately

---

## 🔍 **Troubleshooting**

### **Common Issues**

**"Campaign not found" Error**
```bash
# Set environment variable
export DEV_CAMPAIGN_DOMAIN=viveravenidas.pt
```

**"No content available" Message**
```bash
# Run sample data script
node scripts/create-default-campaign.js
```

**Navigation not showing content**
- Check if content type is enabled in campaign
- Verify content actually exists in Sanity
- Confirm content is linked to correct campaign

**Build fails with static export**
- Ensure all used content types have at least one item
- Check that campaign exists for the specified domain
- Verify all referenced images/assets exist

---

## 📞 **Support**

For questions about this multi-campaign system:
1. Check this documentation
2. Review the sample data structure in Sanity
3. Examine the generated pages for examples
4. Check the console for helpful debug messages

The system is designed to be robust with helpful fallbacks and clear error messages to guide development.
