import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelsWithRooms, getHotelsWithRoomsWithoutId } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelsWithRooms)
  .get("/withRooms", getHotelsWithRoomsWithoutId)
export { hotelsRouter };
