"use client";

import { Card, Image } from "@nextui-org/react";
import React from "react";
import { PosterSize } from "tmdb-ts";

import { tmdb } from "@/app/lib/tmdb";

interface PosterProps {
  title: string;
  posterPath: string | undefined;
  width: number;
}
export default function Poster({ title, posterPath, width }: PosterProps) {
    const height = (width / 2) * 3;

  return (
    <div>
      <Card isPressable className="relative flex justify-center" radius="lg" style={{ height: `${height}px`, width: `${width}px`}}>
        {posterPath ? (
          <Image
            alt={title}
            className="select-none w-full h-full object-cover"
            draggable={false}
            src={tmdb.image.getPosterUrlFromPath(posterPath, PosterSize.W780)}
            width={width}
          />
        ) : (
          <p>Oops... We couldn&apos;t find a poster!</p>
        )}
      </Card>
    </div>
  );
}
