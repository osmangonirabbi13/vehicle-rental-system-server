import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicles(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const vehicleControllers = {
  createVehicles,
};
