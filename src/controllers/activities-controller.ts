import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from '@/services/activities-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getActivities(_req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getActivities();
    return res.send(activities).status(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
