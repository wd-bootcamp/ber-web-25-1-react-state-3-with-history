import "./Movie.css";

export default function Movie({ name, isLiked, onDelete, onToggleLike, id }) {
  return (
    <section className="movie">
      <h2 className={`movie__title${isLiked ? " movie__title--is-liked" : ""}`}>
        {name}
      </h2>
      <div className="movie__actions">
        <button
          onClick={() => {
            onToggleLike(id);
          }}
          className="movie__button"
          type="button"
          title={isLiked ? "unlike movie" : "like movie"}
        >
          {isLiked ? (
            <span role="img" aria-label="Thumbs up">
              👍
            </span>
          ) : (
            <span role="img" aria-label="Thumbs down">
              👎
            </span>
          )}
        </button>
        <button
          onClick={() => {
            onDelete(id);
          }}
          className="movie__button"
          type="button"
          title="delete movie"
        >
          ✕
        </button>
      </div>
    </section>
  );
}
