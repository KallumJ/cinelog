"use client";
import { Rating, Tooltip } from "@mui/material";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress } from "@nextui-org/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import {
  setWatched,
  updateRating as updateRatingAction,
} from "@/actions/diary_actions";
interface MediaControlsProps {
  userId?: string;
  tmdbId: number;
  initialRating?: number;
  tmdbRating: number;
  watchedToday: boolean;
}

export default function MediaControls({
  userId,
  tmdbId,
  initialRating,
  tmdbRating,
  watchedToday,
}: MediaControlsProps) {
  const [rating, setRating] = useState(initialRating ?? 0);
  const [watchedRecently, setWatchedRecently] = useState(watchedToday);

  let ratingColour:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined = undefined;

  if (tmdbRating >= 4 && tmdbRating < 7) {
    ratingColour = "warning";
  } else if (tmdbRating >= 7) {
    ratingColour = "success";
  } else {
    ratingColour = "danger";
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
        className="mx-4"
        color={ratingColour}
        showValueLabel={true}
        size="lg"
        value={tmdbRating * 10}
      />

      <button
        onClick={async () => {
          const newValue = !watchedRecently;

          setWatchedRecently(newValue);
          await setWatched(tmdbId);
        }}
      >
        {watchedRecently ? <VisibilityIcon /> : <VisibilityOutlinedIcon />}
      </button>
    </div>
  );
}
