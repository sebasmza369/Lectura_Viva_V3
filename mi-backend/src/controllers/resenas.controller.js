import pool from "../data/bd.js";

export const mostrarResenas = async (req, res, next) => {

    try {
        const [rows] = await pool.query("SELECT * FROM resenas");

        res.status(200).json(rows);

    }catch (error) {
        next(error);
    }
};

export const mostrarResenasPorLibro = async (req, res, next) => {

    const { id } = req.params;

    try {
        const[rows] = await pool.query(
            "SELECT * FROM resenas WHERE libro_id = ?",
            [id]
        );

        res.status(200).json(rows);

    }catch(error) {
        next(error);
    }
};

export const crearResena = async (req, res, next) => {
    const { id } = req.params;
    const { puntuacion, comentario } = req.body;

    if (!puntuacion || !comentario) {
        return res.status(400).json({
            error: "La puntuación y el comentario son obligatorios."
        });
    }

    const puntuacionNumero = Number(puntuacion);

    if (
        !Number.isInteger(puntuacionNumero) ||
        puntuacionNumero < 1 ||
        puntuacionNumero > 5
    ) {
        return res.status(400).json({
            error: "La puntuación debe ser un número entero entre 1 y 5."
        });
    }

    try {
        const [libros] = await pool.query(
            "SELECT id FROM libros WHERE id = ?",
            [id]
        );

        if (libros.length === 0) {
            return res.status(404).json({
                error: "El libro no existe."
            });
        }

        const [resultado] = await pool.query(
            `INSERT INTO resenas (libro_id, puntuacion, comentario)
             VALUES (?, ?, ?)`,
            [id, puntuacionNumero, comentario]
        );

        res.status(201).json({
            id: resultado.insertId,
            libro_id: Number(id),
            puntuacion: puntuacionNumero,
            comentario
        });

    }catch (error) {
        next(error);
    }
};