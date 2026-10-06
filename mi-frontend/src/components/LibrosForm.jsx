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
            throw new Error("No se pudo crear el libro");
        }

        setFormulario(libroVacio);
        onCancelar();
        await onGuardado();

    }   

    return (
        <form onSubmit={manejarEnvio}>
            <label>
                Título
                <input
                    name="titulo"
                    value={formulario.titulo}
                    onChange={cambiarCampo}
                />
            </label>

            <label>
                Autor
                <input
                    name="autor"
                    value={formulario.autor}
                    onChange={cambiarCampo}
                />
            </label>

            <label>
                Año
                <input
                    name="ano_publi"
                    type="number"
                    value={formulario.ano_publi}
                    onChange={cambiarCampo}
                />
            </label>

            <label>
                Género
                <input
                    name="genero"
                    value={formulario.genero}
                    onChange={cambiarCampo}
                />
            </label>

            <button type="submit">
                {editando ? "Guardar cambios" : "Crear libro"}
            </button>
        </form>
    );
}