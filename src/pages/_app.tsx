import type { AppProps } from 'next/app'
import { Layout } from '@/components/layout'
import { Campaign } from '@/types/sanity'

interface NavigationItem {
  href: string
  label: string
  count?: number
}

function MyApp({ Component, pageProps }: AppProps) {
  // Prefer build-time static props from each page
  const campaignFromPage = (pageProps as unknown as { campaign?: Campaign }).campaign
  const navigationFromPage = (pageProps as unknown as { navigation?: NavigationItem[] }).navigation

  // Sanity is required: if a page does not provide campaign, render an error
  if (!campaignFromPage) {
    return <div>Missing campaign data. Ensure Sanity getStaticProps provides it.</div>
  }

  const campaignToUse = campaignFromPage
  const navigationToUse = navigationFromPage // Header has its own default when undefined

  return (
    <Layout campaign={campaignToUse} navigation={navigationToUse}>
      <Component {...pageProps} campaign={campaignToUse} />
    </Layout>
  )
}

export default MyApp
