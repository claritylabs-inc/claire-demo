import type { MetadataRoute } from "next";
import dayjs from "dayjs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://claritylabs.inc",
      lastModified: dayjs().toDate(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
