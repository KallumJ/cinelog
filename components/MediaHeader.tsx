"use client";

import React from "react";
import { Card } from "@nextui-org/react";

import MediaControls from "./MediaControls";

import { getYearFromDateString } from "@/lib/utils";

interface MediaHeaderProps {
  title: string;
  firstDate: string;
  lastDate?: string;
  userId?: string;
  tmdbId: number
  initialRating?: number
  tmdbRating: number;
  watchedToday: boolean;
}

export default function MediaHeader({
  title,
  firstDate,
  lastDate,
  userId,
  tmdbId,
  initialRating,
  tmdbRating,
  watchedToday
}: MediaHeaderProps) {
  const dateStr = !lastDate ? getYearFromDateString(firstDate) : `${getYearFromDateString(firstDate)}-${getYearFromDateString(lastDate)}`

  return (
    <Card className="p-2 sm:p-6">
      <MediaControls initialRating={initialRating} tmdbId={tmdbId} tmdbRating={tmdbRating} userId={userId} watchedToday={watchedToday}/>
      <h1 className="md:text-6xl sm:text-5xl text-lg font-bold">
        {title}{" "}
        <span className="dark:text-gray-500 md:text-2xl sm:text-xl text-sm">{dateStr}</span>
      </h1>
    </Card>
  );
}
