import { Router } from "express"; // es una funcion de express
import { mostrarLibros, obtenerLibro, crearLibro } from "../controllers/libros.controllers.js";

const router = Router();

router.get('/', mostrarLibros);
router.get('/:id', obtenerLibro);
router.post('/', crearLibro);

export default router;
