import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }
  let createdTicketTypes;
  let ticketTypes = await prisma.ticketType.findFirst();
  if (!ticketTypes) {
    createdTicketTypes = await prisma.ticketType.createMany({
      data: [
        { name: 'Online', price: 10000, includesHotel: false, isRemote: true },
        { name: 'Presencial', price: 60000, includesHotel: true, isRemote: false },
        {
          name: 'Presencial',
          price: 25000,
          includesHotel: false,
          isRemote: false,
        },
      ],
    });
  }

  console.log({ event });
  console.log({ createdTicketTypes });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
