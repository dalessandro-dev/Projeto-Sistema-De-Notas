import { Injectable } from '@nestjs/common';
import { AbstractUserRepository } from './../../repositories/AbstractUserRepository';
import { User } from './../../entities/User';
import { hash } from 'bcrypt';
import { UserWithSameEmailException } from '../../exceptions/UserWithSameEmailException';

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute({ email, password, name }: CreateUserRequest) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new UserWithSameEmailException();

    const user = new User({ email, password: await hash(password, 10), name });

    await this.userRepository.create(user);

    return user;
  }
}
