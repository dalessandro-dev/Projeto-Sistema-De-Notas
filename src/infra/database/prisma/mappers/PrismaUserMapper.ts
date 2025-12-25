import { User as UserRaw } from '@prisma/client';
import { User } from 'src/modules/user/entities/User';

export class PrismaUserMapper {
  static toPrisma({ createdAt, name, email, password, id }: User): UserRaw {
    return {
      createdAt,
      name,
      email,
      password,
      id,
    };
  }

  static toDomain({ id, createdAt, name, email, password }: UserRaw): User {
    return new User(
      {
        createdAt,
        name,
        email,
        password,
      },
      id,
    );
  }
}
