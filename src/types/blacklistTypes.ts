import { Blacklist } from '@prisma/client';

export type InsertBlacklistData = Pick<Blacklist, 'cpf'>;
export type BlacklistedCpf = Omit<Blacklist, 'id' | 'removedAt'>;
