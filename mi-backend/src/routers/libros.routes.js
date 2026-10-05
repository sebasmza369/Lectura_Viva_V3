import { Router } from "express"; // es una funcion de express
import { mostrarLibros } from "../controllers/libros.controllers.js";

const router = Router();

router.get('/', mostrarLibros);

export default router;
