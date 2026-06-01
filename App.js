import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getMovies() {
      const response = await fetch("/api/movies");
      const data = await response.json();
      setMovies(data);
    }

    getMovies();
  }, []);

  const openMovie = async (id) => {
    const response = await fetch(`/api/movies/${id}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  if (selectedMovie) {
    return (
      <div className="container">
        <button
          className="back-btn"
          onClick={() => setSelectedMovie(null)}
        >
          ← Back to Movies
        </button>

        <h1>{selectedMovie.title}</h1>

        {Object.entries(selectedMovie).map(([key, value]) => {
          if (key === "release_date" && value) {
            value = new Date(value).toLocaleDateString();
          }

          if (key === "runtime" && value) {
            value = `${value} minutes`;
          }

          return (
            <p key={key}>
              <strong>{key}:</strong> {String(value)}
            </p>
          );
        })}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Movie List</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => openMovie(movie.id)}
          >
            <h2>{movie.title}</h2>
            <p>{movie.tagline}</p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
