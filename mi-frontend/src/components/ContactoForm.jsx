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
        
        setEnviado(true);

        setFormulario({
            nombre: "",
            email: "",
            mensaje: ""
        });
    }

    return(
        <form className="contacto-form" onSubmit={manejarEnvio}>

            <h1>Contacto</h1>
            
            <div className="campo-form">
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    value={formulario.nombre}
                    onChange={cambiarCampo}
                />
            </div>

            <div className="campo-form">
                <label htmlFor="email">Email</label>            
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formulario.email}
                    onChange={cambiarCampo}
                />
            </div>    

            <div className="campo-form">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    value={formulario.mensaje}
                    onChange={cambiarCampo}
                ></textarea>
            </div>    

                <button type="submit">Enviar</button>

            {enviado && (
                <p className="mensaje-exito">
                    Formulario completado correctamente.
                </p>
            )}
        </form>
    )
};