import { migrate } from "drizzle-orm/node-postgres/migrator";
import database from "./database.js";

migrate(database, { migrationsFolder: "./migrations" })
  .then(() => {
    console.log("Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migrations failed!", err);
    process.exit(1);
  });
