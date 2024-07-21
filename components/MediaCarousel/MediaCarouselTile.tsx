"use client";

import React from "react";
import Link from "next/link";

import Poster from "../Poster";

interface MediaTileProps {
  posterPath: string | undefined;
  title: string;
  href: string;
}

export default function MediaCarouselTile({
  posterPath: posterSrc,
  title,
  href
}: MediaTileProps) {
  return (
    <Link href={href}>
      <Poster className="sm:w-48 sm:h-72 w-40 h-60" posterPath={posterSrc} title={title} />
    </Link>
  );
}
