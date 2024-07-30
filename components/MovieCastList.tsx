import React, { ReactNode } from "react";
import { CreatedBy, Credits, ProfileSize } from "tmdb-ts";
import Carousel from "react-multi-carousel";

import MediaAvatar from "./MediaAvatar";

import { tmdb } from "@/lib/tmdb";

interface MediaCastListProps {
  credits: Credits;
  createdBy?: CreatedBy[]
}

export default function MediaCastList({ credits, createdBy }: MediaCastListProps) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 8,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1200, min: 800 },
      items: 4,
      slidesToSlide: 2,
    },
    foldable: {
      breakpoint: { max: 800, min: 550 },
      items: 3,
      itemsToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };
  const creditList: ReactNode[] = [];

  const priorityJobs = ["Director"];
  const priorityCrew = credits.crew.filter((c) => priorityJobs.includes(c.job)).map(c => <MediaAvatar
    key={c.id}
    className="w-20 h-20"
    src={tmdb.image.getSrcForPath(c.profile_path, ProfileSize.W185)}
    subtitle={c.job}
    title={c.name}
  />);

  const cast = credits.cast.map((c) => (
    <MediaAvatar
      key={c.id}
      className="w-20 h-20"
      src={tmdb.image.getSrcForPath(c.profile_path, ProfileSize.W185)}
      subtitle={c.character}
      title={c.name}
    />
  ));

  const crew = credits.crew
    .filter((c) => c.job !== "Director")
    .map((c) => (
      <MediaAvatar
        key={c.id}
        className="w-20 h-20"
        src={tmdb.image.getSrcForPath(c.profile_path, ProfileSize.W185)}
        subtitle={c.job}
        title={c.name}
      />
    ));

    const creators = createdBy?.map(c => <MediaAvatar
      key={c.id}
      className="w-20 h-20"
      src={tmdb.image.getSrcForPath(c.profile_path, ProfileSize.W185)}
      subtitle={"Creator"}
      title={c.name}
    />) ?? [];

  creditList.push(
    ...creators,
    ...priorityCrew,
    ...cast,
    ...crew,
  );

  return (
    <Carousel responsive={responsive}>{creditList}</Carousel>
  );
}
