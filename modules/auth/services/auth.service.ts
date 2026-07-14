import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/auth.repository";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { JwtUtil } from "../utils/jwt.util";

export class AuthService {
  private readonly authRepository = new AuthRepository();

  async register(data: RegisterDto) {
    const existingUser = await this.authRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const passwordHash = await bcrypt.hash(
      data.password,
      Number(process.env.BCRYPT_SALT ?? 10)
    );

    const user = await this.authRepository.createUser({
      name: data.name,
      email: data.email,
      passwordHash,
      tenantId: data.tenantId,
      roleId: data.roleId,
    });

    await this.authRepository.createProfile(user.id);

    return {
      message: "User registered successfully.",
      user,
    };
  }

  async login(data: LoginDto) {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("User account is inactive.");
    }

    const accessToken = JwtUtil.generateAccessToken({
      id: user.id,
      tenantId: user.tenantId,
      roleId: user.roleId,
      email:user.email
    });

    await this.authRepository.createSession({
      userId: user.id,
      token: accessToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });

    return {
      accessToken,
      user,
    };
  }
  async logout(token: string) {
  const session = await this.authRepository.findSession(token);

  if (!session) {
    throw new Error("Session not found.");
  }

  await this.authRepository.deleteSession(token);

  return {
    message: "Logged out successfully.",
  };
}





async me(userId: string) {
  const user = await this.authRepository.findUserById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
}
async refreshToken(token: string) {
  const refreshToken =
    await this.authRepository.findRefreshToken(token);

  if (!refreshToken) {
    throw new Error("Invalid refresh token.");
  }

  if (refreshToken.revoked) {
    throw new Error("Refresh token revoked.");
  }

  if (refreshToken.expiresAt < new Date()) {
    throw new Error("Refresh token expired.");
  }

  const user = await this.authRepository.findUserById(
    refreshToken.userId
  );

  if (!user) {
    throw new Error("User not found.");
  }

  const accessToken = JwtUtil.generateAccessToken({
    id: user.id,
    tenantId: user.tenantId,
    roleId: user.roleId,
    email:user.email
  });

  return {
    accessToken,
  };
}
}