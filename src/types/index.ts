export interface CaseStudy {
  specialImageRender?: boolean;
  imageContainerClass?: string;
  reverseLayout?: boolean;
  description: string;
  imageClass?: string;
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  title: string;
  year: string;
  role: string;
  url?: string;
}
export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export interface ScreenItem {
  imageSrc: string;
  imageAlt: string;
  title: string;
  date: string;
}

export interface Artwork {
  id: number;
  documentId: string;
  Title: string;
  Year: number;
  Collection: string;
  BoughtBy: null;
  Date: string;
  Price: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  tags: string[];
  art: Art;
}

export interface Art {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Formats {
  thumbnail: Small;
  small: Small;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Tag {
  id: number;
  documentId: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
