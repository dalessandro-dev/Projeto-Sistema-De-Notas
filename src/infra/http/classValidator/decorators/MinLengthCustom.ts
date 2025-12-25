import {
  registerDecorator,
  ValidationOptions,
  minLength,
} from 'class-validator';
import { exceptionMessages } from '../data/exceptionMessages';

export function MinLengthCustom(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsMinLengthCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return minLength(value, min);
        },
        defaultMessage() {
          return exceptionMessages.minLength(min);
        },
      },
    });
  };
}
