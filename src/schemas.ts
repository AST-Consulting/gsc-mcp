import { z } from "zod";

export const GSCBaseSchema = z.object({
  siteUrl: z
    .string()
    .describe(
      "The site URL as defined in Search Console. Example: sc-domain:example.com (for domain resources) or http://www.example.com/ (for site prefix resources)"
    ),
});

export const SearchAnalyticsSchema = {
  siteUrl: z
    .string()
    .describe(
      "The site URL as defined in Search Console. Example: sc-domain:example.com (for domain resources) or http://www.example.com/ (for site prefix resources)"
    ),
  startDate: z.string().describe("Start date in YYYY-MM-DD format"),
  endDate: z.string().describe("End date in YYYY-MM-DD format"),
  dimensions: z
    .string()
    .transform((val) => val.split(","))
    .refine((val) =>
      val.every((d) =>
        ["query", "page", "country", "device", "searchAppearance"].includes(d)
      )
    )
    .optional()
    .describe(
      "Comma-separated list of dimensions to break down results by, such as query, page, country, device, searchAppearance"
    ),
  type: z
    .enum(["web", "image", "video", "news"])
    .optional()
    .describe("Type of search to filter by, such as web, image, video, news"),
  aggregationType: z
    .enum(["auto", "byNewsShowcasePanel", "byProperty", "byPage"])
    .optional()
    .describe(
      "Type of aggregation, such as auto, byNewsShowcasePanel, byProperty, byPage"
    ),
  rowLimit: z
    .number()
    .default(1000)
    .describe("Maximum number of rows to return"),
};

export const IndexInspectSchema = {
  inspectionUrl: z
    .string()
    .describe(
      'The fully-qualified URL to inspect. Must be under the property specified in "siteUrl"'
    ),
  languageCode: z
    .string()
    .optional()
    .default("en-US")
    .describe(
      'An IETF BCP-47 language code representing the language of the requested translated issue messages, such as "en-US" or "de-CH". Default is "en-US"'
    ),
};

export const ListSitemapsSchema = {
  sitemapIndex: z
    .string()
    .optional()
    .describe(
      "A URL of a site's sitemap index. For example: http://www.example.com/sitemapindex.xml"
    ),
  siteUrl: z
    .string()
    .optional()
    .describe(
      "The site's URL, including protocol. For example: http://www.example.com/"
    ),
};

export const GetSitemapSchema = {
  feedpath: z
    .string()
    .optional()
    .describe(
      "The URL of the actual sitemap. For example: http://www.example.com/sitemap.xml"
    ),
  siteUrl: z
    .string()
    .optional()
    .describe(
      "The site's URL, including protocol. For example: http://www.example.com/"
    ),
};

export const SubmitSitemapSchema = {
  feedpath: z
    .string()
    .describe(
      "The URL of the sitemap to add. For example: http://www.example.com/sitemap.xml"
    ),
  siteUrl: z
    .string()
    .describe(
      "The site's URL, including protocol. For example: http://www.example.com/"
    ),
};
