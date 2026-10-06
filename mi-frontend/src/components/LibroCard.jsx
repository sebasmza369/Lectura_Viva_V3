
export default function LibroCard({ libro, onEditar, onEliminar }) {
    return (
        <article>
            <h2>{libro.titulo}</h2>
            <strong>{libro.autor}</strong>
            <p>Año: {libro.ano_publi}</p>
            <p>Género: {libro.genero}</p>
            <button onClick={() => onEliminar(libro.id)}>
                Eliminar
            </button>
            <button onClick={() => onEditar(libro)}>
                Editar
            </button>
        </article>
    );
}