import { useEffect, useState } from "react";
import LibroCard from "./LibroCard.jsx";
import LibrosForm from "./LibrosForm.jsx";

const API_URL = import.meta.env.PUBLIC_API_URL;

export default function Libros() {

    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(""); 
    const [libroEnEdicion, setLibroEnEdicion] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);  

    async function cargarLibros() {  //funcion para cargar los libros
        setError("");

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
            )

            if(!respuesta.ok) {
                throw new Error("No se pudo eliminar el libro");
            }

            if(libroEnEdicion?.id === id) {
                setLibroEnEdicion(null)
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

    function manejarEditar(libro) {
        setLibroEnEdicion(libro);
        setMostrarFormulario(true);
    }

    function manejarCancelar() {
        setLibroEnEdicion(null);
        setMostrarFormulario(false);
    }

    function alternarFormulario() {
        if (mostrarFormulario) {
            manejarCancelar();
        } else {
            setLibroEnEdicion(null);
            setMostrarFormulario(true);
        }
    }
    
    return(

        <section>

            <button onClick={alternarFormulario}>
                {mostrarFormulario ? "Cerrar formulario" : "Añadir libro"}
            </button>

            {mostrarFormulario && (
                <LibrosForm
                    libroEnEdicion={libroEnEdicion}
                    onGuardado={cargarLibros}
                    onCancelar={manejarCancelar}
                />
            )}

            {error && <p>{error}</p>}

            {!error && libros.length === 0 ? (
                <p>No hay libros disponibles.</p>
            ) : (
                <div className="libros-grid">
                    {libros.map((libro) =>(
                        <LibroCard
                            key={libro.id}
                            libro={libro}
                            onEditar={manejarEditar}
                            onEliminar={manejarEliminar}                    
                        />
                        ))}
                </div>
             )}
        </section>
    );
}