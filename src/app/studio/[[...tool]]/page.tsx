/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { Suspense } from 'react'
import StudioClient from '../StudioClient'

// Required for static export builds
export async function generateStaticParams() {
  // Generate one static route for the studio page
  return [{ tool: [] }]
}

// Check if this is a static build
const isStaticBuild = process.env.NEXT_BUILD_TYPE === 'static'

export default function StudioPage() {
  // For static builds, show a redirect message instead of the studio
  if (isStaticBuild) {
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
        <h1>Sanity Studio</h1>
        <p>The studio is available at the hosted version:</p>
        <a 
          href="https://viverlisboa.sanity.studio" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: '#0066cc', 
            textDecoration: 'underline',
            fontSize: '1.1em',
            fontWeight: 'bold'
          }}
        >
          🎯 Access Studio →
        </a>
      </div>
    )
  }

  // For development, return the client studio component
  return (
    <Suspense 
      fallback={
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <p>Loading Studio...</p>
        </div>
      }
    >
      <StudioClient />
    </Suspense>
  )
}
