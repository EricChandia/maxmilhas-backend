import { Router } from 'express';
import { addCpfToBlacklist, checkCpf, findAllCpfs, removeCpf } from '@/controllers/blacklistController';
import { validateBody, validateParams } from '@/middlewares/validation-middleware';
import { cpfSchema } from '@/schemas/blacklistSchema';

const blacklistRoute = Router();

blacklistRoute.post('/cpf', validateBody(cpfSchema), addCpfToBlacklist);
blacklistRoute.get('/cpf/:cpf', validateParams(cpfSchema), checkCpf);
blacklistRoute.delete('/cpf/:cpf', validateParams(cpfSchema), removeCpf);
blacklistRoute.get('/cpf', findAllCpfs);

export default blacklistRoute;
