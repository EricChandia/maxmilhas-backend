import Joi from 'joi';
import { InsertBlacklistData } from '@/types/blacklistType';

export const cpfSchema = Joi.object<InsertBlacklistData>({
  cpf: Joi.string().min(11).max(11).required(),
});
