import * as fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";

export const renderPage = (markdownFile, templatePath) => {
  if (!fs.existsSync(markdownFile)) return null;

  const fileContent = fs.readFileSync(markdownFile, "utf8");
  const { content } = matter(fileContent);
  const htmlContent = marked(content);

  let template = fs.readFileSync(templatePath, "utf8");
  return template.replace("{{content}}", htmlContent);
};

export const cleanPath = (req) => req.path.replace(/\/$/, "");

export const getMarkdownRoutes = (dirPath, basePath = "") => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      return getMarkdownRoutes(fullPath, relativePath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      return relativePath.replace(/\index.md$/, "").replace(/\/$/, "");
    }

    return [];
  });
};
