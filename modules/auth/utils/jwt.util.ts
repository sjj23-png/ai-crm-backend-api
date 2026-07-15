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
      expiresIn: (process.env.JWT_EXPIRES_IN || "15m") as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, JWT_SECRET!, options);

  }
  static generateRefreshToken(
    payload: AccessTokenPayload
  ): string {
    return jwt.sign(payload, JWT_SECRET!, {
      expiresIn:
        (process.env.JWT_REFRESH_EXPIRES_IN ||
          "15m") as SignOptions["expiresIn"],
    });
  }

  static verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(token, JWT_SECRET!) as AccessTokenPayload;
  }


  static verifyRefreshToken(
    token: string
  ): AccessTokenPayload {
    const payload = jwt.verify(
      token,
      JWT_SECRET!
    );

    return payload as unknown as AccessTokenPayload;
  }

  static decodeToken(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }
}