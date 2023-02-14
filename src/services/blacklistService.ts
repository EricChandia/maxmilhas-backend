import { BlacklistedCpf, InsertBlacklistData } from '@/types/blacklistTypes';
import * as blacklistRepository from '../repositories/blacklist-repository';
import { InvalidCpfException, ExistsCpfException, NotFoundCpfException } from '@/errors';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { Blacklist } from '@prisma/client';

async function addCpfToBlacklist(cpf: string): Promise<Blacklist> {
  const cpfExists: BlacklistedCpf = await blacklistRepository.findByCpf(cpf);

  if (cpfExists) throw ExistsCpfException();

  if (!cpfValidator.isValid(cpf)) throw InvalidCpfException();

  const insertBlacklistData: InsertBlacklistData = { cpf };

  return await blacklistRepository.create(insertBlacklistData);
}

async function checkCpf(cpf: string): Promise<BlacklistedCpf> {
  if (!cpfValidator.isValid(cpf)) throw InvalidCpfException();

  const blacklistedCpfData: BlacklistedCpf = await blacklistRepository.findByCpf(cpf);

  if (!blacklistedCpfData) throw NotFoundCpfException();

  return blacklistedCpfData;
}

async function removeCpf(cpf: string): Promise<Blacklist> {
  if (!cpfValidator.isValid(cpf)) throw InvalidCpfException();

  const blacklistedCpfId = await blacklistRepository.findIdByCpf(cpf);

  if (!blacklistedCpfId) throw NotFoundCpfException();

  return await blacklistRepository.remove(blacklistedCpfId, new Date());
}

async function findAllCpfs(): Promise<BlacklistedCpf[]> {
  const blacklitedCpfList: BlacklistedCpf[] = await blacklistRepository.findAll();

  return blacklitedCpfList;
}

const blacklistService = { addCpfToBlacklist, checkCpf, removeCpf, findAllCpfs };

export default blacklistService;
