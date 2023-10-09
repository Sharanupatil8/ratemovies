import React from "react";

function MovieSearchResultList(props) {
  function handlepassId() {
    props.handleSelectedId(props.imdbID);
  }

  return (
    <li onClick={handlepassId}>
      <img src={props.Poster} alt={`${props.Title} poster`} />
      <h3>{props.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{props.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieSearchResultList;
