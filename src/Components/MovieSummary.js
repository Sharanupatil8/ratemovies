import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";

function MovieSummary({
  selectedId,
  KEY,
  handleSelectedIdClose,
  addMoviesToWatchedList,
  moviesWatchedData,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = moviesWatchedData
    .map((item) => item.id)
    .includes(selectedId);

  const userRated = moviesWatchedData.find(
    (movie) => movie.id === selectedId
  )?.userRating;
  console.log(userRated);

  console.log(isWatched);

  useEffect(() => {
    async function fetchMoviesById() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );

      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
      console.log(data);
    }
    fetchMoviesById();
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;

    return function () {
      document.title = "Use movies | Rate your favourite movie";
    };
  }, [movie.Title]);

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        handleSelectedIdClose();
      }
    }

    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("kedown", callBack);
    };
  }, [handleSelectedIdClose]);

  function handleAddMovies() {
    const movies = {
      Title: movie.Title,
      Poster: movie.Poster,
      Runtime: Number(movie.Runtime.split(" ").at(0)),
      imdbRating: Number(movie.imdbRating),
      id: selectedId,
      userRating,
    };
    addMoviesToWatchedList(movies);
  }

  return (
    <>
      {isLoading ? (
        <p className="loader">Loading..</p>
      ) : (
        <div className="details">
          <header>
            <btn className="btn-back" onClick={handleSelectedIdClose}>
              &larr;
            </btn>

            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &nbsp; &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} imdb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} setUserRating={setUserRating} />
                  {userRating > 1 && (
                    <button className="btn-add" onClick={handleAddMovies}>
                      Add To Watchlist
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>You rated this movie {userRated} ⭐</p>
              )}
            </div>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring : {movie.Actors}</p>
            <p>Directed by : {movie.Director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default MovieSummary;
