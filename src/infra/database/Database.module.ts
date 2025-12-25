import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository';
import { AbstractUserRepository } from 'src/modules/user/repositories/AbstractUserRepository';
import { AbstractNoteRepository } from 'src/modules/note/repositories/AbstractNoteRepository';
import { PrismaNoteRepository } from './prisma/repositories/PrismaNoteRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AbstractNoteRepository,
      useClass: PrismaNoteRepository,
    },
    {
      provide: AbstractUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AbstractUserRepository, AbstractNoteRepository],
})
export class DatabaseModule {}
