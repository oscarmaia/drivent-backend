import { notFoundError, unauthorizedError, requestError } from '@/errors';
import paymentRepository, { PaymentParams } from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { Stripe } from 'stripe';
import ticketService from '../tickets-service';

export async function paymentStripe(userId: number) {
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if (!ticket) {
      throw notFoundError();
    }
    const stripe = new Stripe(
      'sk_test_51MgWxFISQEBLnJ28cwCnvr9IvtNuakYaBnWBdnvIBIZDbTlEAuWQ6HadTy14h6yrl9qhzgB7SmDpQnLDw3mmKtvc00PargztcX',
      { apiVersion: '2022-11-15' },
    );
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: ticket.TicketType.name,
            },
            unit_amount: ticket.TicketType.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/dashboard/payment',
      cancel_url: 'http://localhost:3000/dashboard/payment',
    });
    if (session.url) {
      return session.url;
    } else {
      return requestError(500, 'STRIPE ERROR');
    }
  } catch (error) {
    console.log(error);
  }
}

async function verifyTicketAndEnrollment(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardPaymentParams) {
  await verifyTicketAndEnrollment(ticketId, userId);

  const ticket = await ticketRepository.findTickeWithTypeById(ticketId);

  const paymentData = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(ticketId, paymentData);

  await ticketRepository.ticketProcessPayment(ticketId);

  return payment;
}

export type CardPaymentParams = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentService = {
  getPaymentByTicketId,
  paymentProcess,
  paymentStripe,
};

export default paymentService;
