import { drizzle } from "drizzle-orm/neon-http"
import { DATABASE_CONNECTION } from "./drizzle.constants"

export const dbProvider = {
  provide: DATABASE_CONNECTION,
  useFactory: () => {
    const dbUrl = process.env.NODE_ENV === "TEST" ? process.env.TEST_DATABASE_URL! : process.env.DATABASE_URL!
    return drizzle(dbUrl)
  },
}
