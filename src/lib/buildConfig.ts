/**
 * Build-time configuration for domain-specific builds
 * This file determines which campaign data to use based on build environment
 * Now supports dynamic domain discovery from Sanity CMS
 */

export interface BuildConfig {
  campaign: {
    domain: string;
    title: string;
    slug: string;
    description: string;
    location: string;
    mainColor: string;
    secondaryColor: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
}

// Fallback domain configurations when Sanity is not available
// In production builds, the system will try to fetch from Sanity first
// These configurations should match your Sanity campaigns as fallbacks
const DOMAIN_CONFIGS: Record<string, BuildConfig["campaign"]> = {
  "viverlisboa.pt": {
    domain: "viverlisboa.pt",
    title: "Viver Lisboa",
    slug: "viver-lisboa",
    description:
      "Coligação de esquerda para uma Lisboa mais justa, sustentável e democrática.",
    location: "Lisboa",
    mainColor: "#48B9CA",
    secondaryColor: "#FF394C",
    socialMedia: {
      facebook: "https://facebook.com/viverlisboa",
      instagram: "https://instagram.com/viverlisboa",
      twitter: "https://twitter.com/viverlisboa",
    },
  },
  "viveravenidas.pt": {
    domain: "viveravenidas.pt",
    title: "Viver Avenidas Novas",
    slug: "viver-avenidas",
    description:
      "A nossa proposta para as Avenidas Novas - proximidade, inovação e qualidade de vida.",
    location: "Avenidas Novas",
    mainColor: "#48B9CA",
    secondaryColor: "#7D3C4B",
    socialMedia: {
      facebook: "https://facebook.com/viveravenidas",
      instagram: "https://instagram.com/viveravenidas",
    },
  },
  "viveralvalade.pt": {
    domain: "viveralvalade.pt",
    title: "Viver Alvalade",
    slug: "viver-alvalade",
    description:
      "Alvalade merece mais - a nossa visão para uma freguesia próxima e sustentável.",
    location: "Alvalade",
    mainColor: "#48B9CA",
    secondaryColor: "#2A5F66",
    socialMedia: {
      facebook: "https://facebook.com/viveralvalade",
      instagram: "https://instagram.com/viveralvalade",
    },
  },
};

/**
 * Get build configuration based on CAMPAIGN_DOMAIN environment variable
 * Tries to fetch from Sanity first, falls back to hardcoded config
 */
export async function getBuildConfig(): Promise<BuildConfig> {
  const campaignDomain = process.env.CAMPAIGN_DOMAIN || "viverlisboa.pt";

  // Try to fetch from Sanity first
  const sanityConfig = await fetchCampaignFromSanity(campaignDomain);
  if (sanityConfig) {
    return { campaign: sanityConfig };
  }

  // Fallback to hardcoded configuration
  const campaign = DOMAIN_CONFIGS[campaignDomain];
  if (!campaign) {
    throw new Error(
      `Unknown campaign domain: ${campaignDomain}. Available domains: ${Object.keys(DOMAIN_CONFIGS).join(", ")}`
    );
  }

  return { campaign };
}

/**
 * Synchronous version for compatibility (uses hardcoded config only)
 */
export function getBuildConfigSync(): BuildConfig {
  const campaignDomain = process.env.CAMPAIGN_DOMAIN || "viverlisboa.pt";

  const campaign = DOMAIN_CONFIGS[campaignDomain];
  if (!campaign) {
    throw new Error(
      `Unknown campaign domain: ${campaignDomain}. Available domains: ${Object.keys(DOMAIN_CONFIGS).join(", ")}`
    );
  }

  return { campaign };
}

/**
 * Fetch campaign from Sanity at build time
 */
async function fetchCampaignFromSanity(
  domain: string
): Promise<BuildConfig["campaign"] | null> {
  try {
    // Only import Sanity client in build environment
    const { createClient } = await import("@sanity/client");

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-08-20",
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
      perspective: "published",
    });

    const query = `*[_type == "campaign" && domain == $domain][0]{
      title,
      slug,
      description,
      domain,
      location,
      mainColor,
      secondaryColor,
      socialMedia
    }`;

    const campaignData = await client.fetch(query, { domain });

    if (campaignData) {
      return {
        domain: campaignData.domain,
        title: campaignData.title,
        slug:
          campaignData.slug?.current ||
          campaignData.domain.replace(".pt", "").replace(".", "-"),
        description:
          campaignData.description || `Campanha ${campaignData.title}`,
        location: campaignData.location,
        mainColor: campaignData.mainColor,
        secondaryColor: campaignData.secondaryColor,
        socialMedia: campaignData.socialMedia || {},
      };
    }

    return null;
  } catch (error) {
    console.warn(
      `⚠️  Could not fetch campaign "${domain}" from Sanity:`,
      (error as Error).message
    );
    return null;
  }
}

/**
 * Get all available domains (try Sanity first, fallback to hardcoded)
 */
export async function getAllDomains(): Promise<string[]> {
  try {
    // Try to get domains from Sanity
    const { createClient } = await import("@sanity/client");

    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-08-20",
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
      perspective: "published",
    });

    const domains = await client.fetch(
      `*[_type == "campaign" && defined(domain)].domain`
    );

    if (domains && domains.length > 0) {
      return domains;
    }
  } catch (error) {
    console.warn(
      "⚠️  Could not fetch domains from Sanity, using fallback configurations:",
      (error as Error).message
    );
  }

  // Fallback to hardcoded domains
  return Object.keys(DOMAIN_CONFIGS);
}

/**
 * Synchronous version for compatibility (uses hardcoded domains)
 */
export function getAllDomainsSync(): string[] {
  return Object.keys(DOMAIN_CONFIGS);
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * For development, allow switching campaigns via query param or default
 */
export function getDevelopmentCampaign(
  hostname?: string
): BuildConfig["campaign"] {
  // In development, try to match hostname or default to viverlisboa
  if (hostname && DOMAIN_CONFIGS[hostname]) {
    return DOMAIN_CONFIGS[hostname];
  }

  // Check if there's a dev override
  const devCampaign = process.env.DEV_CAMPAIGN_DOMAIN;
  if (devCampaign && DOMAIN_CONFIGS[devCampaign]) {
    return DOMAIN_CONFIGS[devCampaign];
  }

  // Default to Lisboa campaign
  return DOMAIN_CONFIGS["viverlisboa.pt"];
}
