
export default function LibroCard({ libro, onEditar, onEliminar }) {
    return (
        <article className="libro-card">
            <h2>{libro.titulo}</h2>
            <strong>{libro.autor}</strong>
            <p>Año: {libro.ano_publi}</p>
            <p>Género: {libro.genero}</p>

            <div className="acciones-card">
                <a className="enlace-boton" href={`/detalle?id=${libro.id}`}>
                    Ver detalle
                </a>

                <button onClick={() => onEditar(libro)}>
                    Editar
                </button>

                <button
                    className="boton-eliminar"
                    onClick={() => onEliminar(libro.id)}
                >
                    Eliminar
                </button>
            </div>
            
        </article>
    );
}