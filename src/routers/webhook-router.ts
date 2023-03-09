import { Router } from 'express';
import { webhook } from '@/controllers';
const webhookRouter = Router();
import bodyParser from 'body-parser';

webhookRouter.post('/', webhook);

export { webhookRouter };
