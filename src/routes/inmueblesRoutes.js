import express from "express";
import {
  createInmueble,
  deleteInmueble,
  getInmuebleByID,
  getInmuebles,
  updateInmueble,
} from "../controllers/inmuebleController";
import multer from "multer";
import verifyToken from "../validators/auth";
import { verifyPerfil } from "../validators/perfil";
import validateInmuebles from "../validators/inmueblesValidation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

router
  .get("/", getInmuebles)
  .get("/:id", getInmuebleByID)
  .post(
    "/",
    verifyToken,
    verifyPerfil,
    validateInmuebles,
    upload.array("images", 10),
    createInmueble,
  )
  .put("/:id", verifyToken, verifyPerfil, validateInmuebles, updateInmueble)
  .delete("/:id", verifyToken, verifyPerfil, deleteInmueble);

export default router;
