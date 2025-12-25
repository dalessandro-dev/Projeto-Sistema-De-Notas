import {
  registerDecorator,
  ValidationOptions,
  isString,
} from 'class-validator';
import { exceptionMessages } from '../data/exceptionMessages';

export function IsStringCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsStringCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isString(value);
        },
        defaultMessage() {
          return exceptionMessages.isString;
        },
      },
    });
  };
}
