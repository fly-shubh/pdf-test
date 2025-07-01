import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import handler from "./api/generate.js";

const app = express();

// Enable CORS for all origins (you can restrict this later)
app.use(cors());

// Parse JSON payloads
app.use(bodyParser.json());

// Your PDF generation endpoint
app.post("/api/generate", handler);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
