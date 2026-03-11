import "dotenv-flow/config"
import { defineConfig } from "drizzle-kit"

const url = process.env.DATABASE_URL

if (!url) {
  throw new Error("DATABASE_URL environment variable was not provided")
}

export default defineConfig({
  out: "./lib/db/drizzle",
  schema: ["./lib/db/schema.ts", "./auth-schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url
  }
})
