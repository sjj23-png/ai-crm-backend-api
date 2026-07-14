import bcrypt from "bcrypt";
import { APP_CONSTANTS } from "../constants/app.constants";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, APP_CONSTANTS.AUTH.SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}