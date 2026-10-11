import { useState, useEffect } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL;

const libroVacio = {
    titulo: "",
    autor: "",
    ano_publi: "",
    genero: ""
};

export default function LibrosForm( { libroEnEdicion, onGuardado, onCancelar }) {
    const [formulario, setFormulario] = useState(libroVacio);
    const [error, setError] = useState("");
    const editando = libroEnEdicion !== null;

    useEffect(() => {
        if (libroEnEdicion) {
            setFormulario({
                titulo: libroEnEdicion.titulo,
                autor: libroEnEdicion.autor,
                ano_publi: String(libroEnEdicion.ano_publi),
                genero: libroEnEdicion.genero
            });
        }else {
            setFormulario(libroVacio)
        }
    }, [libroEnEdicion]);

    function cambiarCampo(event) {
        const { name, value } = event.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }

    async function manejarEnvio(event) {
        event.preventDefault();
        setError("");

        const datosLibro = {
          titulo: formulario.titulo,
          autor: formulario.autor,
          ano_publi: Number(formulario.ano_publi),
          genero: formulario.genero  
        };

        const url = editando
            ? `${API_URL}/api/v3/libros/${libroEnEdicion.id}`
            : `${API_URL}/api/v3/libros`;

        const metodo = editando ? "PUT" : "POST";

        try{

        const respuesta = await fetch(url,
            {
                method: metodo,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosLibro)
            }
        );
        
        if (!respuesta.ok) {
            throw new Error(
                editando
                ? "No se pudo modificar el libro."
                : "No se pudo crear el libro."
            );
        }

        setFormulario(libroVacio);
        onCancelar();
        await onGuardado();

        } catch (error) {
            setError(error.message); 
        }    
    }

    return (
        <form className="libros-form" onSubmit={manejarEnvio}>
            <h2>{editando ? "Editar libro" : "Añadir libro"}</h2>

            <div className="campo-form">
                <label htmlFor="titulo">Título</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formulario.titulo}
                    onChange={cambiarCampo}
                    required
                />
            </div>

            <div className="campo-form">
                <label htmlFor="autor">Autor</label>
                <input
                    type="text"
                    id="autor"
                    name="autor"
                    value={formulario.autor}
                    onChange={cambiarCampo}
                    required
                />
            </div>

            <div className="campo-form">
                <label htmlFor="ano_publi">Año de publicación</label>
                <input
                    type="number"
                    id="ano_publi"
                    name="ano_publi"
                    value={formulario.ano_publi}
                    onChange={cambiarCampo}
                    required
                />
            </div>

            <div className="campo-form">
                <label htmlFor="genero">Género</label>
                <input
                    type="text"
                    id="genero"
                    name="genero"
                    value={formulario.genero}
                    onChange={cambiarCampo}
                    required
                />
            </div>

            <div className="acciones-form">
                <button type="submit">
                    {editando ? "Guardar cambios" : "Crear libro"}
                </button>

                {editando && (
                    <button type="button" onClick={onCancelar}>
                        Cancelar
                    </button>
                )}
            </div>

            {error && <p>{error}</p>}
        </form>
        
    );
}