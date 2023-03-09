import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { webhook } from '@/controllers';
import express from 'express';
const webhookRouter = Router();
import bodyParser from 'body-parser';

webhookRouter.post(
  '/',
  bodyParser.raw({ type: 'application/json' }),
  (req, res, next) => {
    console.log('webhook route');
    next();
  },
  webhook,
);

export { webhookRouter };
