import multer from "multer";


import {
  TENANT_LOGO_FOLDER,
  MAX_IMAGE_SIZE,
  ALLOWED_IMAGE_TYPES,
} from "../constants/upload.constants";

import { FileUtils } from "../utils/file.utils";

// Ensure upload directory exists
FileUtils.ensureDirectory(TENANT_LOGO_FOLDER);

const storage = multer.diskStorage({

  destination(_req, _file, callback) {

    callback(
      null,
      TENANT_LOGO_FOLDER
    );

  },

  filename(_req, file, callback) {

    callback(
      null,
      FileUtils.generateFilename(file.originalname)
    );

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