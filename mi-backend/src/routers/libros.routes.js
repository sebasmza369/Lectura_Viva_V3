import { Router } from "express"; // es una funcion de express
import { mostrarLibros, obtenerLibro, crearLibro, modificarLibro, borrarLibro } from "../controllers/libros.controllers.js";

const router = Router();

router.get('/', mostrarLibros);
router.get('/:id', obtenerLibro);
router.post('/', crearLibro);
router.put('/:id', modificarLibro);
router.delete('/:id', borrarLibro);

export default router;
