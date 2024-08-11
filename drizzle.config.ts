import { defineConfig } from 'drizzle-kit'
import config from '@/lib/config'

export default defineConfig({
    schema: "./src/lib/schema.ts",
    out: "./drizzle",
    driver: "better-sqlite",
    dbCredentials: {
        url: config.DATABASE_URL,
    },
    verbose: true,
    strict: true,
})