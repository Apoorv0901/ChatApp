import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const messageRoutes = express.Router();

messageRoutes.route("/send/:id").post(isAuthenticated,sendMessage)
messageRoutes.route("/:id").get(isAuthenticated,getMessage)
export default messageRoutes;