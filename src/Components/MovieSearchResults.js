import MovieSearchResultList from "./MovieSearchResultList";

function MovieSearchResults({ movieData, handleSelectedId }) {
  return (
    <ul className="list list-movies ">
      {movieData?.map((movieDetails) => (
        <MovieSearchResultList
          imdbID={movieDetails.imdbID}
          Title={movieDetails.Title}
          Year={movieDetails.Year}
          Poster={movieDetails.Poster}
          key={movieDetails.imdbID}
          handleSelectedId={handleSelectedId}
        />
      ))}
    </ul>
  );
}

export default MovieSearchResults;
