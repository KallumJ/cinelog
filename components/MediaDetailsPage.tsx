import React, { ReactNode } from "react";
import { PosterSize } from "tmdb-ts";
import { cookies } from "next/headers";
import { ClientResponseError } from "pocketbase";

import Poster from "./Poster";
import MediaHeader from "./MediaHeader";

import { tmdb } from "@/lib/tmdb";
import { createServerClient } from "@/lib/pocketbase";
import { isWatchedToday } from "@/actions/diary_actions";

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
  const pb = createServerClient(cookies())

  const user_id = pb.authStore.model?.id
  
  const existingRating = user_id ? await pb.collection("rating").getFirstListItem(pb.filter("user_id={:user_id} && media_id={:tmdb_id}", { user_id, tmdb_id: tmdbId })).then(res => res.rating).catch(err => {
    if (!(err instanceof ClientResponseError && err.status == 404)) console.error(err);

    return 0;
  }) : 0;

  const watchedToday = !!(await isWatchedToday(tmdbId));
  
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
          <MediaHeader firstDate={firstDate} initialRating={existingRating} lastDate={lastDate} title={title} tmdbId={tmdbId} tmdbRating={tmdbRating} userId={user_id} watchedToday={watchedToday}/>
        </div>
      </div>
      <div className="my-4">{children}</div>
    </div>
  );
}
