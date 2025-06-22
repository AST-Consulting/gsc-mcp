import { google, searchconsole_v1, webmasters_v3 } from "googleapis";
import { GoogleAuth } from "google-auth-library";

type SearchanalyticsQueryRequest =
  webmasters_v3.Params$Resource$Searchanalytics$Query["requestBody"];
type ListSitemapsRequest = webmasters_v3.Params$Resource$Sitemaps$List;
type GetSitemapRequest = webmasters_v3.Params$Resource$Sitemaps$Get;
type SubmitSitemapRequest = webmasters_v3.Params$Resource$Sitemaps$Submit;
type IndexInspectRequest =
  searchconsole_v1.Params$Resource$Urlinspection$Index$Inspect["requestBody"];

export class SearchConsoleService {
  private auth: GoogleAuth;

  constructor(credentials: string) {
    this.auth = new google.auth.GoogleAuth({
      keyFile: credentials,
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });
  }

  private async getWebmasters() {
    const authClient = await this.auth.getClient();
    return google.webmasters({
      version: "v3",
      auth: authClient,
    } as webmasters_v3.Options);
  }

  private async getSearchConsole() {
    const authClient = await this.auth.getClient();
    return google.searchconsole({
      version: "v1",
      auth: authClient,
    } as searchconsole_v1.Options);
  }

  private normalizeUrl(url: string): string {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return `sc-domain:${parsedUrl.hostname}`;
    }
    return `https://${url}`;
  }

  private async handlePermissionError<T>(
    operation: () => Promise<T>,
    fallbackOperation: () => Promise<T>
  ): Promise<T> {
    try {
      return await operation();
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.toLowerCase().includes("permission")
      ) {
        return await fallbackOperation();
      }
      throw err;
    }
  }

  async searchAnalytics(
    siteUrl: string,
    requestBody: SearchanalyticsQueryRequest
  ) {
    const webmasters = await this.getWebmasters();
    return this.handlePermissionError(
      () => webmasters.searchanalytics.query({ siteUrl, requestBody }),
      () =>
        webmasters.searchanalytics.query({
          siteUrl: this.normalizeUrl(siteUrl),
          requestBody,
        })
    );
  }

  async listSites() {
    const webmasters = await this.getWebmasters();
    return webmasters.sites.list();
  }

  async listSitemaps(requestBody: ListSitemapsRequest) {
    const webmasters = await this.getWebmasters();
    return this.handlePermissionError(
      () => webmasters.sitemaps.list(requestBody),
      () =>
        webmasters.sitemaps.list({
          ...requestBody,
          siteUrl: this.normalizeUrl(requestBody.siteUrl!),
        })
    );
  }

  async getSitemap(requestBody: GetSitemapRequest) {
    const webmasters = await this.getWebmasters();
    return this.handlePermissionError(
      () => webmasters.sitemaps.get(requestBody),
      () =>
        webmasters.sitemaps.get({
          ...requestBody,
          siteUrl: this.normalizeUrl(requestBody.siteUrl!),
        })
    );
  }

  async submitSitemap(requestBody: SubmitSitemapRequest) {
    const webmasters = await this.getWebmasters();
    return this.handlePermissionError(
      () => webmasters.sitemaps.submit(requestBody),
      () =>
        webmasters.sitemaps.submit({
          ...requestBody,
          siteUrl: this.normalizeUrl(requestBody.siteUrl!),
        })
    );
  }

  async indexInspect(requestBody: IndexInspectRequest) {
    const searchConsole = await this.getSearchConsole();
    return searchConsole.urlInspection.index.inspect({ requestBody });
  }
}
