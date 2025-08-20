# Test Data Scripts

This directory contains scripts to populate and manage test data in your Sanity dataset.

## 🌱 Seeding Test Data

The `seed-data.js` script creates comprehensive test data including:

- **3 Campaigns**: Viver Lisboa, Viver Avenidas Novas, Viver Alvalade
- **4 Proposals**: Covering habitação, transportes, ambiente, cultura
- **3 Events**: Comício, debate, arruada
- **3 Posts**: Campaign announcements and news
- **2 Pages**: About and contact pages

### Run seeding:
```bash
pnpm seed
```

### Test data includes:
- ✅ Realistic Portuguese content
- ✅ Proper relationships between documents
- ✅ Different campaign variations for multi-domain testing  
- ✅ Featured/priority flags for testing UI
- ✅ Rich content with block text formatting
- ✅ SEO metadata examples

## 🗑️ Clearing Test Data

To remove all test data:
```bash
pnpm clear-data
```

## 📋 Prerequisites

1. **Environment variables**: Ensure `.env.local` has:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token
   ```

2. **Write permissions**: Your `SANITY_API_TOKEN` must have **Editor** or **Maintainer** permissions.

3. **Images**: Test data doesn't include image assets (logos, icons). Upload images through Sanity Studio after seeding, or the components will show campaign titles as fallbacks.

## 🧪 Testing Scenarios

The test data enables testing:

- **Multi-domain setup**: Different campaigns for different domains
- **Content relationships**: Proposals/events linked to campaigns
- **UI components**: Featured items, priorities, categories
- **SEO functionality**: Pages with complete meta data
- **Rich content**: Block content with formatting

## ⚠️ Important Notes

- Test data uses predefined IDs for consistent relationships
- Running `seed` multiple times will update existing data (not duplicate)
- Always test on a development dataset first
- `clear-data` only removes test data, not your real content

## 🔄 Development Workflow

1. **Fresh start**: `pnpm clear-data && pnpm seed`
2. **Test changes**: Modify content in Sanity Studio
3. **Reset**: Run `pnpm seed` to restore original test data
4. **Clean up**: Run `pnpm clear-data` when done testing
