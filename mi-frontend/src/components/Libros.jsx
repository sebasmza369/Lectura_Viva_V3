import { useEffect, useState } from "react";
import LibroCard from "./LibroCard.jsx";
import LibrosForm from "./LibrosForm.jsx";

const API_URL = import.meta.env.PUBLIC_API_URL;

export default function Libros() {

    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(""); 
    const [libroEnEdicion, setLibroEnEdicion] = useState(null);   

    async function cargarLibros() {  //funcion para cargar los libros

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

    async function manejarEliminar(id) {
        try {
            const respuesta = await fetch(`${API_URL}/api/v3/libros/${id}`,
                {
                    method: "DELETE"
                }
            );

            if(!respuesta.ok) {
                throw new Error("No se pudo eliminar el libro");
            }

            await cargarLibros();

        }catch(error) {
            setError(error.message);
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

            <LibrosForm 
                libroEnEdicion={libroEnEdicion}
                onGuardado={cargarLibros} 
                onCancelar={() => setLibroEnEdicion(null)}
            />

            {libros.map((libro) =>(
                <LibroCard
                    key={libro.id}
                    libro={libro}
                    onEditar={setLibroEnEdicion}
                    onEliminar={manejarEliminar}                    
                />
            ))}
        </section>
    );
}