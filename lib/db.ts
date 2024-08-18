import { prisma } from "../prisma/index";
import { NotAuthenticatedError } from "../types/errors";

import { getNextServerSession } from "./auth";

export async function isWatchedToday(mediaId: number) {
  const session = await getNextServerSession();

  if (!session)
    throw new NotAuthenticatedError(
      "Can not get if watched today if user is not authenticated"
    );

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

  const watchedToday = await prisma.watch.findFirst({
    where: {
      userId: session.user.id,
      media_id: mediaId,
      created_at: {
        gte: dawn,
        lte: dusk,
      },
    },
  });

  return watchedToday;
}

export async function getOrCreateWishlist() {
  const session = await getNextServerSession();

  if (!session)
    throw new NotAuthenticatedError(
      "Can not get or create wishlist as user is not authenticated"
    );

  let wishlist = await prisma.list.findFirst({
    where: { name: "Wishlist", userId: session.user.id },
  });

  if (!wishlist) {
    wishlist = await prisma.list.create({
      data: { name: "Wishlist", userId: session.user.id },
    });
  }

  return wishlist;
}

export async function setWishlisted(mediaId: number) {

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

export async function isWatchlisted(mediaId: number) {
  const wishlist = await getOrCreateWishlist();

  const watchlisted = await prisma.listEntries.findFirst({
    where: { listId: wishlist?.id, mediaId: mediaId },
  });

  return watchlisted;
}