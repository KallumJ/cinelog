"use client";

import React from "react";
import { Card } from "@nextui-org/react";

import StarRating from "./StarRating";

import { getYearFromDateString } from "@/lib/utils";

interface MediaHeaderProps {
  title: string;
  firstDate: string;
  lastDate?: string;
}

export default function MediaHeader({
  title,
  firstDate,
  lastDate,
}: MediaHeaderProps) {
  const dateStr = !lastDate ? getYearFromDateString(firstDate) : `${getYearFromDateString(firstDate)}-${getYearFromDateString(lastDate)}`

  return (
    <Card className="p-2 sm:p-6">
      <StarRating />
      <h1 className="md:text-6xl sm:text-5xl text-2xl font-bold">
        {title}{" "}
        <span className="dark:text-gray-500 md:text-2xl sm:text-xl text-sm">{dateStr}</span>
      </h1>
    </Card>
  );
}
