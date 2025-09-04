export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children: unknown[];
  markDefs: unknown[];
  style: string;
}

export interface Campaign {
  _id: string;
  _type: "campaign";
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  domain: string;
  location: string;
  mainColor: string;
  secondaryColor: string;
  logo?: SanityImage;
  heroImage?: SanityImage;
  contentTypes?: {
    proposals?: boolean;
    news?: boolean;
    events?: boolean;
    customPages?: boolean;
  };
  navigationLabels?: {
    proposals?: string;
    news?: string;
    events?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  seoSettings?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
  headerContent?: {
    tagline?: string;
  };
  footerContent?: {
    description?: string;
    contactInfo?: {
      phone?: string;
      email?: string;
      address?: string;
    };
    quickLinks?: Array<{
      label?: string;
      linkType: "page" | "proposals" | "news" | "events" | "external";
      pageReference?: {
        _id: string;
        title: string;
        slug: { current: string };
      };
      externalUrl?: string;
    }>;
  };
}

// Content block types for dynamic pages
export interface HeroBlock {
  _type: "hero";
  _key: string;
  title?: string;
  subtitle?: string;
  image?: SanityImage;
  ctaText?: string;
  ctaUrl?: string;
}

export interface ProposalsBlock {
  _type: "proposals";
  _key: string;
  title?: string;
  proposals?: {
    _ref: string;
    _type: "reference";
  }[];
}

export interface EventsBlock {
  _type: "events";
  _key: string;
  title?: string;
  events?: {
    _ref: string;
    _type: "reference";
  }[];
}

export interface ImageBlock {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export type ContentBlock =
  | PortableTextBlock
  | HeroBlock
  | ProposalsBlock
  | EventsBlock
  | ImageBlock;

export interface Page {
  _id: string;
  _type: "page";
  title: string;
  slug: {
    current: string;
  };
  campaign: {
    _ref: string;
    _type: "reference";
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: SanityImage;
  };
  content: ContentBlock[];
}

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: {
    current: string;
  };
  campaign: {
    _ref: string;
    _type: "reference";
  };
  publishedAt: string;
  excerpt?: string;
  featuredImage?: SanityImage;
  content: PortableTextBlock[];
  categories?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: SanityImage;
  };
}

export interface Event {
  eventType: string;
  _id: string;
  _type: "event";
  title: string;
  slug: {
    current: string;
  };
  campaign: {
    _ref: string;
    _type: "reference";
  };
  date: string;
  time?: string;
  location?: string;
  description?: PortableTextBlock[];
  image?: SanityImage;
  registrationUrl?: string;
  featured?: boolean;
}

export interface Proposal {
  tags: Array<string>;
  _id: string;
  _type: "proposal";
  title: string;
  slug: {
    current: string;
  };
  campaign: {
    _ref: string;
    _type: "reference";
  };
  category: string;
  summary: string;
  content: PortableTextBlock[];
  priority: "high" | "medium" | "low";
  icon?: SanityImage;
  featured?: boolean;
}
