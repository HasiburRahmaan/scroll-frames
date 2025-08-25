import { SITE_INFORMATION } from "@/config/seo";
import { get } from "./fetch";
import { metaDataGenerator } from "./generateMetadata";

type GetMetaDataProps = {
  url?: string;
  siteUrl?: string;
};

export const GetMetaData = async ({ url, siteUrl }: GetMetaDataProps) => {
  if (!url) return metaDataGenerator({});

  try {
    const response: any = await get(url);
    const { meta } = response.data || {};

    if (!meta) return metaDataGenerator({});

    const { title, description, meta_image } = meta;

    const openGraphImages = meta_image
      ? [
        {
          url: meta_image,
          alt: `Open Graph Image for ${title}`,
          width: 652,
          height: 368,
        },
      ]
      : [
        {
          url: SITE_INFORMATION.ogImage,
          width: 652,
          height: 368,
          alt: title ?? process.env.SITE_NAME,
        },
        {
          url: SITE_INFORMATION.ogImage,
          width: 1920,
          height: 1080,
          alt: title ?? process.env.SITE_NAME,
        },
      ];

    const twitterImages = meta_image
      ? [meta_image]
      : [SITE_INFORMATION.ogImage];

    return metaDataGenerator({
      title,
      description,
      canonicalURL: siteUrl,
      openGraphImages,
      twitterImages,
    });
  } catch (error) {
    return metaDataGenerator({});
  }
};
