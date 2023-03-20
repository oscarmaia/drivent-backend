import { deleteReservation, getActivities, getActivitiesByUser, insertReservation } from "@/controllers/activities-controller";
import { authenticateToken } from '@/middlewares';
import express from 'express';

const activitiesRouter = express();

activitiesRouter.get('/', authenticateToken, getActivities);
activitiesRouter.get("/user", getActivitiesByUser);
activitiesRouter.post("/", insertReservation);
activitiesRouter.delete("/:reserveId", deleteReservation);

export { activitiesRouter };
