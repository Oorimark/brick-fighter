import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import cors from "cors";

const app = express();
const port = 7021;

app.use(cors);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (__, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, "0.0.0.0", () => {});
