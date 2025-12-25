import { User } from '../entities/User';
import { AbstractUserRepository } from './AbstractUserRepository';

export class UserRepositoryInMemory implements AbstractUserRepository {
  users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
