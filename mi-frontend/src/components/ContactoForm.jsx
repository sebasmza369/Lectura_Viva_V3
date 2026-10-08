import { useState } from "react";


export default function ContactoForm() {

    const [formulario, setFormulario] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });
    const [enviado, setEnviado] = useState(false);

    function cambiarCampo(event) {
        const { name, value } = event.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }

    function manejarEnvio(event) {
        event.preventDefault();
        console.log(formulario);
    }

    return(
        <form onSubmit={manejarEnvio}>
            <h1>Contacto</h1>
            <label htmlFor="nombre">Nombre</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formulario.nombre}
                onChange={cambiarCampo}
            />

            <label htmlFor="email">Email</label>            
            <input
                type="email"
                id="email"
                name="email"
                required
                value={formulario.email}
                onChange={cambiarCampo}
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
                id="mensaje"
                name="mensaje"
                required
                value={formulario.mensaje}
                onChange={cambiarCampo}
            ></textarea>

            <button type="submit">Enviar</button>
        </form>
    )
};