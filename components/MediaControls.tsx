"use client";
import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { CircularProgress } from "@nextui-org/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import clsx from "clsx";

import {
  setWatched,
  setWishlisted,
  updateRating as updateRatingAction,
} from "@/actions/diary-actions";
interface MediaControlsProps {
  userId?: string;
  tmdbId: number;
  initialRating?: number;
  tmdbRating: number;
  watchedToday: boolean;
  watchlisted: boolean;
  className?: string;
}

export default function MediaControls({
  userId,
  tmdbId,
  initialRating,
  tmdbRating,
  watchedToday,
  className,
  watchlisted,
}: MediaControlsProps) {
  const [rating, setRating] = useState(initialRating ?? 0);
  const [watchedRecently, setWatchedRecently] = useState(watchedToday);
  const [wishlisted, setWishlistedState] = useState(watchlisted);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className={clsx("sm:flex p-2 flex-row items-center", className)}>
      {userId && (
        <Rating
          disabled={!userId}
          emptyIcon={
            <StarIcon
              fontSize="inherit"
              style={{ opacity: 1, color: "rgb(0,0,0)" }}
            />
          }
          precision={0.5}
          size={windowWidth < 640 ? "medium" : "large"}
          value={rating}
          onChange={async (event, newValue) => {
            setRating(newValue ?? 0);
            await updateRatingAction(tmdbId, newValue ?? 0);
          }}
        />
      )}

      <div className="flex items-center">
        <CircularProgress
          aria-label="Average Rating"
          className="mx-2"
          color={ratingColour}
          showValueLabel={true}
          size="lg"
          value={tmdbRating * 10}
        />

        {userId && (
          <button
            className="mx-2"
            disabled={!userId}
            onClick={async () => {
              const newValue = !watchedRecently;

              setWatchedRecently(newValue);
              await setWatched(tmdbId);
            }}
          >
            {watchedRecently ? <VisibilityIcon /> : <VisibilityOutlinedIcon />}
          </button>
        )}

        {userId && (
          <button
            className="mx-2"
            disabled={!userId}
            onClick={async () => {
              const newValue = !wishlisted;

              setWishlistedState(newValue);
              await setWishlisted(tmdbId);
            }}
          >
            {wishlisted ? (
              <FavoriteRoundedIcon htmlColor="red" />
            ) : (
              <FavoriteBorderRoundedIcon />
            )}
          </button>  
        )}
      </div>
    </div>
  );
}
