"use server";

import { NotAuthenticatedError } from "../types/errors";
import { prisma } from "../prisma/index";
import { getNextServerSession } from "../lib/auth";
import * as db from "../lib/db";

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

  const alreadyWatchedToday = await db.isWatchedToday(mediaId);

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
  return db.isWatchlisted(mediaId);
}

export async function setWishlisted(mediaId: number) {
  return db.setWishlisted(mediaId)
}
