import express from "express";
import { rateLimiter } from './../middlewares/rateLimter.js';
import { assignDriver, createVehicle, getVehicle } from './../controllers/vehicle.controller.js';

const router = express.Router();

router.post("/add", rateLimiter, createVehicle);
router.patch("/assign-driver/:vehicleId",assignDriver);
router.get("/:vehicleId", getVehicle);

export default router;