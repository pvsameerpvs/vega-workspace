import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type DB = PostgresJsDatabase<typeof schema>;

let db: DB | null = null;

try {
  const connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    const client = postgres(connectionString, { prepare: false });
    db = drizzle(client, { schema });
  }
} catch {
  db = null;
}

export { db };
export * from "./schema";
export * from "./mock";
