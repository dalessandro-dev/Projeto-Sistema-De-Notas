import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/AppException';

export class AuthValuesIncorrectException extends AppException {
  constructor() {
    super({
      message: 'E-mail ou senha incorreto(s)',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
