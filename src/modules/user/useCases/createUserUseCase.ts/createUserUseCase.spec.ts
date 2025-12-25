import { CreateUserUseCase } from './CeateUserUseCase';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory';
import { compare } from 'bcrypt';
import { UserWithSameEmailException } from '../../exceptions/UserWithSameEmailException';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('It should be able create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'Tensha@gmail.com',
      password: 'SSJ3',
      name: 'Goku',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('It should be able create user with password encrypted', async () => {
    const userPlainPassword = 'SSJ2';

    const user = await createUserUseCase.execute({
      email: 'Trenshin@gmail.com',
      password: userPlainPassword,
      name: 'Vegeta',
    });

    const hasPasswordEncrypted = await compare(
      userPlainPassword,
      user.password,
    );

    expect(hasPasswordEncrypted).toBeTruthy();
  });

  it('It should be able to throw an exception when an email address has already been registered', async () => {
    await createUserUseCase.execute({
      email: 'email@gmail.com',
      password: 'senha',
      name: 'User',
    });

    await expect(async () => {
      await createUserUseCase.execute({
        email: 'email@gmail.com',
        password: 'senha123',
        name: 'User Dois',
      });
    }).rejects.toThrow(UserWithSameEmailException);
  });
});
