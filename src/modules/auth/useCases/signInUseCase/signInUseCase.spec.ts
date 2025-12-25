import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './SignInUseCase';
import { UserFactory } from 'src/modules/user/factories/user.factory';
import { UserPayload } from '../../models/UserPayload';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sign in', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('It should be able to create valid access_token', async () => {
    const user = UserFactory.makeUser({});

    const token = signInUseCase.execute({ user });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
