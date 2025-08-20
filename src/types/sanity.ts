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
  children: any[];
  markDefs: any[];
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
  logo: SanityImage;
  heroImage?: SanityImage;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

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
  content: any[];
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
}

export interface Proposal {
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
}
