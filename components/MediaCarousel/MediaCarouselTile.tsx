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
      <Poster posterPath={posterSrc} title={title} width={185} />
    </Link>
  );
}
