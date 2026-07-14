import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

export interface AccessTokenPayload extends JwtPayload {
  id: string;
  tenantId: string;
  roleId: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured.");
}

export class JwtUtil {
  static generateAccessToken(payload: AccessTokenPayload): string {
    const options: SignOptions = {
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN || "7d"),
    };

    return jwt.sign(payload,JWT_SECRET!,options);
    
  }

  static verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(token, JWT_SECRET!) as AccessTokenPayload;
  }

  static decodeToken(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }
}