import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL;

export default function Libros() {

    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState([true]);
    const [error, setError] = useState("");    

    async function cargarLibros() {

        try{
            const respuesta = await fetch(`${API_URL}/api/v3/libros`);

            if(!respuesta.ok) {
                throw new Error("No se pudieron cargar los libros");
            }

            const datos = await respuesta.json();

            setLibros(datos);

        }catch(error) {
            setError(error.message);
        }finally{
            setCargando(false);
        }
        
    }

    useEffect(() => {
        cargarLibros(); 
    }, []);

    if (cargando) {
        return <p>Cargando libros...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (libros.length === 0) {
        return <p>No hay libros disponibles.</p>;
    }
    
    return(
        <section>
            {libros.map((libro) =>(
                <article key={libro.id}> 
                    <h2>{libro.titulo}</h2>
                    <strong>{libro.autor}</strong>
                    <p>Año: {libro.ano_publi}</p>
                    <p>Género: {libro.genero}</p>
                </article>
            ))}
        </section>
    );
}