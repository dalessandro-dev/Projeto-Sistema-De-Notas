import { HttpStatus } from '@nestjs/common';
import { AppException } from './AppException';

export class InvalidAccessTokenException extends AppException {
  constructor() {
    super({
      message: 'Access Token inválido ou expirado',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
