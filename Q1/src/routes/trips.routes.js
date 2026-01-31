import express from "express";
import { createTrip, deleteTrip, endTrip, getTrip, updateTrip } from './../controllers/trip.controller.js';

const router = express.Router();

router.post("/create", createTrip);
router.get("/tripId", getTrip);
router.patch("/update/:tripId", updateTrip);
router.delete("/delete/:tripId", deleteTrip);
router.patch("/end/:tripId", endTrip);
