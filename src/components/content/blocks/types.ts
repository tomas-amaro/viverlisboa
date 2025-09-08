import { PortableTextBlock } from "@portabletext/types";
import { CampaignWithContent } from "@/lib/campaignUtils";
import { Proposal } from "@/types/sanity";

// Base block interface
export interface BaseBlock {
  _type: string;
  _key: string;
}

// Hero Block
export interface HeroBlockProps extends BaseBlock {
  _type: "heroBlock";
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  ctaButton?: {
    text: string;
    url: string;
    style: "primary" | "secondary" | "outline";
  };
  height: "sm" | "md" | "lg" | "xl";
}

// Text Block
export interface TextBlockProps extends BaseBlock {
  _type: "textBlock";
  title?: string;
  content: PortableTextBlock[];
  alignment: "left" | "center" | "right";
  backgroundColor:
    | "transparent"
    | "white"
    | "gray-light"
    | "primary"
    | "secondary";
}

// Image Block
export interface ImageBlockProps extends BaseBlock {
  _type: "imageBlock";
  image: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
    caption?: string;
  };
  size: "small" | "medium" | "large" | "full";
  alignment: "left" | "center" | "right";
}

// Gallery Block
export interface GalleryBlockProps extends BaseBlock {
  _type: "galleryBlock";
  title?: string;
  images: Array<{
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
    caption?: string;
  }>;
  layout: "grid-2" | "grid-3" | "grid-4" | "carousel";
}

// CTA Block
export interface CtaBlockProps extends BaseBlock {
  _type: "ctaBlock";
  title: string;
  description?: string;
  buttons: Array<{
    text: string;
    url: string;
    style: "primary" | "secondary" | "outline";
  }>;
  backgroundColor: "primary" | "secondary" | "gradient" | "white";
}

// Video Block
export interface VideoBlockProps extends BaseBlock {
  _type: "videoBlock";
  title?: string;
  videoUrl: string;
  thumbnail?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  aspectRatio: "16:9" | "4:3" | "1:1";
}

// Proposals Showcase Block
export interface ProposalsShowcaseBlockProps extends BaseBlock {
  _type: "proposalsShowcaseBlock";
  title?: string;
  description?: string;
  proposals: Proposal[];
  showCategoryFilter: boolean;
  layout: "grid" | "list" | "carousel";
}

// Spacer Block
export interface SpacerBlockProps extends BaseBlock {
  _type: "spacerBlock";
  height: "sm" | "md" | "lg" | "xl";
}

// Union type for all content blocks
export type ContentBlock =
  | HeroBlockProps
  | TextBlockProps
  | ImageBlockProps
  | GalleryBlockProps
  | CtaBlockProps
  | VideoBlockProps
  | ProposalsShowcaseBlockProps
  | SpacerBlockProps;

// Common props for all block components
export interface BlockComponentProps {
  campaign: CampaignWithContent;
}
