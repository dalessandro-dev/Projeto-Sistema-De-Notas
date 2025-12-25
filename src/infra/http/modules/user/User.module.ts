import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase.ts/CeateUserUseCase';
import { UserController } from './User.controller';
import { DatabaseModule } from 'src/infra/database/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
