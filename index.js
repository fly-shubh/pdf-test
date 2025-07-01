// server.js (local dev only)
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import handler from "./api/generate.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post("/api/generate", handler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
