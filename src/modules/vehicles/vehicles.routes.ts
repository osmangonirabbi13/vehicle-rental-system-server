import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

router.post("/", vehicleControllers.createVehicles);
router.get("/", vehicleControllers.getVehicle);
router.get("/:id", vehicleControllers.getVehicleDetails);

export const vehiclesRoutes = router;
