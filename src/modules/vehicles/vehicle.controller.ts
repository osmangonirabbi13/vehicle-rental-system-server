import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicles = async (req: Request, res: Response) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: only admin can create vehicles",
    });
  }

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

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicle();
    res.status(200).json({
      success: true,
      message: result.rows.length
        ? "Vehicles retrieved successfully"
        : "No vehicles found",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicleDetails = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicleDetails(
      req.params.id as string
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: only admin can update  vehicles",
    });
  }

  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;
    const result = await vehicleServices.updateVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      req.params.id!
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: only admin can delete vehicles",
    });
  }

  try {
    const result = await vehicleServices.deleteVehicle(req.params.id!);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleControllers = {
  createVehicles,
  getVehicle,
  getVehicleDetails,
  deleteVehicle,
  updateVehicle,
};
