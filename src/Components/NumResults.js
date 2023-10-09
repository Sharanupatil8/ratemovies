import React from "react";

function NumResults({ movieData }) {
  return (
    <p className="num-results">
      Found <strong>{movieData?.length}</strong> results
    </p>
  );
}

export default NumResults;
