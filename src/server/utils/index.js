export const renderPage = (markdownFile, templatePath) => {
  if (!fs.existsSync(markdownFile)) return null;

  const fileContent = fs.readFileSync(markdownFile, "utf8");
  const { content } = matter(fileContent);
  const htmlContent = marked(content);

  let template = fs.readFileSync(templatePath, "utf8");
  return template.replace("{{content}}", htmlContent);
};

export const cleanPath = (req) => req.path.replace(/\/$/, "");
