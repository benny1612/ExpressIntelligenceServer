import express from "express";
import { userValdiet } from "../Middleware.js";
import { addUser, allUsers, deleteUser, updataUser } from "../ctrls/usersC.js";

const router = express.Router();
router.get("/", userValdiet, allUsers);
router.post("/", userValdiet, addUser);
router.put("/:username", userValdiet, updataUser);
router.delete("/:username", userValdiet, deleteUser);

export default router;
