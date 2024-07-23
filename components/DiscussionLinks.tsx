import { Link } from "@nextui-org/link";
import React from "react";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

interface DiscussionLinksProps {
  title: string;
  imdbId?: string;
}

export default function DiscussionLinks({
  title,
  imdbId,
}: DiscussionLinksProps) {
  return (
    <div>
      <Link
        className="inline-block"
        color={"foreground"}
        href={`https://www.reddit.com/r/movies/search/?q=${title.replace(" ", "+")}+discussion&type=link&nsfw=0`}
      >
        <SpeakerNotesIcon className="fill-orange-600" /> Reddit discussions
      </Link>
      {imdbId ? (
        <Link
          className="inline-block"
          color={"foreground"}
          href={`https://www.imdb.com/title/${imdbId}/reviews/`}
        >
          <ReviewsIcon className="ml-2 fill-yellow-400" /> IMDb reviews
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
