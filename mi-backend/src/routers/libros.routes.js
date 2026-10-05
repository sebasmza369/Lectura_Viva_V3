import { Router } from "express"; // es una funcion de express
import { mostrarLibros, obtenerLibro, crearLibro, modificarLibro } from "../controllers/libros.controllers.js";

const router = Router();

router.get('/', mostrarLibros);
router.get('/:id', obtenerLibro);
router.post('/', crearLibro);
router.put('/:id', modificarLibro);

export default router;
