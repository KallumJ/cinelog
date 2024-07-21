import { unstable_noStore as noStore } from 'next/cache';

import { tmdb } from "./lib/tmdb";

import MediaCarouselTile from "@/components/MediaCarousel/MediaCarouselTile";
import MediaCarousel from "@/components/MediaCarousel/MediaCarousel";


export default async function Home() {
  noStore();
  const popularMovies = await tmdb.movies.popular();
  const popularShows = await tmdb.tvShows.popular();

  const movieTiles = popularMovies.results.map((m) => (
    <MediaCarouselTile
      key={m.id}
      href={`/movie/${m.id}`}
      posterPath={m.poster_path}
      title={m.title}
    />
  ));

  const showTiles = popularShows.results.map((s) => (
    <MediaCarouselTile
      key={s.id}
      href={`/show/${s.id}`}
      posterPath={s.poster_path}
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
