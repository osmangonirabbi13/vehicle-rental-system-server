import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE CHECK (email = LOWER(email)),
        password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(10) NOT NULL 
        )
        `);
};

export default initDB;
