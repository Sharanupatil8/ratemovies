import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import MovieSearchResults from "./Components/MovieSearchResults";
import MovieWatched from "./Components/MovieWatched";
import Logo from "./Components/Logo";
import MovieSearchInput from "./Components/MovieSearchInput";
import NumResults from "./Components/NumResults";
import Box from "./Components/Box";
import ErrorMessage from "./Components/ErrorMessage";
import MovieSummary from "./Components/MovieSummary";

const KEY = "309e29a4";

function App() {
  const [movieSearchData, setMovieSearchData] = useState([]);
  const [moviesWatchedData, setMoviesWatchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      setError("");
      setIsLoading(true);
      try {
        const fetchingData = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!fetchingData.ok)
          throw new Error("Something went wrong with searching movie");
        const res = await fetchingData.json();
        if (res.Response === "False") throw new Error("Movie Not Found!");
        setMovieSearchData(res.Search);
      } catch (err) {
        console.error(err);
        if (!err.name === "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovieSearchData([]);
      setError("");
      handleSelectedIdClose();
      return;
    }
    handleSelectedIdClose();
    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleSelectedIdClose() {
    setSelectedId(null);
  }

  function addMoviesToWatchedList(movies) {
    setMoviesWatchedData((prev) =>
      prev.id === movies.id ? [...prev] : [movies, ...prev]
    );
    setSelectedId(null);
  }

  function deleteWatchedMovies(id) {
    setMoviesWatchedData((prev) => prev.filter((movie) => movie.id !== id));
  }

  return (
    <div div className="app">
      <Header>
        <Logo />
        <MovieSearchInput setQuery={setQuery} query={query} />
        <NumResults movieData={movieSearchData} />
      </Header>
      <div className="main">
        <Box>
          {!query && !isLoading && !error && (
            <p className="loader">Search Your Favourite Movie..</p>
          )}
          {isLoading && <p className="loader">Loading...</p>}
          {!isLoading && !error && (
            <MovieSearchResults
              handleSelectedId={handleSelectedId}
              movieData={movieSearchData}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {!selectedId && (
            <MovieWatched
              deleteWatchedMovies={deleteWatchedMovies}
              watchedData={moviesWatchedData}
            />
          )}
          {selectedId && (
            <MovieSummary
              selectedId={selectedId}
              KEY={KEY}
              handleSelectedIdClose={handleSelectedIdClose}
              addMoviesToWatchedList={addMoviesToWatchedList}
              moviesWatchedData={moviesWatchedData}
            />
          )}
        </Box>
      </div>
    </div>
  );
}

export default App;
