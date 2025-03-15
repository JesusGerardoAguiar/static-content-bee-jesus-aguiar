import express from "express";
import path from "path";
import { renderPage, cleanPath, getMarkdownRoutes } from "./utils/index.js";
import cors from "cors";
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;
const CONTENT_DIR = path.join(__dirname, "content");
const TEMPLATE_PATH = path.join(__dirname, "template.html");
app.use(cors({ origin: "*" }));

app.use(express.static("public"));

app.get("/api/routes", (req, res) => {
  try {
    const routes = getMarkdownRoutes(CONTENT_DIR);
    res.json({ routes });
  } catch (error) {
    res.status(500).json({ error: "Error reading markdown files" });
  }
});

app.get("*", (req, res) => {
  const requestPath = cleanPath(req);
  const markdownPath = path.join(CONTENT_DIR, requestPath, "index.md");

  const pageHtml = renderPage(markdownPath, TEMPLATE_PATH);
  if (pageHtml) {
    res.send(pageHtml);
  } else {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
