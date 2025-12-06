import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `
        INSERT INTO Vehicles (vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getVehicle = async () => {
  const result = await pool.query(`SELECT * FROM Vehicles`);
  return result;
};

const getVehicleDetails = async (id: string) => {
  const result = await pool.query(`SELECT * FROM Vehicles WHERE id = $1`, [id]);
  return result;
};

const updateVehicle = async (
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: string,
  availability_status: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE Vehicles 
     SET 
        vehicle_name = $1,
        type = $2,
        registration_number = $3,
        daily_rent_price = $4,
        availability_status = $5
     WHERE id = $6
     RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  return result;
};

const deleteVehicle = async (id: string) => {
  const result = await pool.query(` DELETE FROM Vehicles WHERE id = $1`, [id]);
  return result;
};

export const vehicleServices = {
  createVehicles,
  getVehicle,
  getVehicleDetails,
  deleteVehicle,
  updateVehicle,
};