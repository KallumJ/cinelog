import React from "react";
import { PosterSize } from "tmdb-ts";

import { tmdb } from "@/lib/tmdb";
import Poster from "@/components/Poster";
import MediaHeader from "@/components/MediaHeader";
import MediaBody from "@/components/MediaBody";

export default async function Movie({
  params: { id },
}: {
  params: { id: number };
}) {
  const movie = await tmdb.movies.details(id);
  const credits = await tmdb.movies.credits(movie.id);

  return (
    <div>
      <div className="flex gap-4">
        <Poster
          className="sm:w-64 sm:h-96 w-32 h-48"
          posterPath={movie.poster_path}
          title={movie.title}
        />
        <div
          className="flex w-full items-end bg-cover p-2"
          style={{
            backgroundImage: `url(${tmdb.image.getSrcForPath(movie.backdrop_path, PosterSize.ORIGINAL)})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <MediaHeader releaseDate={movie.release_date} title={movie.title} />
        </div>
      </div>
      <div className="my-4">
        <MediaBody
          budget={movie.budget}
          credits={credits}
          description={movie.overview}
          imdbId={movie.imdb_id}
          productionCompanies={movie.production_companies}
          releaseDate={movie.release_date}
          runtime={movie.runtime}
          tagline={movie.tagline}
          title={movie.title}
        />
      </div>
    </div>
  );
}
