import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: any, res: Response) => {
  try {
    const customer_id = req.user.id;
    if (!customer_id) {
      throw new Error("User ID not found in token");
    }

    const data = await bookingServices.createBooking({
      ...req.body,
      customer_id,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: any, res: Response) => {
  try {
    const bookings = await bookingServices.getBookings(req.user);

    const formatted = bookings.map((booking: any) => {
      const base = {
        id: booking.id,
        customer_id: booking.customer_id,
        vehicle_id: booking.vehicle_id,
        rent_start_date: booking.rent_start_date,
        rent_end_date: booking.rent_end_date,
        total_price: booking.total_price,
        status: booking.status,
      };

      if (req.user.role === "admin") {
        return {
          ...base,
          customer: { name: booking.customer_name, email: booking.customer_email },
          vehicle: {
            vehicle_name: booking.vehicle_name,
            registration_number:booking.registration_number,
          },
        };
      }

      return {
        ...base,
        vehicle: {
          vehicle_name: booking.vehicle_name,
          registration_number: booking.registration_number,
          type: booking.type,
        },
      };
    });

    res.status(200).json({
      success: true,
      message:
        req.user.role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: formatted,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateBooking = async (req: any, res: Response) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    const updated = await bookingServices.updateBooking(
      bookingId,
      status,
      req.user
    );

    res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: updated,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBooking,
};
