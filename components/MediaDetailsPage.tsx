import React, { ReactNode } from "react";
import { PosterSize } from "tmdb-ts";

import Poster from "./Poster";
import MediaHeader from "./MediaHeader";

import { tmdb } from "@/lib/tmdb";

interface MediaDetailsPageProps {
  posterPath?: string;
  title: string;
  backdropPath: string;
  releaseDate: string;
  children: ReactNode;
}

export default function MediaDetailsPage({
  posterPath,
  title,
  backdropPath,
  releaseDate,
  children,
}: MediaDetailsPageProps) {
  return (
    <div>
      <div className="flex gap-4">
        <Poster
          className="sm:w-64 sm:h-96 w-32 h-48"
          posterPath={posterPath}
          title={title}
        />
        <div
          className="flex w-full items-end bg-cover p-2"
          style={{
            backgroundImage: `url(${tmdb.image.getSrcForPath(backdropPath, PosterSize.ORIGINAL)})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <MediaHeader releaseDate={releaseDate} title={title} />
        </div>
      </div>
      <div className="my-4">{children}</div>
    </div>
  );
}
