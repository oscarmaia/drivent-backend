import activitiesRepository from "@/repositories/activities-repository";

async function getActivities() {
  return await activitiesRepository.getActivities();
}

const activitiesService = {
  getActivities,
};

export default activitiesService;
