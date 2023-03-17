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
  };
  let acitivities
  acitivities = await prisma.activity.findFirst();
    if (!acitivities) {
      acitivities = await prisma.activity.createMany({
        data: [
          {
            name: 'Mincecraft: montando o PC ideal',
            date: '03/04/2023',
            place: 'principal',
            startsAt: '0900',
            endsAt: '1000'
          },
          {
            name: 'Lol: montando o PC ideal',
            date: '03/04/2023',
            place: 'principal',
            startsAt: '1000',
            endsAt: '1100',
          },
          {
            name: 'Roblox, montando o PC ideal',
            date: '03/04/2023',
            place: 'principal',
            startsAt: '1100',
            endsAt: '1200',
          },
          {
            name: 'CS: montando o PC ideal',
            date: '04/04/2023',
            place: 'principal',
            startsAt: '0900',
            endsAt: '1000',
          },
          {
            name: 'The Last Of Us: montando o PC ideal',
            date: '04/04/2023',
            place: 'principal',
            startsAt: '1000',
            endsAt: '1100',
          },
          {
            name: 'Fifa: montando o PC ideal',
            date: '04/04/2023',
            place: 'principal',
            startsAt: '1300',
            endsAt: '1500',
          },
          {
            name: 'Among Us: montando o PC ideal',
            date: '04/04/2023',
            place: 'principal',
            startsAt: '0900',
            endsAt: '1000',
          },
          {
            name: 'F1 2022: montando o PC ideal',
            date: '04/04/2023',
            place: 'principal',
            startsAt: '1000',
            endsAt: '1100',
          },
          {
            name: 'Palestra com José Valim',
            date: '03/04/2023',
            place: 'lateral',
            startsAt: '0900',
            endsAt: '1200',
          },
          {
            name: 'Palestra com Dennis Ritchie',
            date: '03/04/2023',
            place: 'lateral',
            startsAt: '1300',
            endsAt: '1500',
          },
          {
            name: 'Palestra com Linus Torvalds',
            date: '04/04/2023',
            place: 'lateral',
            startsAt: '0900',
            endsAt: '1200',
          },
          {
            name: 'Palestra com Guido van Rossum',
            date: '04/04/2023',
            place: 'lateral',
            startsAt: '1300',
            endsAt: '1500',
          },
          {
            name: 'Palestra com Bjarne Stroustrup',
            date: '05/04/2023',
            place: 'lateral',
            startsAt: '0900',
            endsAt: '1200',
          },
          {
            name: 'Palestra com Tim Berners-Lee',
            date: '05/04/2023',
            place: 'lateral',
            startsAt: '1300',
            endsAt: '1500',
          },
          {
            name: 'Workshop Python',
            date: '03/04/2023',
            place: 'workshop',
            startsAt: '0900',
            endsAt: '1200',
          },
          {
            name: 'Workshop JavaScript',
            date: '03/04/2023',
            place: 'workshop',
            startsAt: '1300',
            endsAt: '1500',
          },
          {
            name: 'Workshop Go',
            date: '04/04/2023',
            place: 'workshop',
            startsAt: '0900',
            endsAt: '1200',
          },
          {
            name: 'Workshop Rust',
            date: '04/04/2023',
            place: 'workshop',
            startsAt: '1300',
            endsAt: '1500',
          },
          {
            name: 'Workshop Ruby',
            date: '05/04/2023',
            place: 'workshop',
            startsAt: '0900',
            endsAt: '1200',
          },
          {
            name: 'Workshop Java',
            date: '05/04/2023',
            place: 'workshop',
            startsAt: '1300',
            endsAt: '1500',
          },
        ],
      });

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
  }

  type Rooms = {
    name: string;
    capacity: number;
    hotelId: number;
  };
  let roomsData1: Rooms[] = [];

  let roomsData2: Rooms[] = [];
  let roomsData3: Rooms[] = [];
  let rooms;

  for (let i = 1; i <= 16; i++) {
    let data: Rooms;
    data = {
      name: (100 + i).toString(),
      capacity: Math.floor(Math.random() * 3) + 1,
      hotelId: 1,
    };
    roomsData1.push(data);
  }

  for (let i = 1; i <= 16; i++) {
    let data = {
      name: (100 + i).toString(),
      capacity: Math.floor(Math.random() * 2) + 1,
      hotelId: 2,
    };
    roomsData2.push(data);
  }
  for (let i = 1; i <= 16; i++) {
    let data = {
      name: (100 + i).toString(),
      capacity: Math.floor(Math.random() * 1) + 1,
      hotelId: 3,
    };
    roomsData3.push(data);
  }
  const mergedRooms = roomsData1.concat(roomsData2.concat(roomsData3));

  rooms = await prisma.room.findFirst();
  if (!rooms) {
    rooms = await prisma.room.createMany({
      data: mergedRooms,
    });
  }

  console.log({ event });
  console.log({ createdTicketTypes });
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
