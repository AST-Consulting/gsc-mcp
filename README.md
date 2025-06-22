# Google Search Console MCP Server

A Model Context Protocol (MCP) server for Google Search Console, enabling programmatic access to Search Console data and tools via the MCP standard.

## Features

- Query Google Search Console search analytics
- List all sites in your Search Console account
- List, get, and submit sitemaps for a site

## Getting Started

### Prerequisites

- Node.js v18 or later
- Google Cloud service account credentials with access to Google Search Console

### Installation

Clone this repository and install dependencies:

```bash
pnpm install
# or
npm install
```

### Build

```bash
pnpm build
# or
npm run build
```

### Configuration

Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your Google service account JSON credentials file:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/credentials.json
```

### Usage

Start the MCP server:

```bash
node dist/index.js
```

Or use the provided binary (if installed globally):

```bash
npx sumitpandey
```

## MCP Tools

- `search_analytics`: Get search performance data for a site
- `list_sites`: List all sites in your Search Console account
- `list_sitemaps`: List sitemaps for a site
- `get_sitemap`: Get a specific sitemap for a site
- `submit_sitemap`: Submit a sitemap for a site

## Environment Variables

- `GOOGLE_APPLICATION_CREDENTIALS`: Path to your Google service account credentials JSON file
