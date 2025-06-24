# Google Search Console MCP Server

GSC-MCP (Google Search Console Management Control Panel) is a lightweight Node.js package that provides developers with a structured interface to interact with Google Search Console APIs. It simplifies common GSC tasks like querying performance reports, managing properties, sitemaps, and more—making it ideal for SEO analysts, developers, and marketing teams looking to automate reporting and optimization workflows. [MCP standard](https://modelcontextprotocol.wiki/en/introduction).

## Features

- Fetch and analyze GSC performance data (clicks, impressions, CTR, position)
- Manage verified properties and sitemaps
- Export data for dashboards or further analysis
- Built-in support for access token management
- Lightweight, secure, and highly configurable

## MCP Tools

- `search_analytics`: Get search performance data for a site
- `list_sites`: List all sites in your Search Console account
- `list_sitemaps`: List sitemaps for a site
- `get_sitemap`: Get a specific sitemap for a site
- `submit_sitemap`: Submit a sitemap for a site

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

### Start

Start the MCP server:

```bash
node dist/index.js
```

### Configuration Environment Variables

Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of your Google service account JSON credentials file:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/credentials.json
```

### Integrate with Cursor

To use this MCP server with [Cursor](https://www.cursor.so), add a `.cursor/mcp.json` file to your project root:

```json
{
  "mcpServers": {
    "gsc-mcp": {
      "command": "npx",
      "args": ["-y", "gsc-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "./credential.json"
      }
    }
  }
}
```

### Integrate with VSCode

To use this MCP server with VSCode, add a `.vscode/mcp.json` file to your project root:

```json
{
  "servers": {
    "gsc-mcp": {
      "command": "npx",
      "args": ["-y", "gsc-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "./credential.json"
      }
    }
  }
}
```

This configuration enables VSCode to recognize and manage the Google Search Console MCP server automatically.

This configuration enables Cursor to recognize and manage the Google Search Console MCP server automatically.

## About AST Consulting

**AST Consulting** is a premier digital consulting firm specializing in FinOps, cloud optimization, AI/ML solutions, digital transformation, and performance marketing. With over 100 years of combined leadership experience and a portfolio impacting 50M+ businesses and 500M+ users, AST delivers measurable outcomes by blending strategic vision with deep technical expertise.

We developed **gsc-mcp** as part of our commitment to empower marketers, publishers, and digital teams with tools that drive efficiency, transparency, and actionable insights. Whether optimizing cloud spend or automating SEO intelligence pipelines, AST builds solutions that scale.

👉 [Visit us at www.astconsulting.in](https://www.astconsulting.in)
