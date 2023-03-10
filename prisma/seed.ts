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

  let hotels;
  hotels = await prisma.hotel.findFirst();
  if (!hotels) {
    hotels = await prisma.hotel.createMany({
      data: [
        {
          name: 'Driven Resort',
          image:
            'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_871,h_581/https://blog.hotelpontaverde.com.br/wp-content/uploads/2019/09/Resort-ou-Hotel-Hotel-Ponta-Verde-France%CC%82s.png',
        },
        {
          name: 'Driven Palace',
          image:
            'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/ac/91/83/facade-daylight.jpg?w=700&h=-1&s=1',
        },

        {
          name: 'Driven World',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiCgJ5pckSYv1bj2CQKf6C7Jv8_7EbbvgAAw&usqp=CAU',
        },
      ],
    });
  }

  let rooms;
  rooms = await prisma.room.findFirst();
  if (!rooms) {
    rooms = await prisma.room.createMany({
      data: [
        {
          name: 'Single e Double',
          capacity: 103,
          hotelId: 1,
        },
        {
          name: 'Single, Double e Triple',
          capacity: 25,
          hotelId: 2,
        },
        {
          name: 'Single e Double',
          capacity: 7,
          hotelId: 3,
        },
      ],
    });
  }

  console.log({ event });
  console.log({ createdTicketTypes });
  console.log(hotels);
  console.log(rooms);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
