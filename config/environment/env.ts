import dotenv from "dotenv";
dotenv.config();

import { SignOptions } from "jsonwebtoken";


function getEnv(key: string, required = true): string {
  const value = process.env[key];

  
  
  if (!value && required) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value || "";
}

export const env = {
  NODE_ENV: getEnv("NODE_ENV"),
  PORT: parseInt(getEnv("PORT", false)) || 4001,

  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_EXPIRES_IN:  getEnv("JWT_EXPIRES_IN") as SignOptions["expiresIn"],
  DIRECT_URL : getEnv("DIRECT_URL",true),
  DATABASE_URL: getEnv("DATABASE_URL", true),

  REDIS_HOST: getEnv("REDIS_HOST", false),
  REDIS_PORT: parseInt(getEnv("REDIS_PORT", false)) || 6379,

  EMAIL_HOST: getEnv("EMAIL_HOST", false),
  EMAIL_PORT: parseInt(getEnv("EMAIL_PORT", false)) || 587,
  EMAIL_USER: getEnv("EMAIL_USER", false),
  EMAIL_PASS: getEnv("EMAIL_PASS", false),

  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID", false),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET", false)
};