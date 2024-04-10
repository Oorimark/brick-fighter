import path from "path";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (__, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
