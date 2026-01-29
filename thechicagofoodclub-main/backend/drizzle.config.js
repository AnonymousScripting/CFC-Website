import { DATABASE_URL } from "./src/utils/constants.js"

export default {
  dialect: "postgresql",
  schema: "./db/schema",
  out: "./migrations",
  dbCredentials: {
    url: DATABASE_URL,
  },
}

