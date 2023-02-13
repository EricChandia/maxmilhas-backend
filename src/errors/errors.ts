export type ApplicationError = {
  name: string;
  message: string;
};

export function NotFoundCpfException(): ApplicationError {
  return {
    name: 'NotFoundCpfException',
    message: 'This cpf does not exists.',
  };
}

export function InvalidCpfException(): ApplicationError {
  return {
    name: 'InvalidCpfException',
    message: 'CPF is not valid.',
  };
}

export function ExistsCpfException(): ApplicationError {
  return {
    name: 'ExistsCpfException',
    message: 'This cpf already exists in blacklist.',
  };
}

export function invalidDataError(details: string[]): ApplicationInvalidateDataError {
  return {
    name: 'InvalidDataError',
    message: 'Invalid data',
    details,
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};
