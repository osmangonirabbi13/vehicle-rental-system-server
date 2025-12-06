import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",auth("admin") ,vehicleControllers.createVehicles);
router.get("/", vehicleControllers.getVehicle);
router.get("/:id", vehicleControllers.getVehicleDetails);
router.put("/:id" , vehicleControllers.updateVehicle)
router.delete("/:id", vehicleControllers.deleteVehicle);

export const vehiclesRoutes = router;
