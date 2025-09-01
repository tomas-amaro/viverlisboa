'use client'

import React from 'react'

// Dynamic Studio component that loads dynamically (only for development)
export default function StudioClient() {
  const [StudioComponent, setStudioComponent] = React.useState<React.ComponentType<{ config: unknown }> | null>(null)
  const [config, setConfig] = React.useState<unknown>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function loadStudio() {
      try {
        // Dynamic imports to avoid bundling during static builds
        const { NextStudio } = await import('next-sanity/studio')
        const sanityConfig = await import('../../../sanity.config')
        
        setStudioComponent(NextStudio as React.ComponentType<{ config: unknown }>)
        setConfig(sanityConfig.default || sanityConfig)
        setLoading(false)
      } catch (err) {
        console.error('Failed to load Sanity Studio:', err)
        setError('Failed to load studio')
        setLoading(false)
      }
    }

    loadStudio()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <p>Loading Studio...</p>
      </div>
    )
  }

  if (error || !StudioComponent) {
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
        <h1>Studio Error</h1>
        <p>Failed to load Sanity Studio. Please use the hosted version:</p>
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

  return <StudioComponent config={config} />
}
