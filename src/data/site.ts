import type { Certification, SiteMetadata } from "../types";

export const site: SiteMetadata = {
  title: "Matias Kreder",
  description:
    "Cloud, AI, and modernization engineering blog with git-backed markdown posts, legacy writing, and syndicated dev.to articles.",
  url: "https://mkreder.com",
  devtoUsername: "mkreder",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mkreder" },
    { label: "dev.to", href: "https://dev.to/mkreder" },
    { label: "community.aws", href: "https://community.aws/@mkreder" }
  ]
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    expires: "March 2029",
    featured: true
  },
  {
    name: "AWS Certified Generative AI Developer - Professional",
    issuer: "Amazon Web Services",
    expires: "December 2028",
    featured: true
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    expires: "August 2028"
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    expires: "October 2027"
  },
  {
    name: "AWS Certified Machine Learning Engineer - Associate",
    issuer: "Amazon Web Services",
    expires: "October 2027"
  },
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    expires: "July 2027",
    featured: true
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    expires: "July 2027"
  },
  {
    name: "AWS Certification SME - Associate",
    issuer: "Amazon Web Services",
    expires: "December 2027"
  },
  {
    name: "AWS Certification SME - Foundational",
    issuer: "Amazon Web Services",
    expires: "December 2027"
  },
  {
    name: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services",
    expires: "May 2026"
  }
];
