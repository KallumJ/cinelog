"use client";

import { Card } from "@nextui-org/react";
import React from "react";
import { Credits, ProductionCompany } from "tmdb-ts";
import { Link } from "@nextui-org/link";
import ReviewsIcon from "@mui/icons-material/Reviews";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

import MovieCastList from "./MovieCastList";

interface MediaBodyProps {
  description: string;
  tagline: string;
  runtime: number;
  budget: number;
  productionCompanies: ProductionCompany[];
  credits: Credits;
  title: string;
  imdbId: string;
}

export default function MediaBody({
  description,
  tagline,
  runtime,
  budget,
  productionCompanies,
  credits,
  title,
  imdbId,
}: MediaBodyProps) {
  return (
    <Card className="p-4">
      <div className="sm:flex">
        <div>
          <p className="italic text-xl">{tagline}</p>
          <p className="my-4 text-lg">{description}</p>
        </div>
        <div className="ml-2 mb-8">
          <p>
            <span className="font-semibold">Runtime: </span>
            {`${runtime} minutes`}
          </p>
          <p>
            <span className="font-semibold">Budget: </span>{" "}
            {`$${budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
          <p className="font-semibold">Production companies:</p>
          <ul className="list-disc list-inside sm:w-96">
            {productionCompanies.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <MovieCastList credits={credits} />
      <div>
        <Link
          className="inline-block"
          color={"foreground"}
          href={`https://www.reddit.com/r/movies/search/?q=${title.replace(" ", "+")}+discussion&type=link&nsfw=0`}
        >
          <SpeakerNotesIcon className="fill-orange-600" /> Reddit discussions
        </Link>
        <Link
          className="inline-block"
          color={"foreground"}
          href={`https://www.imdb.com/title/${imdbId}/reviews/`}
        >
          <ReviewsIcon className="ml-2 fill-yellow-400" /> IMDb reviews
        </Link>
      </div>
    </Card>
  );
}
