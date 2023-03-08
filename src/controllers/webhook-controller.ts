import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import { Stripe } from 'stripe';
import express from 'express';
import ticketService from '@/services/tickets-service';
import paymentService, { CardPaymentParams } from '@/services/payments-service';
export async function webhook(req: AuthenticatedRequest, res: Response) {
  interface PaymentIntent {
    id: string;
    amount_total: number;
    customer: string;
    email: string;
    name: string;
  }

  interface Customer {
    id: string;
    metadata: { userId: number };
  }
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  express.raw({ type: 'application/json' });
  const endpointSecret = 'whsec_84ed9acb8995b9ca21ef5132a5938116904b55ee0c9232fc81969b99426e5074';

  const sig = req.headers['stripe-signature'];
  const stripe = new Stripe(
    'sk_test_51MgWxFISQEBLnJ28cwCnvr9IvtNuakYaBnWBdnvIBIZDbTlEAuWQ6HadTy14h6yrl9qhzgB7SmDpQnLDw3mmKtvc00PargztcX',
    { apiVersion: '2022-11-15', typescript: true },
  );
  let event;
  let paymentIntent;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    paymentIntent = event.data.object as PaymentIntent;
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case 'charge.succeeded':
      const customerId = paymentIntent.customer.toString();
      const customer = await stripe.customers.retrieve(customerId);
      let customerMetadata = customer as unknown;
      let newMeta = customerMetadata as Customer;
      const userId = Number(newMeta.metadata.userId);
      const ticket = await ticketService.getTicketByUserId(userId);
      const cardPayment = {
        cvv: 142,
        issuer: 'Visa',
        name: 'Teste',
        number: 4242424242424242,
      } as CardPaymentParams;
      await paymentService.paymentProcess(ticket.id, userId, cardPayment);
      break;

    case 'checkout.session.completed':
      console.log('sucesso');
      break;

    case 'payment_intent.succeeded':
      break;

    case 'payment_intent.created':
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.sendStatus(200);
}
