import { PosterSize } from "tmdb-ts";

import { tmdb } from "./lib/tmdb";

import MediaTile from "@/components/MovieTile";
import MediaCarousel from "@/components/MediaCarousel";

export default async function Home() {
  const popularMovies = await tmdb.movies.popular();
  const popularShows = await tmdb.tvShows.popular();

  const movieTiles = popularMovies.results.map((m) => (
    <MediaTile
      key={m.id}
      posterSrc={tmdb.image.getPosterUrlFromPath(
        m.poster_path,
        PosterSize.W780
      )}
      title={m.title}
    />
  ));

  const showTiles = popularShows.results.map((s) => (
    <MediaTile
      key={s.id}
      posterSrc={tmdb.image.getPosterUrlFromPath(
        s.poster_path,
        PosterSize.W780
      )}
      title={s.name}
    />
  ));

  return (
    <section>
      <h1 className="text-4xl font-bold pb-4">Now Showing:</h1>
      <MediaCarousel mediaTiles={movieTiles} />
      <h1 className="text-4xl font-bold py-4">What&apos;s On:</h1>
      <MediaCarousel mediaTiles={showTiles} />
    </section>
  );
}
