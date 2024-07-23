import React from "react";

import MediaDetailsPage from "@/components/MediaDetailsPage";
import { tmdb } from "@/lib/tmdb";
import MediaBody from "@/components/MediaBody";

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  const show = await tmdb.tvShows.details(id);
  const credits = await tmdb.tvShows.credits(id);
  const details = [
    { key: "Number of seasons", value: `${show.number_of_seasons}` },
    { key: "Number of episodes", value: `${show.number_of_episodes}` },
  ];

  return (
    <MediaDetailsPage
      backdropPath={show.backdrop_path}
      firstDate={show.first_air_date}
      lastDate={show.last_air_date}
      posterPath={show.poster_path}
      title={show.name}
    >
      <MediaBody
        createdBy={show.created_by}
        credits={credits}
        description={show.overview}
        details={details}
        mediaType="television"
        productionCompanies={show.production_companies}
        tagline={show.tagline}
        title={show.name}
      />
    </MediaDetailsPage>
  );
}
