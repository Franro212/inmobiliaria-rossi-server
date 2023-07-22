import express from "express";
import inmueblesControllers from "../controllers/inmuebleController";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .get("/", inmueblesControllers.getInmuebles)
  .get("/:id", inmueblesControllers.getInmuebleByID)
  .post("/", upload.single("images"), inmueblesControllers.createInmueble)
  .put("/:id", inmueblesControllers.updateInmueble)
  .delete("/:id", inmueblesControllers.deleteInmueble);

export default router;
