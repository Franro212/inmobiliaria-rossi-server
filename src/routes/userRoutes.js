import express from "express";
import { login, register } from "../controllers/userController.js";
const router = express.Router();

// router.get("/", listUser);
 router.post("/login",  login);
router.post("/", register);
//router.delete("/:id", verifyToken, verifyPerfil, deleteUser);

export default  router;
