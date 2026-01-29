import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  DATABASE_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} from "../src/utils/constants.js";
import schema from "./schema/index.js";

let database;
let connectionString =
  DATABASE_URL ||
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

try {
  const client = postgres(connectionString, { prepare: false });
  database = drizzle(client, { schema });
  await client`SELECT 1`;
  console.log("✅ Database connected successfully.");
} catch (error) {
  console.error("❌ Failed to connect to the database:", error.message);
  process.exit(1);
}

export default database;
