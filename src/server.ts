import express, { Request, Response } from "express";
import cofig from "./config";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();
const PORT = cofig.port;


// parser
app.use(express.json());

//DATABASE CONNECT

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle Rental System Server");
});

//SIGNUP

app.use("/api/v1/auth/",authRoutes);

//login

// app.post("/api/v1/auth/signin" , (req:Request ,res: Response)=>{

// })

app.listen(PORT, () => {
  console.log(`Server is running on post ${PORT}`);
});
