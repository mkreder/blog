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
    featured: true,
    credlyUrl: "https://www.credly.com/badges/37c37345-8077-4286-a071-d3b7fc00cf7f"
  },
  {
    name: "AWS Certified Generative AI Developer - Professional",
    issuer: "Amazon Web Services",
    expires: "December 2028",
    featured: true,
    credlyUrl: "https://www.credly.com/badges/6c9ab690-5aba-4a23-9133-96b60306c311"
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    expires: "March 2029",
    credlyUrl: "https://www.credly.com/badges/1f2af496-f865-447e-ab54-cf14a7bd3518"
  },
  {
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    expires: "December 2028",
    credlyUrl: "https://www.credly.com/badges/f23cb022-f453-4402-8f45-8687f9534e44"
  },
  {
    name: "AWS Certified Machine Learning Engineer - Associate",
    issuer: "Amazon Web Services",
    expires: "December 2028",
    credlyUrl: "https://www.credly.com/badges/5274fe47-1d8e-4573-a3e5-7b62589ca912"
  },
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    expires: "July 2027",
    featured: true,
    credlyUrl: "https://www.credly.com/badges/26028fed-c985-4cf6-b6f0-be96ebe018ec"
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    expires: "July 2027",
    credlyUrl: "https://www.credly.com/badges/29f58b77-cd8d-4a05-a834-1c97136bf155"
  },
  {
    name: "AWS Certification SME - Associate",
    issuer: "Amazon Web Services",
    expires: "December 2027",
    credlyUrl: "https://www.credly.com/badges/d3645b27-a469-424a-af5c-2bb5132146ff"
  },
  {
    name: "AWS Certification SME - Foundational",
    issuer: "Amazon Web Services",
    expires: "December 2027",
    credlyUrl: "https://www.credly.com/badges/3e878394-d25f-48b2-833c-594da7659768"
  },
  {
    name: "AWS Certified Machine Learning - Specialty",
    issuer: "Amazon Web Services",
    expires: "May 2026",
    credlyUrl: "https://www.credly.com/badges/dbd31e47-3270-47f0-a4a8-6336de557759"
  }
];
