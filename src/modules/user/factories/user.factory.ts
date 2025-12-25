import { User } from './../entities/User';

type Override = Partial<User>;

export class UserFactory {
  static makeUser({ id, ...override }: Override) {
    return new User(
      {
        email: 'email@gmail.com',
        name: 'Arrascaeta',
        password: '123',
        ...override,
      },
      id,
    );
  }
}
