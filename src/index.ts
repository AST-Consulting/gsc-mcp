import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  GetSitemapSchema,
  IndexInspectSchema,
  ListSitemapsSchema,
  SearchAnalyticsSchema,
  SubmitSitemapSchema,
} from "./schemas.js";
import { z } from "zod";
import { SearchConsoleService } from "./search-console.js";

const server = new McpServer({
  name: "googlesearchconsole_mcp",
  description:
    "Google Search Console MCP Server. Provides access to Google Search Console tools and data.",
  version: "0.1.0",
});

const GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!GOOGLE_APPLICATION_CREDENTIALS) {
  console.error(
    "GOOGLE_APPLICATION_CREDENTIALS environment variable is required"
  );
  process.exit(1);
}

const searchConsole = new SearchConsoleService(GOOGLE_APPLICATION_CREDENTIALS);

//MCP Tools Registration

//Tool 1: search_analytics
server.tool(
  "search_analytics",
  "Get search performance data from Google Search Console",
  {
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
  },
  async (args) => {
    const siteUrl = args.siteUrl;
    const requestBody = {
      startDate: args.startDate,
      endDate: args.endDate,
      dimensions: args.dimensions,
      searchType: args.type,
      aggregationType: args.aggregationType,
      rowLimit: args.rowLimit,
    };
    const response = await searchConsole.searchAnalytics(siteUrl, requestBody);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  }
);
//Tool 2: list_sites
server.tool(
  "list_sites",
  "List all sites in Google Search Console",
  zodToJsonSchema(z.object({})),
  async () => {
    const response = await searchConsole.listSites();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  }
);

//Tool 3: list_sitemaps
server.tool(
  "list_sitemaps",
  "List sitemaps for a site in Google Search Console",
  ListSitemapsSchema,
  async (args) => {
    const requestBody = {
      siteUrl: args.siteUrl,
      sitemapIndex: args.sitemapIndex,
    };
    const response = await searchConsole.listSitemaps(requestBody);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  }
);

//Tool 4: get_sitemap
server.tool(
  "get_sitemap",
  "Get a sitemap for a site in Google Search Console",
  GetSitemapSchema,
  async (args) => {
    const requestBody = {
      siteUrl: args.siteUrl,
      feedpath: args.feedpath,
    };

    const response = await searchConsole.getSitemap(requestBody);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  }
);

//Tool 5: submit_sitemap
server.tool(
  "submit_sitemap",
  "Submit a sitemap for a site in Google Search Console",
  SubmitSitemapSchema,
  async (args) => {
    const requestBody = {
      siteUrl: args.siteUrl,
      feedpath: args.feedpath,
    };
    const response = await searchConsole.submitSitemap(requestBody);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.data, null, 2),
        },
      ],
    };
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Google Search Console MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
