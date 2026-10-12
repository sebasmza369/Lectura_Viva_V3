import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import librosRoutes from "./routers/libros.routes.js";
import resenasRoutes from "./routers/resenas.routes.js";
import autoresRoutes from "./routers/autores.routes.js";

dotenv.config(); //lee las variables .env y las carga en el process

const app = express();
const PORT = process.env.PORT || 3000; //si no encuentra puerto en process.env usa el 3000

app.use(cors());
app.use(express.json());

app.use("/api/v3/libros", librosRoutes);
app.use("/api/v3/resenas", resenasRoutes);
app.use("/api/v3/autores", autoresRoutes);

app.listen(PORT, () => {
  console.log(`API funcionando en http://localhost:${PORT}`);
});