import express from "express";
import cors from "cors";
import { SERVER_HOST, SERVER_PORT } from "./src/utils/constants.js";
import database from "./db/database.js";
import routes from "./src/routes/index.js";
const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://208.110.83.16:91",
  "http://localhost:5173",
  "http://208.110.83.16",
  "http://3.129.250.130",
  "https://thechicagofoodclub.com",
  "https://www.thechicagofoodclub.com/"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options(/.*/, cors());
app.use(express.static("public"))
app.use("/api", routes);

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});
