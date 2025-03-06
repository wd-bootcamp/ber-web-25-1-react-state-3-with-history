import { useState } from "react";
import "./styles.css";
import Movie from "./components/Movie";
import Form from "./components/Form";
import { uid } from "uid";

const initialMovieData = [
  {
    id: "28djdh72",
    name: "The Incredible Hulk",
  },
  {
    id: "dknseu2",
    name: "Spiderman 1-25",
    isLiked: false,
  },
  {
    id: "dkwi02ksk",
    name: "Lord of the Rings",
    isLiked: true,
  },
];

let history = [initialMovieData]; // müssen ausserhalb stehen, damit sie nicht mit jedem render neu initialisiert werden.
let historyPointer = 0;

export default function App() {
  const [movies, setMovies] = useState(initialMovieData);

  function historyPrev() {
    if (historyPointer > 0) {
      historyPointer--;
      setMovies(history[historyPointer]);
    }
  }
  function historyNext() {
    if (historyPointer < history.length - 1) {
      historyPointer++;
      setMovies(history[historyPointer]);
    }
  }

  function handleToggleLike(idToToggle) {
    const newMovies = movies.map((movie) => {
      return movie.id === idToToggle
        ? { ...movie, isLiked: !movie.isLiked }
        : movie;
    });
    // Die nächsten 4 Zeilen könnte man auch in eine eigene Funktion
    // auslagern, da sie in allen handler functions gleich sind
    setMovies(newMovies);
    history = [...history.slice(0, historyPointer + 1)];
    history.push(newMovies);
    historyPointer++;
  }

  function handleDelete(idToDelete) {
    console.log("Delete a movie" + idToDelete);
    const newMovies = movies.filter((movie) => {
      if (movie.id === idToDelete) {
        return false;
      } else {
        return true;
      }
    });

    setMovies(newMovies);
    history = [...history.slice(0, historyPointer + 1)];
    history.push(newMovies);
    historyPointer++;
  }

  function handleAddMovie(newMovie) {
    newMovie.id = uid();
    const newMovies = [newMovie, ...movies];

    setMovies(newMovies);
    history = [...history.slice(0, historyPointer + 1)];
    history.push(newMovies);
    historyPointer++;
  }
  return (
    <div className="app">
      <p>history.length: {history.length}</p> {/* Nur für debugging */}
      <p>historyPointer: {historyPointer}</p> {/* Nur für debugging */}
      <div className="button-container">
        <button onClick={historyPrev} disabled={historyPointer <= 0}>
          &lt;-- undo
        </button>
        <button
          onClick={historyNext}
          disabled={historyPointer >= history.length - 1}
        >
          redo --&gt;
        </button>
      </div>
      <h1>Favorite Movies</h1>
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Movie
              onToggleLike={handleToggleLike}
              onDelete={handleDelete}
              // onDelete={() => {
              //   handleDelete(movie.id);
              // }}
              id={movie.id}
              name={movie.name}
              isLiked={movie.isLiked}
            />
          </li>
        ))}
      </ul>
      <Form onAddMovie={handleAddMovie} />
    </div>
  );
}
