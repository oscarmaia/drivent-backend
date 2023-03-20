import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";
import enrollmentsService from "@/services/enrollments-service";

export async function getActivities(_req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getActivities();
    return res.send(activities).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getActivitiesByUser(_req: AuthenticatedRequest, res: Response) {
  try {
    const enrollments = await enrollmentsService.getOneWithAddressByUserId(_req.userId);
    const activities = await activitiesService.getActivitiesByUser(enrollments.id);
    return res.send(activities).status(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function insertReservation(_req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = _req.body;
    const enrollments = await enrollmentsService.getOneWithAddressByUserId(_req.userId);
    const activity = await activitiesService.insertReservation(id, enrollments.id);

    return res.send(activity).status(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteReservation(_req: AuthenticatedRequest, res: Response) {
  try {
    const { reserveId } = _req.params;
    const activity = await activitiesService.deleteReservation(Number(reserveId));

    return res.send(activity ).status(httpStatus.OK);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}