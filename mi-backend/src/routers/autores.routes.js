import { Router } from "express";
import { mostrarAutores, mostrarAutorPorId, crearAutor } from "../controllers/autores.controller.js";

const router = Router();

router.get("/", mostrarAutores);
router.get("/:id", mostrarAutorPorId);
router.post("/", crearAutor);

export default router;