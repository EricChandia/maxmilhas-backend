import { prisma } from '@/config';
import { BlacklistedCpf, InsertBlacklistData } from '@/types/blacklistTypes';
import { Blacklist } from '@prisma/client';

export async function create(data: InsertBlacklistData): Promise<Blacklist> {
  return prisma.blacklist.create({ data });
}

export async function findIdByCpf(cpf: string) {
  const blacklistedCpf = await prisma.blacklist.findFirst({
    where: { cpf, removedAt: null },
    select: { id: true },
  });

  if (!blacklistedCpf) return null;

  return blacklistedCpf.id;
}

async function findByCpf(cpf: string): Promise<BlacklistedCpf> {
  return await prisma.blacklist.findFirst({
    where: { cpf, removedAt: null },
    select: { cpf: true, createdAt: true },
  });
}

export async function remove(id: number, removedAt: Date): Promise<Blacklist> {
  return await prisma.blacklist.update({
    where: { id },
    data: { removedAt },
  });
}

export async function findAll(): Promise<BlacklistedCpf[]> {
  return await prisma.blacklist.findMany({
    where: { removedAt: null },
    select: { cpf: true, createdAt: true },
  });
}

export const blacklistRepository = { create, findIdByCpf, findByCpf, remove, findAll };
