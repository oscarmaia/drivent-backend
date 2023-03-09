import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { webhook } from '@/controllers';
import express from 'express';
const webhookRouter = Router();

webhookRouter.post('/',(req,res,next)=>{
console.log("webhook route")
next()
}, webhook);

export { webhookRouter };
