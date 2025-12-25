import type { Request } from 'express';

export class AuthenticatedRequestModel extends Request {
  user: {
    id: string;
    email: string;
    password: string;
    createdAt: string;
  };
}
