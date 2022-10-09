export namespace RuleCaption {

  export const parameterError = (field: string | null): string => {
    return `Error query paramener: ${field}`;
  };

  export const required = (field: string | null): string => {
    if (field) return `Поле ${field} является обязательным для заполнения`;
    return `Поле является обязательным для заполнения`;
  };

  export const length = (min: number, max: number): string => {
    return `Длина поля должна быть в диапазоне от ${min} до ${max} символов`;
  };

  export const lengthMax = (max: number): string => {
    return `Длина поля должна быть меньше ${max} символов`;
  };

  export const lengthMin = (min: number): string => {
    return `Длина поля должна быть больше ${min} символов`;
  };

  export const requiredFieldsNotAssigned = (): string => {
    return 'Some fields are not filled';
  };
}
