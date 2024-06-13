import express from "express";
import { UserRegistration } from "../Controllers/AuthController";
const router = express.Router();

router.post("/userRegistration", UserRegistration);

export default router;
