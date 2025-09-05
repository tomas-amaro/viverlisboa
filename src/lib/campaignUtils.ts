import { client } from "./sanity";
import { Campaign } from "../types/sanity";

export interface CampaignContent {
  proposalsCount: number;
  newsCount: number;
  eventsCount: number;
  customPagesCount: number;
}

export interface CampaignWithContent extends Campaign {
  contentTypes: {
    proposals: boolean;
    news: boolean;
    events: boolean;
    customPages: boolean;
  };
  navigationLabels: {
    proposals: string;
    news: string;
    events: string;
  };
  content: CampaignContent;
}

/**
 * Resolve quick link to actual URL and label
 */
export function resolveQuickLink(
  quickLink: NonNullable<
    NonNullable<Campaign["footerContent"]>["quickLinks"]
  >[0]
) {
  let url: string;
  let label: string;

  switch (quickLink.linkType) {
    case "page":
      url = quickLink.pageReference
        ? `/${quickLink.pageReference.slug.current}`
        : "#";
      label = quickLink.label || quickLink.pageReference?.title || "Página";
      break;
    case "proposals":
      url = "/propostas";
      label = quickLink.label || "Propostas";
      break;
    case "news":
      url = "/noticias";
      label = quickLink.label || "Notícias";
      break;
    case "events":
      url = "/eventos";
      label = quickLink.label || "Eventos";
      break;
    case "external":
      url = quickLink.externalUrl || "#";
      label = quickLink.label || quickLink.externalUrl || "Link Externo";
      break;
    default:
      url = "#";
      label = quickLink.label || "Link";
      break;
  }

  return { url, label, isExternal: quickLink.linkType === "external" };
}

/**
 * Get campaign by domain with content counts
 */
export async function getCampaignByDomain(
  domain: string
): Promise<CampaignWithContent | null> {
  const campaign = await client.fetch(
    `
     *[_type == "campaign" && domain == $domain][0]{
       _id,
       title,
       domain,
       location,
       contentTypes,
       navigationLabels,
       mainColor,
       secondaryColor,
       logo,
       description,
       socialMedia,
       seoSettings,
       headerContent,
       footerContent {
         description,
         contactInfo,
         quickLinks[] {
           label,
           linkType,
           pageReference-> {
             _id,
             title,
             slug
           },
           externalUrl
         }
       }
     }
   `,
    { domain }
  );

  if (!campaign) return null;

  // Provide fallback values for new schema fields
  const safeContentTypes = campaign.contentTypes || {
    proposals: true,
    news: true,
    events: true,
    customPages: false,
  };

  const safeNavigationLabels = campaign.navigationLabels || {
    proposals: "Propostas",
    news: "Notícias",
    events: "Eventos",
  };

  // Get content counts
  const [proposalsCount, newsCount, eventsCount, customPagesCount] =
    await Promise.all([
      client.fetch(`count(*[_type == "proposal" && references($campaignId)])`, {
        campaignId: campaign._id,
      }),
      client.fetch(`count(*[_type == "post" && references($campaignId)])`, {
        campaignId: campaign._id,
      }),
      client.fetch(`count(*[_type == "event" && references($campaignId)])`, {
        campaignId: campaign._id,
      }),
      client.fetch(
        `count(*[_type == "page" && references($campaignId) && showInNavigation == true])`,
        { campaignId: campaign._id }
      ),
    ]);

  return {
    ...campaign,
    contentTypes: safeContentTypes,
    navigationLabels: safeNavigationLabels,
    content: {
      proposalsCount,
      newsCount,
      eventsCount,
      customPagesCount,
    },
  };
}

/**
 * Get campaign content filtered by campaign ID
 */
export async function getCampaignProposals(campaignId: string, limit = 10) {
  return client.fetch(
    `
    *[_type == "proposal" && references($campaignId)] | order(priority asc, title asc) [0...$limit]{
      _id,
      title,
      slug,
      summary,
      category,
      priority,
      featured,
      tags,
      content[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            _ref,
            _type,
            url
          }
        }
      },
      icon{
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `,
    { campaignId, limit }
  );
}

export async function getCampaignNews(campaignId: string, limit = 10) {
  return client.fetch(
    `
    *[_type == "post" && references($campaignId)] | order(publishedAt desc) [0...$limit]{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      categories,
      content[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            _ref,
            _type,
            url
          }
        }
      }
    }
  `,
    { campaignId, limit }
  );
}

export async function getCampaignEvents(campaignId: string, limit = 10) {
  return client.fetch(
    `
    *[_type == "event" && references($campaignId)] | order(date asc) [0...$limit]{
      _id,
      title,
      slug,
      date,
      time,
      location,
      eventType,
      featured,
      image{
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `,
    { campaignId, limit }
  );
}

export async function getCampaignCustomPages(campaignId: string) {
  return client.fetch(
    `
    *[_type == "page" && references($campaignId) && showInNavigation == true] | order(navigationOrder asc, title asc){
      _id,
      title,
      slug,
      navigationLabel,
      navigationOrder
    }
  `,
    { campaignId }
  );
}

