import { prisma } from "@/config";

async function getActivities() {
  return await prisma.activity.findMany();
}

async function getActivitiesByUser( id:number ) {
  return await prisma.enrollmentActivity.findMany({
    where:{
      enrollmentId:id
    },
    include:{
      Activity:true
    }
  });
}

async function insertReservation(actID:number, enrollmentId:number) {
  return await prisma.enrollmentActivity.create({
    data:{
      enrollmentId: enrollmentId,
      activityId: actID
    },
    include: {
      Activity:true
    }
  })
}

async function deleteReservation(id:number) {
  console.log(id);
  return await prisma.enrollmentActivity.delete({
    where:{
      id: id 
    }

  })
}

const activitiesRepository = {
  getActivities,
  getActivitiesByUser,
  insertReservation,
  deleteReservation
};

export default activitiesRepository;
