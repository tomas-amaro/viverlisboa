/**
 * Build-time configuration for domain-specific builds
 * This file determines which campaign data to use based on build environment
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

// Domain configurations - these match your Sanity campaigns
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
 * Falls back to viverlisboa.pt if not specified
 */
export function getBuildConfig(): BuildConfig {
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
 * Get all available domains for build scripts
 */
export function getAllDomains(): string[] {
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
