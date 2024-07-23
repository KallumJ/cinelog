"use client";

import React from "react";
import {
  MovieWithMediaType,
  MultiSearchResult,
  PersonWithMediaType,
  Search,
  TVWithMediaType,
} from "tmdb-ts";
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import MediaCarouselTile from "@/components/MediaCarousel/MediaCarouselTile";

interface SearchResultsProps {
  results: Search<MultiSearchResult>;
}

export default function SearchResults({ results }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function createMovieElement(movie: MovieWithMediaType) {
    return (
      <MediaCarouselTile
        key={movie.id}
        href={`/movie/${movie.id}`}
        posterPath={movie.poster_path}
        title={movie.title}
      />
    );
  }

  function createTvElement(show: TVWithMediaType) {
    return (
      <MediaCarouselTile
        key={show.id}
        href={`/show/${show.id}`}
        posterPath={show.poster_path}
        title={show.name}
      />
    );
  }

  function createPersonElement(person: PersonWithMediaType) {
    // TODO: SUPPORT PEOPLE
    return (
      <MediaCarouselTile
        key={person.id}
        href={`/people/${person.id}`}
        posterPath={person.profile_path}
        title={person.name}
      />
    );
  }

  function createElementForResult(result: MultiSearchResult) {
    switch (result.media_type) {
      case "movie":
        const movie = result;

        return createMovieElement(movie);
      case "tv":
        const show = result;

        return createTvElement(show);
      case "person":
        const person = result;

        return createPersonElement(person);
    }
  }

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center">
        {results.results.map((r) => createElementForResult(r))}
      </div>
      <div className="flex sticky justify-center items-center">
        {searchParams.get("query") ? (
          <Pagination
            showControls
            className="my-4 ml-12"
            initialPage={1}
            page={results.page}
            size={"lg"}
            total={results.total_pages}
            onChange={(p) => handlePageChange(p)}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
