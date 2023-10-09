import React, { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const containerStars = {
  display: "flex",
};

function StarRating({
  maxRating = 0,
  color = "#fcc419",
  size = 48,
  setUserRating,
}) {
  const [starsSelected, setStarsSelected] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleStarsClick(i) {
    setStarsSelected(i);
    setUserRating(i);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 2}px`,
  };
  return (
    <div style={containerStyle}>
      <div style={containerStars}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            handleStarsClick={handleStarsClick}
            i={i}
            key={i}
            full={tempRating ? tempRating >= i + 1 : starsSelected >= i + 1}
            onHovering={() => setTempRating(i + 1)}
            onHoverLeave={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || starsSelected}</p>
    </div>
  );
}

export default StarRating;
