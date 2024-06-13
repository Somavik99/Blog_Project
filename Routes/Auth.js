import express from "express";
import {
  UserRegistration,
  userLoginController,
} from "../Controllers/AuthController.js";
const router = express.Router();

router.post("/userRegistration", UserRegistration);

router.post("/userLogin", userLoginController);

export default router;
