import { registerDecorator, ValidationOptions, isEmail } from 'class-validator';
import { exceptionMessages } from '../data/exceptionMessages';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isEmail(value);
        },
        defaultMessage() {
          return exceptionMessages.isEmail;
        },
      },
    });
  };
}
