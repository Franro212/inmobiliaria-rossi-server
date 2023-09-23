import express from "express";
import {
  deleteUser,
  getAdmins,
  login,
  register,
  updateUser,
} from "../controllers/userController.js";
import verifyToken from "../validators/auth.js";
import {
  validateUser,
  validateUserLogin,
} from "../validators/userValidator.js";
import { verifyPerfil } from "../validators/perfil.js";
const router = express.Router();

router.get("/", verifyToken, getAdmins);
router.post("/login", validateUserLogin, login);
router.post("/", verifyToken, validateUser, verifyPerfil, register);
router.put("/:id", verifyToken, validateUser, verifyPerfil, updateUser);
router.delete("/:id", verifyToken, verifyPerfil, deleteUser);

export default router;
