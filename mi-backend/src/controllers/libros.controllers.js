import pool from "../data/bd.js";

export const mostrarLibros = async(req, res) =>{

    try{
        const [resultado] = await pool.query(
            `SELECT * FROM libros`
            );
            res.json(resultado);

    }catch (error){
        console.log(error);

    }    
};