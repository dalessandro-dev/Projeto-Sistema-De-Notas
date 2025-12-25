import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/User.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/JwtAuth.guard';
import { NoteModule } from './infra/http/modules/note/Note.module';

@Module({
  imports: [UserModule, AuthModule, NoteModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
