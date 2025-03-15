import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import { renderPage, cleanPath, getMarkdownRoutes } from "./utils/index.js";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;
const CONTENT_DIR = path.join(__dirname, "content");
const TEMPLATE_PATH = path.join(__dirname, "template.html");

app.use(cors({ origin: "*" }));
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.get("/api/routes", (req, res) => {
  try {
    const routes = getMarkdownRoutes(CONTENT_DIR);
    res.json({ routes });
  } catch (error) {
    res.status(500).json({ error: "Error reading markdown files" });
  }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  const { slug } = req.body;
  const file = req.file;

  if (!slug || !file) {
    return res.status(400).json({ error: "Missing slug or file" });
  }

  const dirPath = path.join(CONTENT_DIR, slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, "index.md");
  fs.renameSync(file.path, filePath);

  res.json({ message: "File uploaded successfully", path: filePath });
});

app.get("*", (req, res) => {
  const requestPath = cleanPath(req);
  const markdownPath = path.join(CONTENT_DIR, requestPath, "index.md");

  const pageHtml = renderPage(markdownPath, TEMPLATE_PATH);
  if (pageHtml) {
    res.send(pageHtml);
  } else {
    res.status(404).send("<h1>Navigate through a valid directory!</h1>");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
