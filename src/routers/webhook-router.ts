import { Router } from 'express';
import { webhook } from '@/controllers';
const webhookRouter = Router();

webhookRouter.post('/', webhook);

export { webhookRouter };
