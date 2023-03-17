import { getActivities } from '@/controllers/activities-controller';
import { authenticateToken } from '@/middlewares';
import express from 'express';

const activitiesRouter = express();

activitiesRouter.get('/', authenticateToken, getActivities);

export { activitiesRouter };
