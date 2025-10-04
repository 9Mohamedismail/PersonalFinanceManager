export type PasswordRule = {
  id: string;
  message: string;
  test: (value: string, username?: string) => boolean;
};

export const passwordRules: PasswordRule[] = [
  {
    id: "lower",
    message: "One lowercase character",
    test: (value) => /[a-z]/.test(value),
  },
  {
    id: "upper",
    message: "One uppercase character",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: "digit",
    message: "One number",
    test: (value) => /\d/.test(value),
  },
  {
    id: "special",
    message: "One special character",
    test: (value) => /[^a-zA-Z0-9]/.test(value),
  },
  {
    id: "len8",
    message: "8 characters minimum",
    test: (value) => value.length >= 8,
  },
];

export const noUsername: PasswordRule = {
  id: "no-username",
  message: "Must not contain username",
  test: (value, username = "") =>
    username.length > 0
      ? !value.toLowerCase().includes(username.toLowerCase())
      : true,
};

export const matchPassword = (
  password: string,
  confirm: string
): PasswordRule => ({
  id: "confirm",
  message: "Passwords must match",
  test: () => password === confirm,
});

export function validatePassword(password: string, username = "") {
  return passwordRules.filter((rule) => !rule.test(password, username));
}
