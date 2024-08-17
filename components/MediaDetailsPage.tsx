import React, { ReactNode } from "react";
import { PosterSize } from "tmdb-ts";

import Poster from "./Poster";
import MediaHeader from "./MediaHeader";

import { tmdb } from "@/lib/tmdb";
import { isWatchlisted } from "@/actions/diary-actions";
import { isWatchedToday } from "@/lib/db";
import { prisma } from "@/prisma/index";
import { getNextServerSession } from "@/lib/auth";

interface MediaDetailsPageProps {
  posterPath?: string;
  title: string;
  backdropPath: string;
  children: ReactNode;
  firstDate: string;
  lastDate?: string;
  tmdbId: number;
  tmdbRating: number;
}

export default async function MediaDetailsPage({
  posterPath,
  title,
  backdropPath,
  children,
  firstDate,
  lastDate,
  tmdbId,
  tmdbRating
}: MediaDetailsPageProps) {
  const session = await getNextServerSession();
  
  const existingRating = await prisma.rating.findFirst({ where: { userId: session?.user.id, mediaId: tmdbId }});

  let watchedToday = false;

  if (session)
    watchedToday = !!(await isWatchedToday(tmdbId));
  
  let watchlisted = false;

  if (session)
    watchlisted = !!(await isWatchlisted(tmdbId));
  
  return (
    <div>
      <div className="flex gap-4">
        <Poster
          className="sm:w-64 sm:h-96 w-32 h-48"
          posterPath={posterPath}
          title={title}
        />
        <div
          className="flex w-full items-end bg-cover p-2 relative rounded-lg"
          style={{
            backgroundImage: `url(${tmdb.image.getSrcForPath(backdropPath, PosterSize.ORIGINAL)})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <MediaHeader firstDate={firstDate} initialRating={existingRating?.rating.toNumber()} lastDate={lastDate} title={title} tmdbId={tmdbId} tmdbRating={tmdbRating} userId={session?.user.id} watchedToday={watchedToday} watchlisted={watchlisted}/>
        </div>
      </div>
      <div className="my-4">{children}</div>
    </div>
  );
}
