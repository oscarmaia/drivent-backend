import { prisma } from '@/config';

async function getActivities() {
  return await prisma.activity.findMany();
}

const activitiesRepository = {
  getActivities,
};

export default activitiesRepository;
