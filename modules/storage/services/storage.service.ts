import path from "node:path";
import { FileUtils } from "../utils/file.utils";


export class StorageService {

  /**
   * Returns the public URL for a newly uploaded file.
   */
  saveTenantLogo(file: Express.Multer.File) {

    return {
      filename: file.filename,

      originalName: file.originalname,

      mimetype: file.mimetype,

      size: file.size,

      path: file.path,

      publicUrl: FileUtils.getPublicUrl(
        "tenant-logos",
        file.filename
      ),
    };

  }

  /**
   * Delete an uploaded file.
   */
  deleteTenantLogo(filename: string): boolean {

    const filePath = path.join(
      process.cwd(),
      "uploads",
      "tenant-logos",
      filename
    );

    FileUtils.deleteFile(filePath);

    return true;

  }

}