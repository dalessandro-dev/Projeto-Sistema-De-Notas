export const exceptionMessages = {
  isNotEmpty: 'O campo é obrigatório',
  isEmail: 'O campo deve ser um e-mail',
  isString: 'O campo deve ser uma String',
  minLength: (minLength: number) =>
    `O campo deve ter um tamanho mínimo de ${minLength} caracteres`,
};
