import React, { ReactNode } from "react";
import { CreatedBy, Credits, ProfileSize } from "tmdb-ts";
import Carousel from "react-multi-carousel";

import CreditAvatar from "./CreditAvatar";

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
  const priorityCrew = credits.crew.filter((c) => priorityJobs.includes(c.job)).map(c => <CreditAvatar
    key={c.id}
    className="w-20 h-20"
    job={c.job}
    name={c.name}
    src={tmdb.image.getSrcForPath(c.profile_path, ProfileSize.W185)}
  />);

  const cast = credits.cast.map((c) => (
    <CreditAvatar
      key={c.id}
      className="w-20 h-20"
      job={c.character}
      name={c.name}
      src={tmdb.image.getSrcForPath(c.profile_path, ProfileSize.W185)}
    />
  ));

  const crew = credits.crew
    .filter((c) => c.job !== "Director")
    .map((c) => (
      <CreditAvatar
        key={c.id}
        className="w-20 h-20"
        job={c.job}
        name={c.name}
        src={tmdb.image.getSrcForPath(c.profile_path, ProfileSize.W185)}
      />
    ));

    const creators = createdBy?.map(c => <CreditAvatar
      key={c.id}
      className="w-20 h-20"
      job={"Creator"}
      name={c.name}
      src={tmdb.image.getSrcForPath(c.profile_path, ProfileSize.W185)}
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
