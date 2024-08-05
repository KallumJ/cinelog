"use server";

import { cookies } from "next/headers";
import { ClientResponseError } from "pocketbase";

import { createServerClient } from "../lib/pocketbase";
import { formatDate } from "../lib/utils";
import { NotAuthenticatedError } from "../types/errors";

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

export async function isWatchedToday(tmdbId: number) {
  const pb = createServerClient(cookies());

  try {
    if (!pb.authStore.isValid)
        throw new NotAuthenticatedError("Can not get watched if the user is not authenticated")

    const now = new Date();
    const dawn = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );
    const dusk = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    );

    return await pb.collection("watches").getFirstListItem(
      pb.filter(
        "user_id={:user_id} && media_id={:media_id} && created >= {:dawn} && created <= {:dusk}",
        {
          user_id: pb.authStore.model?.id,
          media_id: tmdbId,
          dawn: formatDate(dawn),
          dusk: formatDate(dusk),
        }
      )
    );
  } catch (e) {
    if ((e instanceof ClientResponseError && e.status === 404) || e instanceof NotAuthenticatedError) {
      return null;
    } else {
      throw e;
    }
  }
}

export async function setWatched(tmdbId: number) {
  const pb = createServerClient(cookies());

  const alreadyWatchedToday = await isWatchedToday(tmdbId);

  if (alreadyWatchedToday) {
    await pb.collection("watches").delete(alreadyWatchedToday.id);
  } else {
    await pb.collection("watches").create({
      user_id: pb.authStore.model?.id,
      media_id: tmdbId,
    });
  }
}

export async function isWatchlisted(tmdbId: number) {
  const pb = createServerClient(cookies());

  if (!pb.authStore.isValid)
    throw new NotAuthenticatedError("Can not get watched if the user is not authenticated")

  const usersWishlist = await pb.collection("lists").getFirstListItem(pb.filter("user_id={:user_id} && name=\"watchlist\"", { user_id: pb.authStore.model?.id }))

  try {
    const watchlisted = await pb.collection("list_entries").getFirstListItem(pb.filter("list={:list_id} && media_id={:media_id}", { media_id: tmdbId, list_id: usersWishlist.id}))
    
    return watchlisted
  } catch (e) {
    if ((e instanceof ClientResponseError && e.status === 404) || e instanceof NotAuthenticatedError) {
      return null;
    } else {
      throw e;
    }
  }

  return 
}

export async function setWishlisted(tmdbId: number) {
  const pb = createServerClient(cookies());
  
  if (!pb.authStore.isValid)
    throw new NotAuthenticatedError("Can not get watched if the user is not authenticated")

  const usersWishlist = await pb.collection("lists").getFirstListItem(pb.filter("user_id={:user_id} && name=\"watchlist\"", { user_id: pb.authStore.model?.id }))

  const watchlisted = await isWatchlisted(tmdbId)

  if (!watchlisted) {
    await pb.collection("list_entries").create({
      list: usersWishlist.id,
      media_id: tmdbId
    })
  } else {
    await pb.collection("list_entries").delete(watchlisted.id)
  }

}
