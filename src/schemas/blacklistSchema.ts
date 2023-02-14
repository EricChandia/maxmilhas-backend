import Joi from 'joi';
import { InsertBlacklistData } from '@/types/blacklistTypes';

export const cpfSchema = Joi.object<InsertBlacklistData>({
  cpf: Joi.string().min(11).max(11).required(),
});
