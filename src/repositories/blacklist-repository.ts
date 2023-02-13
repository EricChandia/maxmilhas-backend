import { prisma } from '@/config';
import { BlacklistedCpf, BlacklistedCpfWithoutId, InsertBlacklistData } from '@/types/blacklistType';
import { Blacklist } from '@prisma/client';

export async function create(data: InsertBlacklistData): Promise<Blacklist> {
  return prisma.blacklist.create({ data });
}

export async function findById(id: number): Promise<Blacklist> {
  return prisma.blacklist.findUnique({
    where: { id },
  });
}

export async function findByCpf(cpf: string): Promise<BlacklistedCpf> {
  return prisma.blacklist.findFirst({
    where: { cpf, removedAt: null },
    select: { id: true, cpf: true, createdAt: true },
  });
}

export async function remove(id: number, removedAt: Date): Promise<BlacklistedCpf> {
  return await prisma.blacklist.update({
    where: { id },
    data: { removedAt },
  });
}

export async function findAll(): Promise<BlacklistedCpfWithoutId[]> {
  return await prisma.blacklist.findMany({
    where: { removedAt: null },
    select: { cpf: true, createdAt: true },
  });
}
