import { cpf as cpfGenerator } from 'cpf-cnpj-validator';

export function createCpf() {
  const cpf = cpfGenerator.generate();
  return cpf;
}
