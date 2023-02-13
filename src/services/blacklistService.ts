import { BlacklistedCpf, BlacklistedCpfWithoutId, InsertBlacklistData } from '@/types/blacklistType';
import * as blacklistRepository from '../repositories/blacklist-repository';
import { InvalidCpfException, ExistsCpfException, NotFoundCpfException } from '@/errors/errors';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { Blacklist } from '@prisma/client';

async function addCpfToBlacklist(cpf: string): Promise<Blacklist> {
  const cpfExists: BlacklistedCpf = await blacklistRepository.findByCpf(cpf);

  if (cpfExists) throw ExistsCpfException();

  if (!cpfValidator.isValid(cpf)) throw InvalidCpfException();

  const insertBlacklistData: InsertBlacklistData = { cpf };

  return await blacklistRepository.create(insertBlacklistData);
}

async function checkCpf(cpf: string): Promise<BlacklistedCpfWithoutId> {
  if (!cpfValidator.isValid(cpf)) throw InvalidCpfException();

  const blacklistedCpfData: BlacklistedCpf = await blacklistRepository.findByCpf(cpf);

  if (!blacklistedCpfData) throw NotFoundCpfException();

  delete blacklistedCpfData.id;

  return blacklistedCpfData;
}

async function removeCpf(cpf: string) {
  if (!cpfValidator.isValid(cpf)) throw InvalidCpfException();

  const blacklistedCpfData: BlacklistedCpf = await blacklistRepository.findByCpf(cpf);

  if (!blacklistedCpfData) throw NotFoundCpfException();

  return await blacklistRepository.remove(blacklistedCpfData.id, new Date());
}

async function findAllCpfs(): Promise<BlacklistedCpfWithoutId[]> {
  const blacklitedCpfList: BlacklistedCpfWithoutId[] = await blacklistRepository.findAll();

  return blacklitedCpfList;
}

const blacklistService = { addCpfToBlacklist, checkCpf, removeCpf, findAllCpfs };

export default blacklistService;
