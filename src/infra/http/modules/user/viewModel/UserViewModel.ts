import { User } from 'src/modules/user/entities/User';

export class UserViewModel {
  static toHttp({ createdAt, email, id, name, password }: User) {
    return {
      id,
      email,
      createdAt,
      password,
      name,
    };
  }
}
