import { UserRepository, UserWithLinks } from "../repositories/UserRepository.js";
import { BaseService } from "./BaseService.js";
import bcrypt from "bcryptjs";

export class UserService extends BaseService<UserWithLinks> {
  constructor(private userRepository: UserRepository) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<UserWithLinks | null> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<UserWithLinks> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.create({
      ...data,
      password: hashedPassword
    });
  }

  async validatePassword(user: UserWithLinks, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
} 