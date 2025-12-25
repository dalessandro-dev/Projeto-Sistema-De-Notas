import { randomUUID } from 'crypto';
import { Replace } from './../../../utilities/Replace.js';

interface UserSchema {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class User implements UserSchema {
  private _id: string;
  private props: UserSchema;

  constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
    this.id = id || randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  set email(email: string) {
    this.props.email = email;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set password(password: string) {
    this.props.password = password;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }
}
