import React from "react";
import { PosterSize } from "tmdb-ts";

import { tmdb } from "@/app/lib/tmdb";
import Poster from "@/components/Poster";
import MediaHeader from "@/components/MediaHeader";


export default async function Movie({
  params: { id },
}: {
  params: { id: number };
}) {
  const movie = await tmdb.movies.details(id);

  return (
    <div className="flex gap-4">
      <Poster
        className="sm:w-64 sm:h-96 w-32 h-48"
        posterPath={movie.poster_path}
        title={movie.title}
      />
      <div className="flex w-full items-end bg-contain p-2" style={{backgroundImage: `url(${tmdb.image.getPosterUrlFromPath(movie.backdrop_path, PosterSize.ORIGINAL)})`}}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <MediaHeader backdropPath={movie.backdrop_path} title={movie.title} />
      </div>
    </div>
  );
}
