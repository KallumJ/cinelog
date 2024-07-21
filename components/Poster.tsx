"use client";

import { Card, Image } from "@nextui-org/react";
import React from "react";
import { PosterSize } from "tmdb-ts";
import clsx from "clsx";

import { tmdb } from "@/app/lib/tmdb";

interface PosterProps {
  title: string;
  posterPath: string | undefined;
  className?: string;
}
export default function Poster({ title, posterPath,  className}: PosterProps) {

    
  return (
    <div>
      <Card
        isPressable
        className={clsx("relative flex justify-center", className)}
        radius="lg"
      >
        {posterPath ? (
          <Image
            alt={title}
            className="select-none w-full h-full object-cover"
            draggable={false}
            src={tmdb.image.getPosterUrlFromPath(posterPath, PosterSize.W780)}
          />
        ) : (
          <p className="m-4">Oops... We couldn&apos;t find a poster!</p>
        )}
      </Card>
    </div>
  );
}
