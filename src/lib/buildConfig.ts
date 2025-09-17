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

// No local fallbacks. Sanity is required.

/**
 * Get build configuration based on CAMPAIGN_DOMAIN environment variable
 * Tries to fetch from Sanity first, falls back to hardcoded config
 */
export async function getBuildConfig(): Promise<BuildConfig> {
  const campaignDomain = process.env.CAMPAIGN_DOMAIN;
  if (!campaignDomain) {
    throw new Error("CAMPAIGN_DOMAIN env is required to build.");
  }

  const sanityConfig = await fetchCampaignFromSanity(campaignDomain);
  if (!sanityConfig) {
    throw new Error(
      `Campaign not found in Sanity for domain: ${campaignDomain}`
    );
  }

  return { campaign: sanityConfig };
}

/**
 * Synchronous version for compatibility (uses hardcoded config only)
 */
// Synchronous build config is not supported without Sanity.
export function getBuildConfigSync(): never {
  throw new Error(
    "getBuildConfigSync is disabled. Use Sanity-backed getBuildConfig at build time."
  );
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

    if (!domains || domains.length === 0) {
      throw new Error("No campaign domains found in Sanity.");
    }

    return domains;
  } catch (error) {
    throw new Error(
      `Could not fetch domains from Sanity: ${(error as Error).message}`
    );
  }
}

/**
 * Synchronous version for compatibility (uses hardcoded domains)
 */
export function getAllDomainsSync(): never {
  throw new Error(
    "getAllDomainsSync is disabled. Use Sanity-backed getAllDomains."
  );
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
// Development campaign helper removed; Sanity is required.
