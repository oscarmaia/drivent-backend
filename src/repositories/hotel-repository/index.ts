import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    }
  });
}

async function getHotelsWithRoomsWithoutId(){
  return prisma.hotel.findMany()
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  getHotelsWithRoomsWithoutId
};

export default hotelRepository;
