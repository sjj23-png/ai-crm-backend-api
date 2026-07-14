import bcrypt from "bcrypt";
import { CreateUserDto } from "../dto/create-user.dto";

import { UserRepository } from "../repositories/user.repository";
import { UpdateUserDto } from "../dto/update-user.dto";

export class UserService {

  private repository =
    new UserRepository();

  async create(data: CreateUserDto) {

    const exists =
      await this.repository.findByEmail(data.email);

    if (exists) {
      throw new Error("Email already exists.");
    }

    const passwordHash =
      await bcrypt.hash(
        data.password,
        Number(process.env.BCRYPT_SALT)
      );

    const user =
      await this.repository.create({

        name: data.name,

        email: data.email,

        passwordHash,

        tenantId: data.tenantId,

        roleId: data.roleId

      });

    return user;

  }

  async getAll(tenantId: string) {

    return this.repository.findAll(tenantId);

  }

  async getById(id: string) {

    const user =
      await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;

  }

















  async update(

    id: string,

    data: UpdateUserDto

  ) {

    await this.getById(id);

    if (data.email) {

      const existing =
        await this.repository.findByEmail(
          data.email
        );

      if (
        existing &&
        existing.id !== id
      ) {

        throw new Error(
          "Email already exists."
        );

      }

    }

    return this.repository.update(
      id,
      data
    );

  }
  async delete(id: string) {

    await this.repository.delete(id);

    return {

      message: "User deleted successfully."

    };

  }

}