import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const Rate = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate / 20);    
  };

  return (
    <div>
      <Rating
        onClick={handleRating}
        showTooltip
        tooltipArray={["Terrible", "Bad", "Average", "Great", "Perfect"]}
      />
    </div>
  );
};

export default Rate;
