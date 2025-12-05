import express, { Request, Response } from "express";
import cofig from "./config";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/user.routes";
const app = express();
const PORT = cofig.port;

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//DATABASE CONNECT

initDB();

//Auth Routes
app.use("/api/v1/auth/", authRoutes);

//User Routes
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on post ${PORT}`);
});
