import { pool } from "../../config/db";

const createBooking = async (data: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data;

  const result = await pool.query(
    `SELECT vehicle_name, daily_rent_price, availability_status 
     FROM Vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (result.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = result.rows[0];

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

const getBookings = async (user: any) => {
  if (user.role === "admin") {
    const result = await pool.query(`
      SELECT 
        bookings.*,
        users.name AS customer_name,
        users.email AS customer_email,
        vehicles.vehicle_name,
        vehicles.registration_number,
        vehicles.type
      FROM bookings
      LEFT JOIN users ON bookings.customer_id = users.id
      LEFT JOIN vehicles ON bookings.vehicle_id = vehicles.id
      ORDER BY bookings.id DESC
    `);
    return result.rows;
  }

  const result = await pool.query(
    `
    SELECT 
      bookings.*,
      vehicles.vehicle_name,
      vehicles.registration_number,
      vehicles.type
    FROM bookings
    LEFT JOIN vehicles ON bookings.vehicle_id = vehicles.id
    WHERE bookings.customer_id=$1
    ORDER BY bookings.id DESC
  `,
    [user.id]
  );

  return result.rows;
};

const updateBooking = async (bookingId: string, status: string, user: any) => {
  const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);
  if (result.rowCount === 0) throw new Error("Booking not found");

  const booking = result.rows[0];

  if (user.role === "customer") {
    if (status !== "cancelled")
      throw new Error("Customers can only cancel bookings");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(booking.rent_start_date);
    startDate.setHours(0, 0, 0, 0);

    if (today >= startDate)
      throw new Error("Cannot cancel booking after start date");
  }

  if (user.role === "admin" && !["cancelled", "returned"].includes(status))
    throw new Error("Invalid status update");

  const updated = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  if (["cancelled", "returned"].includes(status)) {
    await pool.query(
      `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
  }

  return updated.rows[0];
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
};
