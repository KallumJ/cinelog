"use client";

import { Rating } from "@mui/material";
import React, { useState } from "react";

export default function StarRating() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex p-2 flex-row">
      <Rating
        precision={0.5}
        size={"large"}
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue ?? 0);
        }}
      />
      <p className="text-xl mx-4">5</p>
    </div>
  );
}
