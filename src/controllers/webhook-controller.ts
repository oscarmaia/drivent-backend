import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import { Stripe } from 'stripe';
import express from 'express';
import ticketService from '@/services/tickets-service';
import paymentService, { CardPaymentParams } from '@/services/payments-service';
import getRawBody from 'raw-body';
export async function webhook(req: AuthenticatedRequest, res: Response) {
  console.log('inside webhook');
  const rawBody = res.locals.raw;
  console.log('-----------------------------------------------------');
  console.log(rawBody);
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
  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  const sig = req.headers['stripe-signature'];
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15', typescript: true });
  let event;
  let paymentIntent;

  try {
    console.log('inside try/catch');
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
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
      console.log('charge succeeded');
      break;

    case 'checkout.session.completed':
      console.log('checkout session completed');
      break;

    case 'payment_intent.succeeded':
      console.log('payment intent succeeded');
      break;

    case 'payment_intent.created':
      console.log('payment intent created');
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.sendStatus(200);
}
