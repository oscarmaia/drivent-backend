import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPaymentByTicketId, paymentStripe } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .post('/create-checkout-session', paymentStripe)
  .get('/', getPaymentByTicketId);

export { paymentsRouter };
