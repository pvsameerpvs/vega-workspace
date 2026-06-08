import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type DB = PostgresJsDatabase<typeof schema>;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not defined. Please set it in your environment variables."
  );
}

// Validate URL format before passing to postgres driver
function validateDatabaseUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new Error(
      `Invalid DATABASE_URL: "${url}". Please provide a valid PostgreSQL connection string (e.g. postgresql://user:pass@host:port/db).`
    );
  }
}

validateDatabaseUrl(connectionString);

const client = postgres(connectionString, {
  prepare: false,
  max: 10,
});

export const db = drizzle(client, { schema });
