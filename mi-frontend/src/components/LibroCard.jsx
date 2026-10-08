
export default function LibroCard({ libro, onEditar, onEliminar }) {
    return (
        <article>
            <h2>{libro.titulo}</h2>
            <strong>{libro.autor}</strong>
            <p>Año: {libro.ano_publi}</p>
            <p>Género: {libro.genero}</p>

             <a href={`/detalle?id=${libro.id}`}>
                Ver detalle
            </a>

            <button onClick={() => onEliminar(libro.id)}>
                Eliminar
            </button>

            <button onClick={() => onEditar(libro)}>
                Editar
            </button>
            
        </article>
    );
}