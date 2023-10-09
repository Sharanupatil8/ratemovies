import React from "react";

function MovieWatchedList({
  Poster,
  imdbRating,
  id,
  Runtime,
  userRating,
  Title,
  deleteWatchedMovies,
}) {
  return (
    <li>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => deleteWatchedMovies(id)}>
          x
        </button>
      </div>
    </li>
  );
}

export default MovieWatchedList;
