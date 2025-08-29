/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import React from 'react'

// Check if this is a static build
const isStaticBuild = process.env.NEXT_BUILD_TYPE === 'static'

// Only import Sanity dependencies if not in static build
let NextStudio: React.ComponentType<{ config: unknown }> | null = null
let config: unknown = null

if (!isStaticBuild) {
  try {
    // These imports will only happen in non-static builds
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { NextStudio: Studio } = require('next-sanity/studio')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const sanityConfig = require('../../../../sanity.config')
    NextStudio = Studio
    config = sanityConfig.default || sanityConfig
  } catch {
    // Ignore import errors in static builds
  }
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
  // Generate one static route for the studio page
  return [{ tool: [] }]
}

// Simple metadata that works for both static and dynamic builds
export const metadata = {
  title: isStaticBuild ? 'Studio Not Available' : 'Studio',
  description: isStaticBuild 
    ? 'Sanity Studio is not available in static builds' 
    : 'Content management studio'
}

export const viewport = {
  themeColor: '#000',
}

export default function StudioPage() {
  // Show message for static builds
  if (isStaticBuild || !NextStudio) {
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
        <p>Please access the studio through the hosted version:</p>
        <a 
          href="https://your-studio-name.sanity.studio" 
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
  
  return <NextStudio config={config} />
}
