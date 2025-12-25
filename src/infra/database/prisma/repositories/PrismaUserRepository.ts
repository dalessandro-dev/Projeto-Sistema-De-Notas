import { AbstractUserRepository } from 'src/modules/user/repositories/AbstractUserRepository';
import { User } from 'src/modules/user/entities/User';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from './../mappers/PrismaUserMapper';

@Injectable()
export class PrismaUserRepository implements AbstractUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
