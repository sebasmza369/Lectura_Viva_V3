import pool from "../data/bd.js";

export const mostrarLibros = async(req, res, next) => { //mostramos todos los libros

    try{
        const [rows] = await pool.query(
            `SELECT * FROM libros`
            );
            res.status(200).json(rows);

    }catch (error){
        next(error);
    }    
};

export const obtenerLibro = async(req, res, next) => { //mostramos un unico libro elegido
    const id = req.params.id 

    try {
        const [rows] = await pool.execute(
            `SELECT * FROM libros WHERE id=?`,
            [id]
        );

        if(rows.length === 0){
            return res.status(404).json({
                mensaje: "No se encontró el libro"
            });
        }
        res.json(rows[0]);

    }catch (error){
        next(error);
    }

};

export const crearLibro = async (req, res, next) => { //creamos libro y el autor
    const { titulo, autor, nacionalidad, ano_publi, genero } = req.body;

    if (!titulo || !autor || !ano_publi || !genero) {
        return res.status(400).json({
            error: "Todos los datos del libro son obligatorios."
        });
    }

    try {
        const [autores] = await pool.query(
            "SELECT id FROM autores WHERE nombre = ?",
            [autor]
        );

        let autorId;

        if (autores.length > 0) {
            autorId = autores[0].id;

        } else {
            if (!nacionalidad) {
                return res.status(400).json({
                    error: "La nacionalidad es obligatoria para un autor nuevo."
                });
            }

            const [resultadoAutor] = await pool.query(
                `INSERT INTO autores (nombre, nacionalidad)
                 VALUES (?, ?)`,
                [autor, nacionalidad]
            );

            autorId = resultadoAutor.insertId;
        }

        const [resultado] = await pool.query(
            `INSERT INTO libros
            (titulo, autor, autor_id, ano_publi, genero)
            VALUES (?, ?, ?, ?, ?)`,
            [titulo, autor, autorId, ano_publi, genero]
        );

        res.status(201).json({
            id: resultado.insertId,
            titulo,
            autor,
            autor_id: autorId,
            ano_publi,
            genero
        });

    } catch (error) {
        next(error);
    }
};

export const modificarLibro = async (req, res, next) => {
    const { id } = req.params;

    const { titulo, autor, nacionalidad, ano_publi, genero } = req.body;                           

    if (!titulo || !autor || !ano_publi || !genero) {
        return res.status(400).json({
            error: "Todos los datos del libro son obligatorios."
        });
    }

    try {
        
        const [libros] = await pool.query(
            "SELECT id FROM libros WHERE id = ?",
            [id]
        );

        if (libros.length === 0) {
            return res.status(404).json({
                error: "Libro no encontrado."
            });
        }
        
        const [autores] = await pool.query(
            "SELECT id FROM autores WHERE nombre = ?",
            [autor]
        );

        let autorId;

        if (autores.length > 0) {
            autorId = autores[0].id;

        } else {
            
            if (!nacionalidad) {
                return res.status(400).json({
                    error: "La nacionalidad es obligatoria para un autor nuevo."
                });
            }

            const [resultadoAutor] = await pool.query(
                `INSERT INTO autores (nombre, nacionalidad)
                 VALUES (?, ?)`,
                [autor, nacionalidad]
            );

            autorId = resultadoAutor.insertId;
        }
       
        await pool.query(
            `UPDATE libros
             SET titulo = ?,
                 autor = ?,
                 autor_id = ?,
                 ano_publi = ?,
                 genero = ?
             WHERE id = ?`,
            [titulo, autor, autorId, ano_publi, genero, id]
        );
        
        res.status(200).json({
            id: Number(id),
            titulo,
            autor,
            autor_id: autorId,
            ano_publi,
            genero
        });

    } catch (error) {
        next(error);
    }
};

export const borrarLibro = async(req, res, next) => { //borramos un libro
    const id = req.params.id 

    try {
        const [result] = await pool.execute(
            `DELETE FROM libros WHERE id=?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
            mensaje: "No se encontró el libro"
            });
        }

        res.status(200).json({
            mensaje: "Se ha eliminado el libro"
        });

    }catch (error){        
        next(error);
    }

};
