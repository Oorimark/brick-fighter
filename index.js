import express from "express";
import path from "path";
import cors from "cors";

app.use(cors);
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (__, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`);
});
