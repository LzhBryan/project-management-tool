import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./drizzle/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NODE_ENV === "TEST" ? process.env.TEST_DATABASE_URL! : process.env.DATABASE_URL!,
  },
})
