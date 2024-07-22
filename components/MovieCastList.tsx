import React, { ReactNode } from "react";
import { Credits, ProfileSize } from "tmdb-ts";
import Carousel from "react-multi-carousel";

import CreditAvatar from "./CreditAvatar";

import { tmdb } from "@/lib/tmdb";

interface MovieCastListProps {
  credits: Credits;
}

export default function MovieCastList({ credits }: MovieCastListProps) {
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

  const director = credits.crew.filter((c) => c.job === "Director").shift()!;

  const creditList: ReactNode[] = [];

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

  creditList.push(
    <CreditAvatar
      key={director.id}
      className="w-20 h-20"
      job={director.job}
      name={director.name}
      src={tmdb.image.getSrcForPath(director.profile_path, ProfileSize.W185)}
    />,
    ...cast,
    ...crew
  );

  return (
    <Carousel responsive={responsive}>{creditList}</Carousel>
  );
}
