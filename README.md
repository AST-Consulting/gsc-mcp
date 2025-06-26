# Google Analytics MCP Server

GA-MCP (Google Analytics Management Control Panel) is a lightweight Node.js package that provides developers with a structured interface to interact with Google Analytics APIs. It simplifies common GA tasks like querying analytics reports, managing properties, audiences, and more—making it ideal for data analysts, developers, and marketing teams looking to automate reporting and analytics workflows. [MCP standard](https://modelcontextprotocol.wiki/en/introduction).

## Features

- Fetch and analyze GA performance data (sessions, users, pageviews, conversions)
- Manage properties, data streams, and conversion events
- Query custom dimensions and metrics
- Access account hierarchies and property configurations
- Export data for dashboards or further analysis
- OAuth2 authentication with access and refresh tokens
- Lightweight, secure, and highly configurable

## MCP Tools

- `get_reports`: Get analytics reports data for specified metrics and dimensions
- `list_accounts`: List all Google Analytics accounts
- `list_properties`: List properties for a Google Analytics account
- `list_data_streams`: List data streams for a property
- `list_custom_dimensions`: List custom dimensions for a property
- `list_custom_metrics`: List custom metrics for a property
- `list_conversion_events`: List conversion events for a property

## Getting Started

### Prerequisites

- Node.js v18 or later
- Google OAuth2 credentials (Client ID and Client Secret)
- Valid Google Analytics access and refresh tokens

### Authentication Setup

1. **Create OAuth2 Credentials:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create or select a project
   - Enable the Google Analytics API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Configure the consent screen and choose the appropriate application type:
     
     **Option A: Web Application** (Recommended)
     - Select "Web application"
     - Add `http://localhost:3000/auth/callback` to "Authorized redirect URIs"
     
     **Option B: Desktop Application**
     - Select "Desktop application"
     - No redirect URI configuration needed (uses out-of-band flow)

2. **Generate Access and Refresh Tokens:**
   - Use the included helper script: `npm run oauth-helper`
   - Or use [Google OAuth2 Playground](https://developers.google.com/oauthplayground/) with your client credentials
   - Or implement your own OAuth2 flow

### Quick Setup Workflow

```bash
# 1. Set up environment file
npm run setup-env

# 2. Edit .env with your OAuth2 Client ID and Secret (from step 1 above)

# 3. Generate tokens
npm run oauth-helper

# 4. Copy the generated tokens to your .env file

# 5. Build and start
npm run build
node dist/index.js
```

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

### Configuration Environment Variables

**Option 1: Using .env file (Recommended)**

Set up your environment file:

```bash
npm run setup-env
# This creates .env from the template
# Edit .env file with your actual credentials
```

**Option 2: Using export commands**

Set the following environment variables:

```bash
export GOOGLE_CLIENT_ID=your_oauth2_client_id
export GOOGLE_CLIENT_SECRET=your_oauth2_client_secret
export GOOGLE_ACCESS_TOKEN=your_access_token
export GOOGLE_REFRESH_TOKEN=your_refresh_token
```

### Start

Start the MCP server:

```bash
node dist/index.js
```

### Integrate with Cursor

To use this MCP server with [Cursor](https://www.cursor.so), add a `.cursor/mcp.json` file to your project root:

```json
{
  "mcpServers": {
    "ga-mcp": {
      "command": "npx",
      "args": ["-y", "ga-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "your_oauth2_client_id",
        "GOOGLE_CLIENT_SECRET": "your_oauth2_client_secret",
        "GOOGLE_ACCESS_TOKEN": "your_access_token",
        "GOOGLE_REFRESH_TOKEN": "your_refresh_token"
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
    "ga-mcp": {
      "command": "npx",
      "args": ["-y", "ga-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "your_oauth2_client_id",
        "GOOGLE_CLIENT_SECRET": "your_oauth2_client_secret",
        "GOOGLE_ACCESS_TOKEN": "your_access_token",
        "GOOGLE_REFRESH_TOKEN": "your_refresh_token"
      }
    }
  }
}
```

This configuration enables VSCode to recognize and manage the Google Analytics MCP server automatically.

This configuration enables Cursor to recognize and manage the Google Analytics MCP server automatically.

## Token Refresh

The MCP server automatically handles token refresh using the provided refresh token. If the access token expires, it will be automatically refreshed during API calls.

## Troubleshooting

### "The redirect URI... can only be used by a Client ID for native application"

This error occurs when you have a **Web application** OAuth client but are using the out-of-band redirect URI. Solutions:

**Solution 1: Use Web Application (Recommended)**
1. In Google Cloud Console, edit your OAuth client
2. Add `http://localhost:3000/auth/callback` to "Authorized redirect URIs"
3. Keep `GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback` in your `.env` file

**Solution 2: Switch to Desktop Application**
1. Create a new OAuth client and select "Desktop application"
2. Set `GOOGLE_REDIRECT_URI=urn:ietf:wg:oauth:2.0:oob` in your `.env` file

## About AST Consulting

**AST Consulting** is a premier digital consulting firm specializing in FinOps, cloud optimization, AI/ML solutions, digital transformation, and performance marketing. With over 100 years of combined leadership experience and a portfolio impacting 50M+ businesses and 500M+ users, AST delivers measurable outcomes by blending strategic vision with deep technical expertise.

We developed **ga-mcp** as part of our commitment to empower marketers, analysts, and digital teams with tools that drive efficiency, transparency, and actionable insights. Whether optimizing cloud spend or automating analytics intelligence pipelines, AST builds solutions that scale.

👉 [Visit us at www.astconsulting.in](https://www.astconsulting.in)
# ga-mcp
