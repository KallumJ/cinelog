"use client";
import { Rating, Tooltip } from "@mui/material";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress } from "@nextui-org/react";

import { updateRating as updateRatingAction } from "@/actions/ratings_actions";
interface StarRatingProps {
  userId?: string;
  tmdbId: number;
  initialRating?: number
  tmdbRating: number;
}

export default function StarRating({ userId, tmdbId, initialRating, tmdbRating }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating ?? 0);
  let ratingColour: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined = undefined;

  if (tmdbRating >= 4 && tmdbRating < 7) {
    ratingColour = "warning"
  } else if (tmdbRating >= 7) {
    ratingColour = "success"
  } else {
    ratingColour = "danger"
  }

  return (
    <div className="flex p-2 flex-row items-center">
      <Tooltip
        open={!userId}
        placement="top"
        title="You need to log in to rate!"
      >
        <Rating
          disabled={!userId}
          emptyIcon={
            <StarIcon
              fontSize="inherit"
              style={{ opacity: 1, color: "rgb(0,0,0)" }}
            />
          }
          precision={0.5}
          size={"large"}
          value={rating}
          onChange={async (event, newValue) => {
            setRating(newValue ?? 0);
            await updateRatingAction(tmdbId, newValue ?? 0);
          }}
        />
      </Tooltip>

      <CircularProgress
      aria-label="Average Rating"
      color={ratingColour}
      showValueLabel={true}
      size="lg"
      value={tmdbRating * 10}
      className="mx-4"
    />
    </div>
  );
}
