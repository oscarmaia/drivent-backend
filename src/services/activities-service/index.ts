import activitiesRepository from "@/repositories/activities-repository";

async function getActivities() {
  return await activitiesRepository.getActivities();
}

async function getActivitiesByUser(id:number) {
  return await activitiesRepository.getActivitiesByUser( id );
}

async function insertReservation(actID:number, enrollmentId:number) {
  return await activitiesRepository.insertReservation( actID, enrollmentId );
}

async function deleteReservation(ReservationId:number) {
  return await activitiesRepository.deleteReservation( ReservationId );
}

const activitiesService = {
  getActivities,
  getActivitiesByUser,
  insertReservation,
  deleteReservation
};

export default activitiesService;
