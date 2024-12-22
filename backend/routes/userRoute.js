import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const userRoutes = express.Router();

userRoutes.route("/register").post(register);
userRoutes.route("/login").post(login);
userRoutes.route("/logout").get(logout);
userRoutes.route("/").get(isAuthenticated,getOtherUsers);

export default userRoutes;