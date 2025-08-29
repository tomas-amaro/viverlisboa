/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

// Exclude studio from static export builds
export async function generateStaticParams() {
  // Return empty array to exclude studio routes from static builds
  // Studio should be hosted separately (e.g., Sanity's hosted studio)
  return []
}

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  // In production static builds, redirect to hosted studio
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_BUILD_TYPE === 'static') {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1>Studio Not Available</h1>
        <p>The Sanity Studio is not available in static builds.</p>
        <p>Please access the studio through your hosted Sanity Studio or run this locally.</p>
        <a 
          href="https://www.sanity.io/docs/deployment" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#0066cc', textDecoration: 'underline' }}
        >
          Learn about deploying Sanity Studio →
        </a>
      </div>
    )
  }
  
  return <NextStudio config={config} />
}
