"use server";

import { NotAuthenticatedError } from "../types/errors";
import { prisma } from "../prisma/index";
import { getNextServerSession } from "../lib/auth";
import { getOrCreateWishlist, isWatchedToday } from "../lib/db";

export async function updateRating(mediaId: number, rating: number) {
  const session = await getNextServerSession();

  if (!session)
    throw new NotAuthenticatedError(
      "Can not update rating if user is not authenticated"
    );

  const existingRating = await prisma.rating.findFirst({
    where: { userId: session.user.id, mediaId },
  });

  await prisma.rating.upsert({
    where: { id: existingRating?.id ?? 0 },
    update: { rating },
    create: { mediaId, userId: session.user.id, rating },
  });
}

export async function setWatched(mediaId: number) {
  const session = await getNextServerSession();

  if (!session)
    throw new NotAuthenticatedError(
      "Can not set as watched if user is not authenticated"
    );

  const alreadyWatchedToday = await isWatchedToday(mediaId);

  if (alreadyWatchedToday) {
    await prisma.watch.delete({ where: { id: alreadyWatchedToday.id } });
  } else {
    await prisma.watch.create({
      data: {
        userId: session.user.id,
        media_id: mediaId,
      },
    });
  }
}

export async function isWatchlisted(mediaId: number) {
  const session = await getNextServerSession();

  if (!session) return false;

  const wishlist = await getOrCreateWishlist();

  const watchlisted = await prisma.listEntries.findFirst({
    where: { listId: wishlist?.id, mediaId: mediaId },
  });

  return watchlisted;
}

export async function setWishlisted(mediaId: number) {
  const session = await getNextServerSession();

  if (!session)
    throw new NotAuthenticatedError(
      "Can not get watched if the user is not authenticated"
    );

  const wishlist = await getOrCreateWishlist();

  const watchlisted = await isWatchlisted(mediaId);

  if (!watchlisted) {
    await prisma.listEntries.create({
      data: { listId: wishlist.id, mediaId: mediaId },
    });
  } else {
    await prisma.listEntries.delete({ where: { id: watchlisted.id } });
  }
}
