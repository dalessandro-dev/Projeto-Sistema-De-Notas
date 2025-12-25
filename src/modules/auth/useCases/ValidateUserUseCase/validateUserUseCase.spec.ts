import { UserRepositoryInMemory } from 'src/modules/user/repositories/UserRepositoryInMemory';
import { ValidateUserUseCase } from './ValidateUserUseCase';
import { hash } from 'bcrypt';
import { UserFactory } from 'src/modules/user/factories/user.factory';
import { AuthValuesIncorrectException } from '../../exceptions/AuthValuesIncorrectException';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('It should be able to return user when credentials are correct', async () => {
    const userPasswordWithoutEncryption = 'Bola';

    const user = UserFactory.makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: 'email@gmail.com',
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('It should be able to throw error when credentials incorrect', async () => {
    const userPasswordWithoutEncryption = 'Bola';

    const user = UserFactory.makeUser({
      password: userPasswordWithoutEncryption,
    });

    userRepositoryInMemory.users = [user];

    await expect(async () => {
      await validateUserUseCase.execute({
        email: 'emailErrado@gmail.com',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(AuthValuesIncorrectException);

    await expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'Senha errada',
      });
    }).rejects.toThrow(AuthValuesIncorrectException);
  });
});
