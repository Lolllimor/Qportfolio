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
