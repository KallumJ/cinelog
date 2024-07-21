import React from "react";

import { tmdb } from "@/app/lib/tmdb";
import Poster from "@/components/Poster";

export default async function Movie({
  params: { id },
}: {
  params: { id: number };
}) {
  const movie = await tmdb.movies.details(id);
  
  return (
    <div>
      <Poster
          posterPath={movie.poster_path}
          title={movie.title}
          width={300}
        />
    </div>
  );
}
