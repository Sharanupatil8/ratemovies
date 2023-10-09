import React, { useState } from "react";
import MovieWatchedList from "./MovieWatchedList";

function MovieWatched({ watchedData, deleteWatchedMovies }) {
  console.log(watchedData);
  const totalMovies = watchedData.length;
  const avgRuntime = watchedData.reduce(
    (accumulator, movie) => accumulator + movie.Runtime,
    0
  );

  const avgImdbRating =
    watchedData.reduce((a, movie) => a + movie.imdbRating, 0) /
    watchedData.length;

  const avgUserRating =
    watchedData.reduce((a, movie) => a + movie.userRating, 0) /
    watchedData.length;

  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>🎬</span>
            <span>{totalMovies} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating ? avgImdbRating.toFixed(1) : 0}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating ? avgUserRating.toFixed(1) : 0}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{(avgRuntime / 60).toFixed(1)} hrs</span>
          </p>
        </div>
      </div>
      <ul className="list">
        {watchedData.map((movieDetails) => (
          <MovieWatchedList
            Poster={movieDetails.Poster}
            Title={movieDetails.Title}
            imdbRating={movieDetails.imdbRating}
            userRating={movieDetails.userRating}
            Runtime={movieDetails.Runtime}
            key={movieDetails.id}
            id={movieDetails.id}
            deleteWatchedMovies={deleteWatchedMovies}
          />
        ))}
      </ul>
    </>
  );
}

export default MovieWatched;
