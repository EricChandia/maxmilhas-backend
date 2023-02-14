import { blacklistService } from '../../src/services/blacklistService';
import { blacklistRepository } from '../../src/repositories/blacklist-repository';
import { jest } from '@jest/globals';
import { createCpf, createBlacklistedCpf, createBlacklist } from '../factories/cpfFactory';
import { init } from '../../src/app';
import { BlacklistedCpf } from '../../src/types/blacklistTypes';
import { Blacklist } from '@prisma/client';

beforeAll(async () => {
  await init();
});

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('Testes unitários da blacklistService', () => {
  it('Deve adicionar um cpf à blacklist', async () => {
    const cpf: string = createCpf();

    jest.spyOn(blacklistRepository, 'findByCpf').mockResolvedValue(null);
    jest.spyOn(blacklistRepository, 'create').mockResolvedValue(createBlacklist());

    const blacklistedCpf = await blacklistService.addCpfToBlacklist(cpf);

    expect(blacklistRepository.findByCpf).toBeCalled();
    expect(blacklistRepository.create).toBeCalled();
    expect(blacklistedCpf).toHaveProperty('id');
    expect(blacklistedCpf).toHaveProperty('cpf');
    expect(blacklistedCpf).toHaveProperty('createdAt');
    expect(blacklistedCpf).toHaveProperty('removedAt');
  });

  it('Deve tentar adicionar um cpf à blacklist mas receber um erro por já existir', async () => {
    const blacklistedCpf: Blacklist = createBlacklist();

    jest.spyOn(blacklistRepository, 'findByCpf').mockResolvedValue(blacklistedCpf);
    jest.spyOn(blacklistRepository, 'create').mockResolvedValue(blacklistedCpf);

    const promise = blacklistService.addCpfToBlacklist(blacklistedCpf.cpf);

    expect(promise).rejects.toEqual({
      name: 'ExistsCpfException',
      message: 'This cpf already exists in blacklist.',
    });
    expect(blacklistRepository.findByCpf).toBeCalled();
    expect(blacklistRepository.create).not.toBeCalled();
  });
});
