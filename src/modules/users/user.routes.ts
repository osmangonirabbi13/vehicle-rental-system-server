import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();
router.get("/", userControllers.getUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);
export const userRoutes = router;
