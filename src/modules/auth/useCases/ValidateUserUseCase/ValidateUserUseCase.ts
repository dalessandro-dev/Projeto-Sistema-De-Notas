import { AbstractUserRepository } from 'src/modules/user/repositories/AbstractUserRepository';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthValuesIncorrectException } from '../../exceptions/AuthValuesIncorrectException';

interface ValidationUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute({ email, password }: ValidationUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AuthValuesIncorrectException();
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new AuthValuesIncorrectException();
    }

    return user;
  }
}
