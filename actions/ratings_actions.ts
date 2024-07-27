"use server";

import { cookies } from "next/headers";
import { ClientResponseError } from "pocketbase";

import { createServerClient } from "../lib/pocketbase";

export async function updateRating(tmdbId: number, rating: number) {
  const pb = createServerClient(cookies());

  const ratingRecord = {
    user_id: pb.authStore.model?.id,
    media_id: tmdbId,
    rating,
  };

  try {
    const existingRating = await pb.collection("rating").getFirstListItem(
      pb.filter("user_id={:user_id} && media_id={:media_id}", {
        user_id: pb.authStore.model?.id,
        media_id: tmdbId,
      })
    );

    await pb.collection("rating").update(existingRating.id, ratingRecord);
  } catch (e) {
    if (e instanceof ClientResponseError && e.status === 404) {
      await pb.collection("rating").create(ratingRecord);
    } else {
      throw e;
    }
  }
}
