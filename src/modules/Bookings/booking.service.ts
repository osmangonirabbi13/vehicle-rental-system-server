import { pool } from "../../config/db";

const createBooking = async (data: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data;

  // Fetch vehicle info
  const vehicleQuery = await pool.query(
    `SELECT vehicle_name, daily_rent_price, availability_status 
     FROM Vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleQuery.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleQuery.rows[0];

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available");
  }

  
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
  );

  if (days <= 0) throw new Error("Invalid rent dates");

  const total_price = vehicle.daily_rent_price * days;


  const bookingResult = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1,$2,$3,$4,$5,'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  const booking = bookingResult.rows[0];

  // Update vehicle status
  await pool.query(
    `UPDATE Vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  
  return {
    ...booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

export const bookingServices = {
  createBooking,
};
