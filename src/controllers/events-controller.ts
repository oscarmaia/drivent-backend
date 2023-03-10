import { redis } from '@/app';
import eventsService from '@/services/events-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getDefaultEvent(_req: Request, res: Response) {
  const cacheKey = 'event';
  try {
    const cachedEvent = await redis.get(cacheKey);
    if (cachedEvent) {
      res.send(JSON.parse(cachedEvent));
    } else {
      const event = await eventsService.getFirstEvent();
      redis.set(cacheKey, JSON.stringify(event));
      return res.status(httpStatus.OK).send(event);
    }
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
