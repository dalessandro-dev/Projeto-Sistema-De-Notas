import { User } from './../entities/User';

export abstract class AbstractUserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
