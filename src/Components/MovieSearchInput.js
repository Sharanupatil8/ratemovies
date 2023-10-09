function MovieSearchInput({ setQuery, query }) {
  return (
    <input
      className="search"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search movies..."
    />
  );
}

export default MovieSearchInput;
