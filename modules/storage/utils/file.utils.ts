import fs from "node:fs";
import path from "node:path";

import { randomUUID } from "node:crypto";

export class FileUtils {

  static ensureDirectory(directory: string): void {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {
        recursive: true,
      });
    }
  }

  static generateFilename(originalName: string): string {
    const extension = path
      .extname(originalName)
      .toLowerCase();

    return `${randomUUID()}${extension}`;
  }

  static deleteFile(filePath: string): void {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  static getPublicUrl(
    folder: string,
    filename: string
  ): string {

    return `/uploads/${folder}/${filename}`;

  }

}