import React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { Typography } from './Typography'
import { CampaignWithContent } from '@/lib/campaignUtils'
import { urlFor } from '@/lib/sanity'

// Type definitions for component props
interface CodeValue {
  language?: string
  code: string
}

interface ImageValue {
  asset?: {
    _ref: string
    _type: string
  }
  alt?: string
  caption?: string
}

interface VideoValue {
  url: string
}

interface CallToActionValue {
  title?: string
  text?: string
  buttonText?: string
  buttonUrl?: string
  external?: boolean
}

interface LinkValue {
  href: string
}

interface InternalLinkValue {
  slug?: { current: string }
}

interface PortableTextRendererProps {
  content: PortableTextBlock[]
  campaign: CampaignWithContent
}

export const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ 
  content, 
  campaign 
}) => {
  const components: PortableTextComponents = {
    types: {
      // Code blocks
      code: ({ value }: { value?: CodeValue }) => (
        <pre style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          padding: '1rem',
          borderRadius: '8px',
          overflow: 'auto',
          margin: '1.5rem 0',
          fontSize: '0.9rem',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", consolas, "source-code-pro", monospace'
        }}>
          <code data-language={value?.language || 'text'}>
            {value?.code || ''}
          </code>
        </pre>
      ),
      
      // Images
      image: ({ value }: { value?: ImageValue }) => {
        if (!value?.asset) return null
        
        return (
          <figure style={{ margin: '2rem 0' }}>
            <img 
              src={urlFor(value.asset).width(800).height(600).fit('max').auto('format').url()} 
              alt={value?.alt || ''} 
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }} 
            />
            {value?.caption && (
              <figcaption style={{
                textAlign: 'center',
                fontSize: '0.875rem',
                color: '#6b7280',
                marginTop: '0.5rem',
                fontStyle: 'italic'
              }}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },

      // Video embeds
      video: ({ value }: { value?: VideoValue }) => (
        <div style={{ 
          margin: '2rem 0',
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden'
        }}>
          <iframe
            src={value?.url || ''}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px'
            }}
            allowFullScreen
          />
        </div>
      ),

      // Call-to-action blocks
      callToAction: ({ value }: { value?: CallToActionValue }) => (
        <div style={{
          background: `linear-gradient(135deg, ${campaign.mainColor || '#48B9CA'}10, ${campaign.secondaryColor || '#FF394C'}10)`,
          border: `2px solid ${campaign.mainColor || '#48B9CA'}`,
          borderRadius: '12px',
          padding: '2rem',
          margin: '2rem 0',
          textAlign: 'center'
        }}>
          {value?.title && (
            <Typography variant="h3" margin={true}>
              {value.title}
            </Typography>
          )}
          {value?.text && (
            <Typography variant="body1" margin={true}>
              {value.text}
            </Typography>
          )}
          {value?.buttonText && value?.buttonUrl && (
            <a
              href={value.buttonUrl}
              style={{
                display: 'inline-block',
                background: campaign.mainColor || '#48B9CA',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 500,
                marginTop: '1rem',
                transition: 'all 0.2s ease'
              }}
              target={value?.external ? '_blank' : undefined}
              rel={value?.external ? 'noopener noreferrer' : undefined}
            >
              {value.buttonText}
            </a>
          )}
        </div>
      )
    },

    block: {
      // Headings
      h1: ({ children }: { children?: React.ReactNode }) => (
        <div style={{ 
          borderBottom: `2px solid ${campaign.mainColor || '#48B9CA'}`,
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <Typography variant="h1" margin={true}>
            {children}
          </Typography>
        </div>
      ),
      h2: ({ children }: { children?: React.ReactNode }) => (
        <div style={{ 
          color: campaign.mainColor || '#48B9CA',
          marginTop: '2rem'
        }}>
          <Typography variant="h2" margin={true}>
            {children}
          </Typography>
        </div>
      ),
      h3: ({ children }: { children?: React.ReactNode }) => (
        <div style={{ marginTop: '1.5rem' }}>
          <Typography variant="h3" margin={true}>
            {children}
          </Typography>
        </div>
      ),
      h4: ({ children }: { children?: React.ReactNode }) => (
        <Typography variant="h4" margin={true}>
          {children}
        </Typography>
      ),

      // Regular paragraphs
      normal: ({ children }: { children?: React.ReactNode }) => (
        <div style={{ 
          lineHeight: '1.7',
          marginBottom: '1.25rem'
        }}>
          <Typography variant="body1" margin={true}>
            {children}
          </Typography>
        </div>
      ),

      // Blockquotes
      blockquote: ({ children }: { children?: React.ReactNode }) => (
        <blockquote style={{
          borderLeft: `4px solid ${campaign.mainColor || '#48B9CA'}`,
          paddingLeft: '1.5rem',
          margin: '2rem 0',
          fontStyle: 'italic',
          fontSize: '1.1rem',
          color: '#4b5563',
          background: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0 8px 8px 0'
        }}>
          {children}
        </blockquote>
      )
    },

    marks: {
      // Text formatting
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong style={{ fontWeight: 600, color: campaign.mainColor || '#48B9CA' }}>
          {children}
        </strong>
      ),
      em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
      underline: ({ children }: { children?: React.ReactNode }) => <u>{children}</u>,
      
      // Links
      link: ({ value, children }: { value?: LinkValue; children?: React.ReactNode }) => (
        <a 
          href={value?.href || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: campaign.mainColor || '#48B9CA',
            textDecoration: 'underline',
            fontWeight: 500,
            transition: 'color 0.2s ease'
          }}
        >
          {children}
        </a>
      ),

      // Internal links
      internalLink: ({ value, children }: { value?: InternalLinkValue; children?: React.ReactNode }) => (
        <a 
          href={value?.slug ? `/${value.slug.current}` : '#'}
          style={{ 
            color: campaign.mainColor || '#48B9CA',
            textDecoration: 'underline',
            fontWeight: 500
          }}
        >
          {children}
        </a>
      ),

      // Highlighted text
      highlight: ({ children }: { children?: React.ReactNode }) => (
        <mark style={{ 
          background: `${campaign.secondaryColor || '#FF394C'}20`,
          padding: '0.1rem 0.25rem',
          borderRadius: '3px'
        }}>
          {children}
        </mark>
      )
    },

    list: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <ul style={{ 
          margin: '1.5rem 0', 
          paddingLeft: '2rem',
          lineHeight: '1.6'
        }}>
          {children}
        </ul>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <ol style={{ 
          margin: '1.5rem 0', 
          paddingLeft: '2rem',
          lineHeight: '1.6'
        }}>
          {children}
        </ol>
      )
    },

    listItem: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <li style={{ 
          marginBottom: '0.75rem',
          paddingLeft: '0.5rem'
        }}>
          {children}
        </li>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <li style={{ 
          marginBottom: '0.75rem',
          paddingLeft: '0.5rem'
        }}>
          {children}
        </li>
      )
    }
  }

  if (!content || content.length === 0) {
    return null
  }

  return (
    <div style={{ 
      fontSize: '1rem',
      lineHeight: '1.7',
      color: '#374151'
    }}>
      <PortableText 
        value={content} 
        components={components} 
      />
    </div>
  )
}
