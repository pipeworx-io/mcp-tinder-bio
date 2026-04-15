# mcp-tinder-bio

tinder-bio MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `tinder_bio_generate` | Generate a dating profile bio. Red flags embedded at no extra charge. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "tinder-bio": {
      "url": "https://gateway.pipeworx.io/tinder-bio/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use tinder-bio
```

## License

MIT
