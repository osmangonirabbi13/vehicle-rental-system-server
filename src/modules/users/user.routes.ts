import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();
router.get("/", userControllers.getUser);
router.put("/:id", userControllers.updateUser);

export const userRoutes = router;
