import { Router } from "express";
import { mostrarResenas, mostrarResenasPorLibro, crearResena } from "../controllers/resenas.controller.js";

const router = Router();

router.get("/", mostrarResenas);
router.get("/libro/:id", mostrarResenasPorLibro);
router.post("/libro/:id", crearResena);

export default router;