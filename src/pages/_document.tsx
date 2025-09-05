import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="pt-PT">
        <Head>
          {/* Preload critical fonts */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
            as="style"
            onLoad={(e) => {
              const el = e.currentTarget as HTMLLinkElement;
              el.onload = null;
              el.rel = 'stylesheet';
            }}
          />
          <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
              rel="stylesheet"
            />
          </noscript>
          
          {/* DNS prefetch for external domains */}
          <link rel="dns-prefetch" href="//cdn.sanity.io" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          
          {/* Favicon and icons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/assets/favicon/site.webmanifest" />
          <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
          
          {/* Basic meta tags */}
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          
          {/* Security headers */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
          
          {/* PWA support - would be customized per campaign */}
          <meta name="application-name" content="Viver Lisboa" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Viver Lisboa" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          
          {/* Microsoft tiles */}
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#48B9CA" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#48B9CA" />
          
          {/* Fallback meta description */}
          <meta 
            name="description" 
            content="Coligação de esquerda para uma Lisboa mais justa, sustentável e democrática. PS, Livre, BE e PAN unidos por uma cidade melhor." 
          />
          
          {/* Robots meta */}
          <meta name="robots" content="index,follow" />
          <meta name="googlebot" content="index,follow" />
          
          {/* Language and locale */}
          <meta httpEquiv="content-language" content="pt-PT" />
          
          {/* Verification tags - would be set per campaign */}
          {/* <meta name="google-site-verification" content="your-verification-code" /> */}
          
          {/* Structured data for default organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Viver Lisboa",
                "url": "https://viverlisboa.pt",
                "description": "Coligação de esquerda para uma Lisboa mais justa, sustentável e democrática.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Lisboa",
                  "addressCountry": "PT"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "Atendimento ao Público",
                  "email": "geral@viverlisboa.pt"
                }
              }),
            }}
          />
        </Head>
        <body>
          {/* Skip to main content for accessibility */}
          <a href="#main-content" className="skip-link">
            Saltar para o conteúdo principal
          </a>
          
          <Main />
          <NextScript />
          
          {/* Analytics would be added here per campaign */}
          {/* Google Analytics, Facebook Pixel, etc. */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
