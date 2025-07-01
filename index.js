import express from "express";
import bodyParser from "body-parser";
import handler from "./api/generate.js";

const app = express();
app.use(bodyParser.json());

app.post("/api/generate", handler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
