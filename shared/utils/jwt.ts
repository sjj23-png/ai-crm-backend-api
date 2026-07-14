import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/environment/env";

export interface JwtPayload {
  id: string;
  tenantId: string;
  roleId: string;
  email: string;
}

export class JwtUtil {
  static generateToken(payload: JwtPayload): string {
    return jwt.sign(
      payload,
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
      }
    );
  }

  static verifyToken(token: string): JwtPayload {
    return jwt.verify(
      token,
      env.JWT_SECRET
    ) as JwtPayload;
  }
}