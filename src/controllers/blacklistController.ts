import { Response, Request } from 'express';
import blacklistService from '@/services/blacklistService';
import { BlacklistedCpfWithoutId } from '@/types/blacklistType';

export async function addCpfToBlacklist(req: Request, res: Response) {
  const { cpf }: { cpf: string } = req.body;

  await blacklistService.addCpfToBlacklist(cpf);

  res.sendStatus(201);
}

export async function checkCpf(req: Request, res: Response) {
  const cpf: string = req.params.cpf;

  const blacklistedCpfData: BlacklistedCpfWithoutId = await blacklistService.checkCpf(cpf);

  res.status(200).send(blacklistedCpfData);
}

export async function removeCpf(req: Request, res: Response) {
  const cpf: string = req.params.cpf;

  await blacklistService.removeCpf(cpf);

  res.sendStatus(200);
}

export async function findAllCpfs(req: Request, res: Response) {
  const blacklistedCpfsList: BlacklistedCpfWithoutId[] = await blacklistService.findAllCpfs();

  res.status(200).send(blacklistedCpfsList);
}
