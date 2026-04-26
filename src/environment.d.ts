declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      PREVIEW_SECRET: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      GOOGLE_STITCH_API_KEY?: string
      GOOGLE_STITCH_MCP_URL?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
