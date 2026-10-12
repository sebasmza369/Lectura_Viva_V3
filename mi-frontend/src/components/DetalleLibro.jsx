import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL;

export default function DetalleLibro() {

    const [id, setId] = useState(null);
    const [ libro, setLibro ] = useState(null);
    const [ error, setError ] = useState("");
    const [ recomendaciones, setRecomendaciones ] = useState([]);
    const [datosAutor, setDatosAutor] = useState(null);
    const [resenas, setResenas] = useState([]);

    useEffect(() => {

        const parametros = new URLSearchParams(window.location.search);
        const idUrl = parametros.get("id");

        if(!idUrl) {
            setError("No se indicó ningún libro.");
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
                    throw new Error("No se pudo cargar el libro.");
                }

                const datos = await respuesta.json();

                setLibro(datos); 

             }catch(error){
                setError(error.message)
             }
            }

        cargarLibro();

    }, [id]);

    useEffect(() => {
        if (!libro?.autor_id) return;

        async function cargarAutor() {
            try {
                const respuesta = await fetch(`${API_URL}/api/v3/autores/${libro.autor_id}`);                  
                
                if (!respuesta.ok) {
                    return;
                }

                const datos = await respuesta.json();

                setDatosAutor(datos);

            } catch (error) {
                setDatosAutor(null);
            }
        }

        cargarAutor();

    }, [libro]);

    useEffect(() => {
        if (!id) return;

        async function cargarResenas() {
            try {
                const respuesta = await fetch(`${API_URL}/api/v3/resenas/libro/${id}`);                  
                if (!respuesta.ok) {
                    return;
                }

                const datos = await respuesta.json();

                setResenas(datos);

            } catch (error) {
                setResenas([]);
            }
        }

        cargarResenas();

    }, [id]);

    useEffect(() => {
        if(!libro) return;

        async function cargarRecomendaciones() {
            try{
                 const respuesta = await fetch(`${API_URL}/api/v3/libros`);

                if (!respuesta.ok) {
                return;
                }

                const datos = await respuesta.json();

                const librosRelacionados = datos.filter((otroLibro) =>
                    otroLibro.genero === libro.genero && otroLibro.id !== libro.id
                );

                setRecomendaciones(librosRelacionados.slice(0, 3)); // nos quedamos con max. 3

            }catch(error){
                setRecomendaciones([]);
            }
        }

        cargarRecomendaciones();
    }, [libro]);
   
    if (error) {
        return <p>{error}</p>;
    }

    if (!libro) {
        return <p>Cargando libro...</p>;
    }

    return (
        <section className="detalle-libro">

            <article className="detalle-principal">
                <h1>{libro.titulo}</h1>
                <p><strong>Autor:</strong> {libro.autor}</p>
                {datosAutor && (
                    <p><strong>Nacionalidad:</strong> {datosAutor.nacionalidad}</p>                  
                )}
                <p><strong>Año:</strong> {libro.ano_publi}</p>
                <p><strong>Género:</strong> {libro.genero}</p>
            </article>

            <section className="resenas">
                <h2>Reseñas</h2>

                {resenas.length === 0 ? (
                    <p>Todavía no hay reseñas para este libro.</p>
                ) : (
                    <div className="resenas-lista">
                        {resenas.map((resena) => (
                            <article className="resena-card" key={resena.id}>
                                <p>
                                    <strong>Puntuación:</strong> {resena.puntuacion}/5
                                </p>

                                <p>{resena.comentario}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <section className="recomendaciones">
                <h2>También te puede interesar:</h2>

                {recomendaciones.length === 0 ? (
                    <p>No hay otras recomendaciones para este género.</p>
                ) : (
                    <div className="recomendaciones-grid">
                        {recomendaciones.map((recomendacion) => (
                            <article
                                className="recomendacion-card"
                                key={recomendacion.id}
                            >
                                <h3>{recomendacion.titulo}</h3>
                                <p>{recomendacion.autor}</p>

                                <a
                                    className="enlace-boton"
                                    href={`/detalle?id=${recomendacion.id}`}
                                >
                                    Ver detalle
                                </a>
                            </article>
                        ))}
                    </div>
                )}
            </section>

        </section>
    );
}