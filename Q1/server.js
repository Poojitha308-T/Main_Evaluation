import express from "express";
import dotenv from 'dotenv';
import { logger } from './src/middlewares/logger.js';
import { notFound } from './src/middlewares/notFound.js';
import userrRoutes from "./src/routes/userrs.routes.js";
import vehicleRoutes from "./src/routes/vehicles.routes.js";
import tripRoutes from "./src/routes/trips.routes.js";
import analyticsRoutes from "./src/routes/analytics.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

app.use("/userrs",userrRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/trips", tripRoutes);
app.use("/analaytics", analyticsRoutes);

app.use(notFound);

app.listen(3000, ()=>{
    console.log("Server running")
})
