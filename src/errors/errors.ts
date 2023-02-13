export type ApplicationError = {
  name: string;
  message: string;
};

export function notFoundError(): ApplicationError {
  return {
    name: 'NotFoundCpfException',
    message: 'This cpf does not exists.',
  };
}

export function InvalidCpfException(): ApplicationError {
  return {
    name: 'InvalidCpfException',
    message: 'This cpf is invalid.',
  };
}

export function ExistsCpfException(): ApplicationError {
  return {
    name: 'ExistsCpfException',
    message: 'This cpf already exists in blacklist.',
  };
}
