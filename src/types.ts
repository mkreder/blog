export type SiteLink = {
  label: string;
  href: string;
};

export type SiteMetadata = {
  title: string;
  description: string;
  url: string;
  devtoUsername: string;
  links: SiteLink[];
};

export type ExternalPost = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  tags: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  expires: string;
  featured?: boolean;
  credlyUrl?: string;
};

export type TalkEntry = {
  date: string;
  title: string;
  summary: string;
  topic: string;
  activityType: string;
  deliveryMode: "Online" | "In Person";
  url: string;
  language: string;
  location: string;
  featured?: boolean;
  sourceLabel?: string;
};
