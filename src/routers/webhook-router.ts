import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { webhook } from '@/controllers';
import express from 'express';
const webhookRouter = Router();

webhookRouter.post('/', webhook);

export { webhookRouter };
