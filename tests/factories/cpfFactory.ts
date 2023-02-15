import { Blacklist } from '@prisma/client';
import { cpf as cpfGenerator } from 'cpf-cnpj-validator';
import { BlacklistedCpf } from '../../src/types/blacklistTypes';

export function createCpf(): string {
  const cpf: string = cpfGenerator.generate();
  return cpf;
}

export function createBlacklistedCpf(): BlacklistedCpf {
  return { cpf: createCpf(), createdAt: new Date() };
}

export function createBlacklist(): Blacklist {
  return { id: 1, cpf: createCpf(), createdAt: new Date(), removedAt: null };
}

export function createBlacklistedCpfList(): BlacklistedCpf[] {
  const blacklistedCpfsList: BlacklistedCpf[] = [];

  for (let i = 0; i < 10; i++) {
    blacklistedCpfsList.push(createBlacklistedCpf());
  }

  return blacklistedCpfsList;
}