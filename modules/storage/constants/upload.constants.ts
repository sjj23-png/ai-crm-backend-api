import path from "node:path";


export const UPLOAD_ROOT = path.join(
  process.cwd(),
  "uploads"
);

export const TENANT_LOGO_FOLDER = path.join(
  UPLOAD_ROOT,
  "tenant-logos"
);

export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
] as const;