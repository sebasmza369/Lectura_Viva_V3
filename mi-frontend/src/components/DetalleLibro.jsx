import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL;

export default function DetalleLibro() {

    const [id, setId] = useState(null);
    const [ libro, setLibro] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const parametros = new URLSearchParams(window.location.search);
        const idUrl = parametros.get("id");

        if(!idUrl) {
            setError("No se indicó ningún libro");
            return;
        }

        setId(idUrl);

    }, []);

    useEffect(() => {

        if(!id) return; //Si no hay id salimos de la funcion.

        async function cargarLibro(){
            try{
                const respuesta = await fetch(`${API_URL}/api/v3/libros/${id}`);
                
                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar el libro");
                }

                const datos = await respuesta.json();

                setLibro(datos); 

             }catch(error){
                setError(error.message)
             }
            }

        cargarLibro();

    }, [id]);
   
    if (error) {
        return <p>{error}</p>;
    }

    if (!libro) {
        return <p>Cargando libro...</p>;
    }

    return (
        <section>
            <h1>{libro.titulo}</h1>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>Año:</strong> {libro.ano_publi}</p>
            <p><strong>Género:</strong> {libro.genero}</p>
        </section>
    );
}