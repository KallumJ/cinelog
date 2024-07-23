import React from "react";

import { tmdb } from "@/lib/tmdb";
import MediaBody from "@/components/MediaBody";
import MediaDetailsPage from "@/components/MediaDetailsPage";

export default async function Movie({
  params: { id },
}: {
  params: { id: number };
}) {
  const movie = await tmdb.movies.details(id);
  const credits = await tmdb.movies.credits(movie.id);

  const details = [
    { key: "Release date", value: new Date(movie.release_date).toLocaleDateString()},
    { key: "Budget", value: `$${movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`},
    { key: "Runtime", value: `${movie.runtime} minutes` }
  ]

  return (
    <MediaDetailsPage backdropPath={movie.backdrop_path} posterPath={movie.poster_path} releaseDate={movie.release_date} title={movie.title}>
        <MediaBody
          credits={credits}
          description={movie.overview}
          details={details}
          imdbId={movie.imdb_id}
          productionCompanies={movie.production_companies}
          tagline={movie.tagline}
          title={movie.title}
        />
      </MediaDetailsPage>
  );
}
