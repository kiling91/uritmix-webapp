export namespace AuthDomain {
  export const PasswordMinLength = 6;
  export const PasswordMaxLength = 64;

  export const NameAndEmailMinLength = 2;
  export const NameAndEmailMaxLength = 64;
}

export namespace PersonDomain {
  export const PersonNameAndEmailMinLength = 2;
  export const PersonNameAndEmailMaxLength = 64;
  export const DescriptionMaxLength = 64;
}
