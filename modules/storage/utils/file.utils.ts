import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { randomUUID } from "node:crypto";

export class FileUtils {

  static ensureDirectory(directory: string): void {
    try {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {
          recursive: true,
        });
      }
    } catch (error) {
      // In serverless read-only environments like Vercel (/var/task),
      // attempt creating inside /tmp directory to avoid crashing module import
      try {
        const tmpDir = path.join(os.tmpdir(), "uploads");
        if (!fs.existsSync(tmpDir)) {
          fs.mkdirSync(tmpDir, { recursive: true });
        }
      } catch {
        // Silently ignore filesystem write constraints in serverless environments
      }
    }
  }

  static generateFilename(originalName: string): string {
    const extension = path
      .extname(originalName)
      .toLowerCase();

    return `${randomUUID()}${extension}`;
  }

  static deleteFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch {
      // Ignore filesystem errors in serverless
    }
  }

  static getPublicUrl(
    folder: string,
    filename: string
  ): string {
    return `/uploads/${folder}/${filename}`;
  }

}