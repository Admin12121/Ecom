import { Metadata } from "next";
import { FooterItem } from "@/types/type";

export const siteConfig = {
  title: "Nepal Heritage Handicraft",
  name: "Heritage Craft",
  shortName: "NHH",
  url: "https://ecom.biki.com.np",
  ogImage: "https://ecom.biki.com.np/og.jpg",
  description:
    "Authentic Nepalese art, sculptures, and handicrafts for cultural enthusiasts.",
  links: {
    instagram: "https://www.instagram.com/nepalheritagehandicraft/",
  },
  footerNav: [
    {
      title: "Product",
      items: [
        {
          title: "Status",
          href: "https://onestopshop.jackblatch.com",
          external: true,
        },
        {
          title: "Stupas",
          href: "https://acme-corp.jumr.dev",
          external: true,
        },
        {
          title: "Paintings",
          href: "https://craft.mxkaske.dev",
          external: true,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Contacts",
          href: "/contacts",
          external: false,
        },
        {
          title: "FAQ",
          href: "/faq",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Instagram",
          href: "https://www.instagram.com/nepalheritagehandicraft/",
          external: true,
        },
        {
          title: "Facebook",
          href: "https://www.facebook.com/profile.php?id=61556557202990%",
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXTAUTH_URL}/${path}`;
}

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  keywords = [],
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  const baseKeywords = [
    "Nepalese handicrafts",
    "Traditional art",
    "Cultural sculptures",
    "Nepal art store",
    "Handmade crafts",
    "Next.js",
    "Tailwind CSS",
    "E-commerce platform",
  ];

  const baseUrl = process.env.NEXTAUTH_URL || siteConfig.url;
  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - Authentic Nepalese Handicrafts`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@vicky_tajpuriya",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(baseUrl),
    authors: [
      {
        name: "vikcy",
        url: "https://twitter.com/vicky_tajpuriya",
      },
    ],
    creator: "vicky",
    robots: "index, follow",
    ...props,
  };
}
