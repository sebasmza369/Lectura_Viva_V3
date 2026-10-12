import pool from "../data/bd.js";

export const mostrarAutores = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM autores");

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los autores"
        });
    }
};

export const mostrarAutorPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM autores WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el autor"
        });
    }
};

export const crearAutor = async (req, res) => {
    const { nombre, nacionalidad } = req.body;

    if (!nombre || !nacionalidad) {
        return res.status(400).json({
            error: "El nombre y la nacionalidad son obligatorios."
        });
    }

    try {
        const [autores] = await pool.query(
            "SELECT id FROM autores WHERE nombre = ?",
            [nombre]
        );

        if (autores.length > 0) {
            return res.status(400).json({
                error: "El autor ya existe."
            });
        }

        const [resultado] = await pool.query(
            `INSERT INTO autores (nombre, nacionalidad)
             VALUES (?, ?)`,
            [nombre, nacionalidad]
        );

        res.status(201).json({
            id: resultado.insertId,
            nombre,
            nacionalidad
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al crear el autor."
        });
    }
};