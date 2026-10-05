import { Router } from "express"; // es una funcion de express
import { mostrarLibros, obtenerLibro } from "../controllers/libros.controllers.js";

const router = Router();

router.get('/', mostrarLibros);
router.get('/:id', obtenerLibro);

export default router;
