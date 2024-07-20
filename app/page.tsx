import { PosterSize } from "tmdb-ts";

import { tmdb } from "./lib/tmdb";

import MediaTile from "@/components/MovieTile";
import MediaCarousel from "@/components/MediaCarousel";

export default async function Home() {
  const popularMovies = await tmdb.movies.popular();

  return (
    <section>
      <h1 className="text-4xl font-bold pb-4">Now Showing:</h1>
      <MediaCarousel
        mediaTiles={popularMovies.results.map((m) => (
          <MediaTile
            key={m.id}
            posterSrc={tmdb.image.getPosterUrlFromPath(
              m.poster_path,
              PosterSize.W780
            )}
            title={m.title}
          />
        ))}
      />
    </section>
  );
}
