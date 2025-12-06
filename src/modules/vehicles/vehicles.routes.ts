import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",auth("admin") ,vehicleControllers.createVehicles);
router.get("/", vehicleControllers.getVehicle);
router.get("/:id", vehicleControllers.getVehicleDetails);
router.put("/:id" ,auth("admin") , vehicleControllers.updateVehicle)
router.delete("/:id",auth("admin") , vehicleControllers.deleteVehicle);

export const vehiclesRoutes = router;