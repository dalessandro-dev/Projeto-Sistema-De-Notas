import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from './dtos/CreateUserBody';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase.ts/CeateUserUseCase';
import { UserViewModel } from './viewModel/UserViewModel';
import { Public } from '../auth/decorators/isPublic.decorator';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @Public()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const user = await this.createUserUseCase.execute({
      email,
      password,
      name,
    });

    return UserViewModel.toHttp(user);
  }
}
