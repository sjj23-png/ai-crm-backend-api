import multer from "multer";
import os from "node:os";
import path from "node:path";
import {
  TENANT_LOGO_FOLDER,
  MAX_IMAGE_SIZE,
  ALLOWED_IMAGE_TYPES,
} from "../constants/upload.constants";
import { FileUtils } from "../utils/file.utils";

// Safely resolve upload folder for Serverless Vercel vs Local
const uploadFolder = process.env.VERCEL
  ? path.join(os.tmpdir(), "tenant-logos")
  : TENANT_LOGO_FOLDER;

// Ensure upload directory exists safely without crashing top-level import
try {
  FileUtils.ensureDirectory(uploadFolder);
} catch {
  // Ignore filesystem restriction on Vercel
}

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, uploadFolder);
  },

  filename(_req, file, callback) {
    callback(null, FileUtils.generateFilename(file.originalname));
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback
) => {
  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.mimetype as (typeof ALLOWED_IMAGE_TYPES)[number]
    )
  ) {
    return callback(
      new Error(
        "Only PNG, JPG, JPEG and WEBP images are allowed."
      )
    );
  }

  callback(null, true);
};

export const uploadTenantLogo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
    files: 1,
  },
});