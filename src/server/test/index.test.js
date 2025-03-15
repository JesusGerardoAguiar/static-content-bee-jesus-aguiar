import request from "supertest";
import app from "../server.js";
import path from "path";
import * as fs from "fs";

const __dirname = path.resolve();

const CONTENT_DIR = path.join(__dirname, "content");

describe("BE Tests", () => {
  it("should return a 200 status code for valid URLs", async () => {
    const contentFolder = path.join(CONTENT_DIR);
    const files = fs
      .readdirSync(contentFolder)
      .filter((file) => file.endsWith(".md"));
    for (const file of files) {
      const fileNameWithoutExtension = file.replace(".md", "");
      const response = await request(app).get(`/${fileNameWithoutExtension}`);
      expect(response.status).toBe(200);
    }
  });

  it("should return HTML content generated from markdown", async () => {
    const contentFolder = path.join(__dirname, "content");
    const files = fs
      .readdirSync(contentFolder)
      .filter((file) => file.endsWith(".md"));

    for (const file of files) {
      const fileNameWithoutExtension = file.replace(".md", "");
      const response = await request(app).get(`/${fileNameWithoutExtension}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain("<html>");
      expect(response.text).toContain("</html>");
      expect(response.text).toContain(fileNameWithoutExtension);
    }
  });

  it("should return a 404 status code for non-existent URLs", async () => {
    const response = await request(app).get("/non-existent-url");
    expect(response.status).toBe(404);
  });
});
