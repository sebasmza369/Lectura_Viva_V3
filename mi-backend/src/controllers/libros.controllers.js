import pool from "../data/bd.js";

export const mostrarLibros = async(req, res) =>{ //mostramos todos los libros

    try{
        const [rows] = await pool.query(
            `SELECT * FROM libros`
            );
            res.json(rows);

    }catch (error){
        console.log(error);

    }    
};

export const obtenerLibro = async(req, res) =>{ //mostramos un unico libro elegido
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
        console.log(error);
        res.status(500).json({
            mensaje: "Error al obtener el libro"
        });
    }

};

export const crearLibro = async(req, res) => { // Creamos libros
    const { titulo, autor, ano_publi, genero } = req.body;

       if(!titulo || !autor || !ano_publi || !genero){
            return res.status(400).json({
                mensaje: "Faltan datos"
            });
        }

    try{
        const [result] = await pool.execute(
            `INSERT INTO libros (titulo, autor, ano_publi, genero)
             VALUES (?, ?, ?, ?)`, 
            [ titulo, autor, ano_publi, genero ]
        );
     
        res.status(201).json({
            mensaje: "Libro creado"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            mensaje: "Error al crear el libro"
        });
    }
};