/**
 * Generate navigation items for a campaign
 */
export async function getCampaignNavigation(campaign: CampaignWithContent) {
  const navItems: Array<{ href: string; label: string; count?: number }> = [
    { href: "/", label: "Início" },
  ];

  // Ensure contentTypes and navigationLabels exist with fallbacks
  const contentTypes = campaign.contentTypes || {
    proposals: true,
    news: true,
    events: true,
    customPages: false,
  };

  const navigationLabels = campaign.navigationLabels || {
    proposals: "Propostas",
    news: "Notícias",
    events: "Eventos",
  };

  // Add content-based navigation
  if (contentTypes.proposals && campaign.content.proposalsCount > 0) {
    navItems.push({
      href: "/propostas",
      label: navigationLabels.proposals,
      count: campaign.content.proposalsCount,
    });
  }

  if (contentTypes.news && campaign.content.newsCount > 0) {
    navItems.push({
      href: "/noticias",
      label: navigationLabels.news,
      count: campaign.content.newsCount,
    });
  }

  if (contentTypes.events && campaign.content.eventsCount > 0) {
    navItems.push({
      href: "/eventos",
      label: navigationLabels.events,
      count: campaign.content.eventsCount,
    });
  }

  // Add custom pages
  if (contentTypes.customPages && campaign.content.customPagesCount > 0) {
    const customPages = await getCampaignCustomPages(campaign._id);
    customPages.forEach(
      (page: {
        slug: { current: string };
        title: string;
        navigationLabel?: string;
      }) => {
        navItems.push({
          href: `/${page.slug.current}`,
          label: page.navigationLabel || page.title,
        });
      }
    );
  }

  return navItems;
}

/**
 * Check if a content type should generate pages
 */
export function shouldGeneratePages(
  campaign: CampaignWithContent,
  contentType: keyof CampaignContent
): boolean {
  const contentTypeMapping = {
    proposalsCount: "proposals",
    newsCount: "news",
    eventsCount: "events",
    customPagesCount: "customPages",
  } as const;

  // Provide fallback for contentTypes
  const contentTypes = campaign.contentTypes || {
    proposals: true,
    news: true,
    events: true,
    customPages: false,
  };

  const configKey = contentTypeMapping[contentType];
  return contentTypes[configKey] && campaign.content[contentType] > 0;
}

/**
 * Get build configuration for the current domain
 */
export async function getBuildConfiguration() {
  // Try to get domain from environment variables, with fallback to default
  const domain =
    process.env.CAMPAIGN_DOMAIN ||
    process.env.DEV_CAMPAIGN_DOMAIN ||
    "viveravenidas.pt"; // Default development domain

  console.log(`Using campaign domain: ${domain}`);

  const campaign = await getCampaignByDomain(domain);

  if (!campaign) {
    console.warn(
      `Campaign not found for domain: ${domain}. Creating fallback configuration.`
    );

    // Return a fallback configuration for development
    const fallbackCampaign: CampaignWithContent = {
      _id: "fallback-campaign",
      _type: "campaign",
      title: "Viver Avenidas",
      slug: { current: "viver-avenidas" },
      domain: domain,
      location: "Avenidas Novas",
      mainColor: "#48B9CA",
      secondaryColor: "#FF394C",
      description: "Uma coligação de esquerda para as Avenidas Novas",
      socialMedia: {
        facebook: "https://facebook.com/viveravenidas",
        instagram: "https://instagram.com/viveravenidas",
        twitter: "https://twitter.com/viveravenidas",
      },
      contentTypes: {
        proposals: true,
        news: true,
        events: true,
        customPages: false,
      },
      navigationLabels: {
        proposals: "Propostas",
        news: "Notícias",
        events: "Eventos",
      },
      headerContent: {
        tagline: "Juntos por uma cidade mais justa",
      },
      footerContent: {
        description:
          "Uma coligação de esquerda comprometida com a transformação social e ambiental das Avenidas Novas.",
        contactInfo: {
          phone: "+351 XXX XXX XXX",
          email: `geral@${domain}`,
          address: "Avenidas Novas, Lisboa",
        },
        quickLinks: [
          { linkType: "proposals" },
          { linkType: "events" },
          { linkType: "news" },
          {
            label: "Como Apoiar",
            linkType: "external",
            externalUrl: "/apoiar",
          },
        ],
      },
      content: {
        proposalsCount: 0,
        newsCount: 0,
        eventsCount: 0,
        customPagesCount: 0,
      },
    };

    return {
      campaign: fallbackCampaign,
      navigation: await getCampaignNavigation(fallbackCampaign),
      shouldGenerate: {
        proposals: false, // No content yet
        news: false,
        events: false,
        customPages: false,
      },
    };
  }

  return {
    campaign,
    navigation: await getCampaignNavigation(campaign),
    shouldGenerate: {
      proposals: shouldGeneratePages(campaign, "proposalsCount"),
      news: shouldGeneratePages(campaign, "newsCount"),
      events: shouldGeneratePages(campaign, "eventsCount"),
      customPages: shouldGeneratePages(campaign, "customPagesCount"),
    },
  };
}
