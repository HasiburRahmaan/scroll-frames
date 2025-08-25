import { SITE_INFORMATION } from "@/config/seo";
import { Metadata } from "next";


type GenerateMetadataProps = {
  title?: string;
  description?: string;
  canonicalURL?: string;
  openGraphImages?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  }[];
  twitterImages?: string[];
};

export const metaDataGenerator = ({
  title,
  description,
  canonicalURL,
  openGraphImages,
  twitterImages,
}: GenerateMetadataProps): Metadata => {
  const {
    metaTitle,
    metaDescription,
    url: defaultURL,
  } = SITE_INFORMATION;

  return {
    metadataBase: new URL(SITE_INFORMATION.url!),
    title: {
      default: title ?? metaTitle,
      template: `%s | ${SITE_INFORMATION.appName}`,
    },
    description: description ?? metaDescription,
    alternates: {
      canonical: canonicalURL ?? defaultURL,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title: title ?? metaTitle,
      description: description ?? metaDescription,
      url: canonicalURL ?? defaultURL,
      siteName: SITE_INFORMATION.appName,
      images: openGraphImages,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? metaTitle,
      description: description ?? metaDescription,
      images: twitterImages,
    },
    verification: {
      google: "",
    },
  };
};
